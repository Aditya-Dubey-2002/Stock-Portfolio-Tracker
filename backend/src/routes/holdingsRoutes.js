const express = require('express');
const router = express.Router();
const { getHoldings } = require('../controllers/holdingsController.js');
const authenticateToken = require('../middleware/authMiddleware.js');

// Get orders for a user (protected)
router.get('/:userId', authenticateToken, getHoldings);

module.exports = router;