const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const auth = require('../middleware/auth');

// Protected routes
router.get('/', auth, customerController.getAllCustomers);
router.get('/me/loan', auth, customerController.getMyLoanDetails);
router.get('/all-users-loan-status', auth, customerController.getAllUsersWithLoanStatus);
router.get('/:accountNumber', auth, customerController.getCustomerByAccountNumber);
router.get('/all-users-loan-status', auth, customerController.getAllUsersWithLoanStatus);




module.exports = router;