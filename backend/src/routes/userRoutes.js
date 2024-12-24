const express = require('express');
const { getUserProfile } = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Route to get the user profile
router.get('/profile', authenticateToken, getUserProfile);

module.exports = router;
