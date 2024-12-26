const axiosInstance = require('../config/finnhubClient');  // Import axios instance

// Controller function to get a list of stocks based on exchange
// Controller to get a list of all stock tickers
exports.getStockList = async (req, res) => {
    try {
        const response = await axiosInstance.get('/stock/symbol', {
            params: { exchange: 'US' } // Example: Fetching US stock symbols
        });

        return res.status(200).json(response.data); // Send stock ticker list
    } catch (error) {
        console.error('Error fetching stock list:', error);
        return res.status(500).json({
            message: 'Error fetching stock list',
            error: error.message
        });
    }
};

// Controller to search for stocks based on a query
exports.getStockSearch = async (req, res) => {
    const { query } = req.query; // Query parameter for stock search

    if (!query) {
        return res.status(400).json({ message: 'Query parameter is required' });
    }

    try {
        const response = await axiosInstance.get('/search', {
            params: { q: query } // Use 'q' for search query as per Finnhub API
        });

        return res.status(200).json(response.data); // Send search results
    } catch (error) {
        console.error('Error searching for stocks:', error);
        return res.status(500).json({
            message: 'Error searching for stocks',
            error: error.message
        });
    }
};

// Controller to get real-time stock quote by stock symbol
exports.getStockQuote = async (req, res) => {
    const symbol = req.params.symbol; // Stock symbol (e.g., AAPL for Apple)

    try {
        const response = await axiosInstance.get(`/quote`, {
            params: { symbol }
        });

        return res.status(200).json(response.data); // Send real-time stock quote
    } catch (error) {
        console.error('Error fetching stock quote:', error);
        return res.status(500).json({
            message: 'Error fetching stock quote',
            error: error.message
        });
    }
};

// Controller to get stock details for portfolio metrics
exports.getStockDetails = async (req, res) => {
    const symbol = req.params.symbol; // Stock symbol (e.g., AAPL for Apple)

    try {
        const response = await axiosInstance.get(`/stock/profile2`, {
            params: { symbol }
        });

        return res.status(200).json(response.data); // Send company profile response
    } catch (error) {
        console.error('Error fetching stock details:', error);
        return res.status(500).json({
            message: 'Error fetching stock details',
            error: error.message
        });
    }
};