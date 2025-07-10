const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const auth = require('../middleware/auth');

// Protected routes
router.post('/', auth, paymentController.makePayment);
router.get('/me/history', auth, paymentController.getMyPayments);
router.get('/transaction/:paymentId', auth, paymentController.getPaymentById);
router.get('/:accountNumber', auth, paymentController.getPaymentHistory);

module.exports = router;
