
// routes/admin.js
const express = require('express');
const router = express.Router();
const auth = require('./auth');
const isAdmin = require('./admin');

router.get('/admin/dashboard', auth, isAdmin, async (req, res) => {
  // Fetch admin-only data here
  res.json({ message: 'Welcome to Admin Dashboard' });
});

module.exports = router;
