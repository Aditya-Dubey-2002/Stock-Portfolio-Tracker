const axios = require('axios');  // For making HTTP requests to the stock API
const axiosInstance = require('../config/finnhubClient.js');  // Import axios instance
const { createOrder } = require('../controllers/orderController.js'); // Import the createOrder function from the orderController
const stocks = require('../data/stocksList.js'); // Import your stocks list
const { getStockQuote } = require('../controllers/stockController.js');

// Function to allocate random stocks and place buy orders
const allocateRandomStocks = async (numStocks = 5, userId) => {
    const allocatedStocks = [];
    const usedIndices = new Set();

    // Randomly allocate stocks
    while (allocatedStocks.length < numStocks) {
        const randomIndex = Math.floor(Math.random() * stocks.length);

        // Ensure no duplicate allocations
        if (!usedIndices.has(randomIndex)) {
            allocatedStocks.push(stocks[randomIndex].symbol);
            usedIndices.add(randomIndex);
        }
    }

    // for (let stockId of allocatedStocks) {
    // let stockId = allocatedStocks[0];
    //     try {
    //         // Setting a default price value (e.g., 100) for testing
    //         const price = 100; 

    //         const orderResponse = await createOrder({
    //             body: {
    //                 stockId,
    //                 orderType: 'buy',
    //                 price,
    //                 quantity: 1,
    //             },
    //             user: { userId },
    //         });

    //         // Check if orderResponse is valid and contains the status field
    //         if (orderResponse && orderResponse.status) {
    //             if (orderResponse.status === 201) {
    //                 console.log(`Successfully placed order for ${stockId}`);
    //             } else {
    //                 console.log(`Error placing order for ${stockId}: ${orderResponse.message}`);
    //             }
    //         } else {
    //             console.log(`Order response is invalid for ${stockId}`);
    //         }
    //     } catch (error) {
    //         console.error(`Error placing order for ${stockId}: ${error.message}`);
    //     }
    // }

    // for(let stockId of allocatedStocks){
    //     try{
    //         const quoteResponse = await getStockQuote({params:{symbol:stockId}});
    //         console.log(stockId + ':' + quoteResponse.data.c);
    //     }
    //     catch(err){
    //         console.log('Error fetching prices',err);
    //     }
    // }

    // For each allocated stock, place a buy order
    // for (let stockId of allocatedStocks) {
    //     try {
    //         const quoteResponse = await getStockQuote({ params: { symbol: stockId } });

    //         if (quoteResponse && quoteResponse.data) {
    //             const price = quoteResponse.data.c; // Latest price from quote response
    //             console.log(price);
    //             console.log(userId);
    //             const orderResponse = await createOrder({
    //                 body: {
    //                     stockId,
    //                     orderType: 'buy',
    //                     price,
    //                     quantity: 1
    //                 },
    //                 user: { userId }
    //             });

    //             if (orderResponse && orderResponse.status === 201) {
    //                 console.log(`Successfully placed order for ${stockId}`);
    //             } else {
    //                 console.log(`Error placing order for ${stockId}: ${orderResponse.message}`);
    //             }
    //         } else {
    //             console.log(`Error fetching quote for ${stockId}`);
    //         }
    //     } catch (error) {
    //         console.error(`Error placing order for ${stockId}: ${error.message}`);
    //     }
    // }

    return allocatedStocks;
};

module.exports = { allocateRandomStocks };
