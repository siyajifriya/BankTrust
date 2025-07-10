const Payment = require('../models/Payment');
const Customer = require('../models/Customer');
const { generateTransactionId } = require('../utils/helpers');

const paymentController = {
  async makePayment(req, res) {
    try {
      const { accountNumber, paymentAmount, paymentMethod = 'online' } = req.body;

      // Validation
      if (!accountNumber || !paymentAmount) {
        return res.status(400).json({ message: 'Account number and payment amount are required' });
      }

      if (paymentAmount <= 0) {
        return res.status(400).json({ message: 'Payment amount must be greater than 0' });
      }

      // Find customer
      const customer = await Customer.findOne({ accountNumber });
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }

      if (customer.status !== 'active') {
        return res.status(400).json({ message: 'Loan account is not active' });
      }

      // Check if payment amount exceeds remaining balance
      if (paymentAmount > customer.remainingBalance) {
        return res.status(400).json({ 
          message: `Payment amount cannot exceed remaining balance of ₹${customer.remainingBalance}` 
        });
      }

      // Calculate interest and principal components
      const monthlyInterestRate = customer.interestRate / 100 / 12;
      const interestAmount = customer.remainingBalance * monthlyInterestRate;
      const principalAmount = Math.max(0, paymentAmount - interestAmount);

      // Create payment record
      const payment = new Payment({
        customerId: customer._id,
        accountNumber,
        paymentAmount,
        principalAmount,
        interestAmount: Math.min(interestAmount, paymentAmount),
        paymentMethod,
        transactionId: generateTransactionId(),
        status: 'success',
        balanceAfterPayment: Math.max(0, customer.remainingBalance - paymentAmount)
      });

      await payment.save();

      // Update customer loan details
      const newRemainingBalance = Math.max(0, customer.remainingBalance - paymentAmount);
      const newTotalEMIsPaid = customer.totalEMIsPaid + 1;
      const newStatus = newRemainingBalance === 0 ? 'completed' : 'active';

      // Update next due date
      const nextDueDate = new Date(customer.nextDueDate);
      nextDueDate.setMonth(nextDueDate.getMonth() + 1);

      await Customer.findByIdAndUpdate(customer._id, {
        remainingBalance: newRemainingBalance,
        totalEMIsPaid: newTotalEMIsPaid,
        status: newStatus,
        nextDueDate: newRemainingBalance > 0 ? nextDueDate : null,
        updatedAt: new Date()
      });

      res.status(201).json({
        message: 'Payment processed successfully',
        payment,
        newBalance: newRemainingBalance,
        loanStatus: newStatus
      });
    } catch (error) {
      console.error('Payment error:', error);
      res.status(500).json({ message: 'Server error processing payment' });
    }
  },

  async getPaymentHistory(req, res) {
    try {
      const { accountNumber } = req.params;

      const payments = await Payment.find({ accountNumber })
        .sort({ paymentDate: -1 });

      res.json(payments);
    } catch (error) {
      console.error('Error fetching payment history:', error);
      res.status(500).json({ message: 'Server error fetching payment history' });
    }
  },

  async getMyPayments(req, res) {
    try {
      const payments = await Payment.find({ accountNumber: req.user.accountNumber })
        .sort({ paymentDate: -1 });

      res.json(payments);
    } catch (error) {
      console.error('Error fetching payment history:', error);
      res.status(500).json({ message: 'Server error fetching payment history' });
    }
  },

  async getPaymentById(req, res) {
    try {
      const { paymentId } = req.params;

      const payment = await Payment.findById(paymentId)
        .populate('customerId', 'accountNumber userId')
        .populate({
          path: 'customerId',
          populate: {
            path: 'userId',
            select: 'name email'
          }
        });

      if (!payment) {
        return res.status(404).json({ message: 'Payment not found' });
      }

      res.json(payment);
    } catch (error) {
      console.error('Error fetching payment:', error);
      res.status(500).json({ message: 'Server error fetching payment' });
    }
  }
};

module.exports = paymentController;