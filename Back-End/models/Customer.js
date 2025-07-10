const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  accountNumber: { 
    type: String, 
    required: true, 
    unique: true 
  },
  issueDate: { 
    type: Date, 
    required: true 
  },
  interestRate: { 
    type: Number, 
    required: true,
    min: 0.1,
    max: 50
  },
  tenure: { 
    type: Number, 
    required: true,
    min: 1,
    max: 360
  }, // in months
  loanAmount: { 
    type: Number, 
    required: true,
    min: 1000
  },
  emiAmount: { 
    type: Number, 
    required: true 
  },
  totalEMIsPaid: { 
    type: Number, 
    default: 0 
  },
  remainingBalance: { 
    type: Number, 
    required: true 
  },
  nextDueDate: {
    type: Date,
    required: true
  },
  loanType: {
    type: String,
    enum: ['personal', 'home', 'car', 'education'],
    default: 'personal'
  },
  status: { 
    type: String, 
    enum: ['active', 'completed', 'defaulted', 'suspended'], 
    default: 'active' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Update the updatedAt field before saving
customerSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Customer', customerSchema);