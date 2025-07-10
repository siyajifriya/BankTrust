const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  customerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Customer', 
    required: true 
  },
  accountNumber: { 
    type: String, 
    required: true 
  },
  paymentDate: { 
    type: Date, 
    default: Date.now 
  },
  paymentAmount: { 
    type: Number, 
    required: true,
    min: 0.01
  },
  principalAmount: {
    type: Number,
    default: 0
  },
  interestAmount: {
    type: Number,
    default: 0
  },
  paymentMethod: {
    type: String,
    enum: ['online', 'cash', 'cheque', 'bank_transfer'],
    default: 'online'
  },
  status: { 
    type: String, 
    enum: ['success', 'failed', 'pending', 'cancelled'], 
    default: 'success' 
  },
  transactionId: { 
    type: String, 
    unique: true,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  balanceAfterPayment: {
    type: Number,
    required: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Payment', paymentSchema);