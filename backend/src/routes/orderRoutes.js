const express = require('express');
const router = express.Router();
const { createOrder, getOrders } = require('../controllers/orderController.js');
const authenticateToken = require('../middleware/authMiddleware.js');

// Create a new order (protected)
router.post('/', authenticateToken, createOrder);

// Get orders for a user (protected)
router.get('/', authenticateToken, getOrders);

module.exports = router;
