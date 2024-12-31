const axiosInstance = require('../config/finnhubClient');  // Import axios instance
const stock100List = require('../data/stocksList');

exports.getMarketStatus = async (req,res) =>{
    try{
        const response = await axiosInstance.get('/stock/market-status',{
            params: { exchange: 'US' } // Example: Fetching US stock symbols
        });
        console.log(response.data);
        res.status(200).json(response.data);

    } catch(err){
        console.error('Error fetching market status', err);
        return res.status(500).json({
            message: 'Error fetching market status',
            error: err.message
        });
    }
}

// Controller function to get a list of stocks based on exchange
exports.get100StockList = async (req, res) => {
    try {
        const response = stock100List;

        const stocks = response; // Assuming response.data is an array of stock objects
        const result = stocks;

        return res.status(200).json(result); // Send stock ticker list
    } catch (error) {
        console.error('Error fetching stock list:', error);
        return res.status(500).json({
            message: 'Error fetching stock list',
            error: error.message
        });
    }
};

// Controller to get a list of all stock tickers
exports.getStockList = async (req, res) => {
    try {
        const response = await axiosInstance.get('/stock/symbol', {
            params: { exchange: 'US' } // Example: Fetching US stock symbols
        });

        const stocks = response.data; // Assuming response.data is an array of stock objects
        const result = stocks.map(stock => ({
            name: stock.description,
            symbol: stock.symbol
        }));

        return res.status(200).json(result); // Send stock ticker list
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
    // console.log(symbol);
    try {
        const response = await axiosInstance.get(`/quote`, {
            params: { symbol }
        });

        return res.status(200).json(response.data); // Send real-time stock quote
    } catch (error) {
        console.log(req.params.symbol);
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