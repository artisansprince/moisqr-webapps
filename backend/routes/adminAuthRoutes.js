const express = require('express');
const adminAuthController = require('../controllers/adminAuthController');
const router = express.Router();

// Routes untuk Admin Auth
router.post('/login', adminAuthController.loginAdmin);

module.exports = router;
