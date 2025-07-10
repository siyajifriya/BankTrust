const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateAccountNumber, calculateEMI } = require('../utils/helpers');
const Customer = require('../models/Customer');

const authController = {
  // Option 1: Simple registration without loan details
  async register(req, res) {
    try {
      const { email, password, name, phone, address } = req.body;

      // Validation
      if (!email || !password || !name) {
        return res.status(400).json({ message: 'Email, password, and name are required' });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists with this email' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Generate account number
      const accountNumber = generateAccountNumber();

      // Create user
      const user = new User({
        email,
        password: hashedPassword,
        name,
        accountNumber,
        phone,
        address
      });

      await user.save();

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email, accountNumber },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role:user.role,
          accountNumber
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error during registration' });
    }
  },

  // Option 2: Registration with optional loan details
  async registerWithLoan(req, res) {
    try {
      const { email, password, name, phone, address, loanAmount, interestRate, tenure } = req.body;

      // Validation
      if (!email || !password || !name) {
        return res.status(400).json({ message: 'Email, password, and name are required' });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists with this email' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Generate account number
      const accountNumber = generateAccountNumber();

      // Create user
      const user = new User({
        email,
        password: hashedPassword,
        name,
        accountNumber,
        phone,
        address
      });

      await user.save();

      // Create loan record if loan details are provided
      if (loanAmount && interestRate && tenure) {
        const emiAmount = calculateEMI(loanAmount, interestRate, tenure);
        const issueDate = new Date();
        const nextDueDate = new Date(issueDate);
        nextDueDate.setMonth(nextDueDate.getMonth() + 1);

        const customer = new Customer({
          userId: user._id,
          accountNumber,
          issueDate,
          interestRate,
          tenure,
          loanAmount,
          emiAmount,
          remainingBalance: loanAmount,
          nextDueDate
        });

        await customer.save();
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email, accountNumber },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role:user.role,
          accountNumber
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error during registration' });
    }
  },

  // Separate loan application endpoint
  async applyLoan(req, res) {
    try {
      const { loanAmount, interestRate, tenure } = req.body;
      const userId = req.user.userId;
      const accountNumber = req.user.accountNumber;

      // Validation
      if (!loanAmount || !interestRate || !tenure) {
        return res.status(400).json({ message: 'Loan amount, interest rate, and tenure are required' });
      }

      // Check if user already has an active loan
      const existingLoan = await Customer.findOne({ userId, status: 'active' });
      if (existingLoan) {
        return res.status(400).json({ message: 'User already has an active loan' });
      }

      // Calculate EMI
      const emiAmount = calculateEMI(loanAmount, interestRate, tenure);
      const issueDate = new Date();
      const nextDueDate = new Date(issueDate);
      nextDueDate.setMonth(nextDueDate.getMonth() + 1);

      // Create customer loan record
      const customer = new Customer({
        userId,
        accountNumber,
        issueDate,
        interestRate,
        tenure,
        loanAmount,
        emiAmount,
        remainingBalance: loanAmount,
        nextDueDate,
        status: 'active'
      });

      await customer.save();

      res.status(201).json({
        message: 'Loan application submitted successfully',
        loan: {
          id: customer._id,
          loanAmount,
          interestRate,
          tenure,
          emiAmount,
          nextDueDate
        }
      });
    } catch (error) {
      console.error('Loan application error:', error);
      res.status(500).json({ message: 'Server error during loan application' });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validation
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Check if user is active
      if (!user.isActive) {
        return res.status(400).json({ message: 'Account is deactivated' });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email, accountNumber: user.accountNumber },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role:user.role,
          accountNumber: user.accountNumber
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error during login' });
    }
  },

  async getProfile(req, res) {
    try {
      const user = await User.findById(req.user.userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Also fetch loan details if they exist
      const loans = await Customer.find({ userId: req.user.userId });

      res.json({
        user,
        loans
      });
    } catch (error) {
      console.error('Profile error:', error);
      res.status(500).json({ message: 'Server error fetching profile' });
    }
  }
};

module.exports = authController;