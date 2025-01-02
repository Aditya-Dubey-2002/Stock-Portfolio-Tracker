const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController.js');

router.get('/market/status',stockController.getMarketStatus);

// Route to get a list of all stock tickers
router.get('/list', stockController.getStockList);

router.get('/100list', stockController.get100StockList);

// Route to search for stocks based on a query
router.get('/search', stockController.getStockSearch);

// Route to get real-time stock quote by stock symbol
router.get('/quote/:symbol', stockController.getStockQuote);

// Route to get stock details for portfolio metrics
router.get('/details/:symbol', stockController.getStockDetails);

module.exports = router;
