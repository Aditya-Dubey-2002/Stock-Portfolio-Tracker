const dotenv = require('dotenv');
const axios = require('axios');

// Load environment variables from .env file
dotenv.config();

const apiKey = process.env.FINNHUB_API_KEY;  // Make sure this key is in your .env file

if (!apiKey) {
    throw new Error('FINNHUB_API_KEY is not defined in .env file');
}

const baseURL = 'https://finnhub.io/api/v1';

// Axios instance to interact with Finnhub API
const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        'X-Finnhub-Token': apiKey,  // Use API key in headers for authentication
    },
});

module.exports = axiosInstance;
