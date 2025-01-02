const express = require('express');
const { getUserProfile } = require('../controllers/userController.js');
const authenticateToken = require('../middleware/authMiddleware.js');

const router = express.Router();

// Route to get the user profile
router.get('/profile', authenticateToken, getUserProfile);

module.exports = router;
