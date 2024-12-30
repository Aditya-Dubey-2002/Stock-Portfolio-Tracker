const express = require('express');
const router = express.Router();
const { createOrder, getOrders } = require('../controllers/orderController');
const authenticateToken = require('../middleware/authMiddleware');

// Create a new order (protected)
router.post('/', authenticateToken, createOrder);

// Get orders for a user (protected)
router.get('/', authenticateToken, getOrders);

module.exports = router;
