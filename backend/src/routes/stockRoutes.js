const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

// Route to get a list of all stock tickers
router.get('/list', stockController.getStockList);

// Route to search for stocks based on a query
router.get('/search', stockController.getStockSearch);

// Route to get real-time stock quote by stock symbol
router.get('/quote/:symbol', stockController.getStockQuote);

// Route to get stock details for portfolio metrics
router.get('/details/:symbol', stockController.getStockDetails);

module.exports = router;
