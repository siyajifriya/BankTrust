const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Public routes
router.post('/register', authController.register);
router.post('/register-with-loan', authController.registerWithLoan); // Optional: for registration with loan
router.post('/login', authController.login);

// Protected routes
router.get('/profile', auth, authController.getProfile);
router.post('/apply-loan', auth, authController.applyLoan);

module.exports = router;



