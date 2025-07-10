
const Customer = require('../models/Customer');

const customerController = {
  async getAllCustomers(req, res) {
    try {
      const customers = await Customer.find()
        .populate('userId', 'name email phone address')
        .sort({ createdAt: -1 });
      
      // Filter out customers with null userId (data integrity issue)
      const validCustomers = customers.filter(customer => customer.userId);
      
      res.json({
        success: true,
        count: validCustomers.length,
        customers: validCustomers
      });
    } catch (error) {
      console.error('Error fetching customers:', error);
      res.status(500).json({ 
        success: false,
        message: 'Server error fetching customers' 
      });
    }
  },

  async getCustomerByAccountNumber(req, res) {
    try {
      const { accountNumber } = req.params;
      
      if (!accountNumber) {
        return res.status(400).json({ 
          success: false,
          message: 'Account number is required' 
        });
      }
      
      const customer = await Customer.findOne({ accountNumber })
        .populate('userId', 'name email phone address');
      
      if (!customer) {
        return res.status(404).json({ 
          success: false,
          message: 'Customer not found' 
        });
      }

      // Check if userId exists (data integrity)
      if (!customer.userId) {
        return res.status(404).json({ 
          success: false,
          message: 'Customer user data not found' 
        });
      }
      
      res.json({
        success: true,
        customer
      });
    } catch (error) {
      console.error('Error fetching customer:', error);
      res.status(500).json({ 
        success: false,
        message: 'Server error fetching customer' 
      });
    }
  },

  async getMyLoanDetails(req, res) {
    try {
      // Check if user has accountNumber
      if (!req.user.accountNumber) {
        return res.status(404).json({ 
          success: false,
          message: 'No loan found for this user' 
        });
      }

      const customer = await Customer.findOne({ accountNumber: req.user.accountNumber })
        .populate('userId', 'name email phone address');
      
      if (!customer) {
        return res.status(404).json({ 
          success: false,
          message: 'Loan details not found' 
        });
      }

      res.json({
        success: true,
        loanDetails: customer
      });
    } catch (error) {
      console.error('Error fetching loan details:', error);
      res.status(500).json({ 
        success: false,
        message: 'Server error fetching loan details' 
      });
    }
  },

  async updateLoanStatus(req, res) {
    try {
      const { accountNumber } = req.params;
      const { status } = req.body;
      
      // Validate input
      if (!accountNumber) {
        return res.status(400).json({ 
          success: false,
          message: 'Account number is required' 
        });
      }
      
      if (!status) {
        return res.status(400).json({ 
          success: false,
          message: 'Status is required' 
        });
      }

      // Validate status value
      const validStatuses = ['active', 'completed', 'defaulted', 'suspended'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ 
          success: false,
          message: 'Invalid status value' 
        });
      }
      
      const customer = await Customer.findOneAndUpdate(
        { accountNumber },
        { status, updatedAt: new Date() },
        { new: true }
      ).populate('userId', 'name email');
      
      if (!customer) {
        return res.status(404).json({ 
          success: false,
          message: 'Customer not found' 
        });
      }
      
      res.json({ 
        success: true,
        message: 'Loan status updated successfully', 
        customer 
      });
    } catch (error) {
      console.error('Error updating loan status:', error);
      res.status(500).json({ 
        success: false,
        message: 'Server error updating loan status' 
      });
    }
  },

  // Additional method to get all users (including those without loans)
  async getAllUsersWithLoanStatus(req, res) {
    try {
      const User = require('../models/User'); // Adjust path as needed
      
      const users = await User.find()
        .select('name email phone address createdAt')
        .sort({ createdAt: -1 });
      
      // Get all customers
      const customers = await Customer.find()
        .populate('userId', 'name email');
      
      // Map users with their loan status
      const usersWithLoanStatus = users.map(user => {
        const customerLoan = customers.find(customer => 
          customer.userId && customer.userId._id.toString() === user._id.toString()
        );
        
        return {
          ...user.toObject(),
          hasLoan: !!customerLoan,
          loanDetails: customerLoan || null
        };
      });
      
      res.json({
        success: true,
        count: usersWithLoanStatus.length,
        users: usersWithLoanStatus
      });
    } catch (error) {
      console.error('Error fetching users with loan status:', error);
      res.status(500).json({ 
        success: false,
        message: 'Server error fetching users with loan status' 
      });
    }
  }
};

module.exports = customerController;