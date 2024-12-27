const express = require('express');
const router = express.Router();
const { getHoldings } = require('../controllers/holdingsController');
const authenticateToken = require('../middleware/authMiddleware');

// Get orders for a user (protected)
router.get('/:userId', authenticateToken, getHoldings);

module.exports = router;