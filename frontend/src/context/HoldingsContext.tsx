import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import config from '../config';

interface HoldingsContextProps {
    holdingStocks: string[];
    holdingInvestments: number[];
    holdingCurrentValues: string[];
    holdingStockCurrentPrices: string[];
    holdingQuantities: number[];
    loading: boolean;
    error: string | null;
    updateHoldings: () => void;
}

export const HoldingsContext = createContext<HoldingsContextProps | undefined>(undefined);

export const HoldingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [holdingStocks, setHoldingStocks] = useState<string[]>([]);
    const [holdingInvestments, setHoldingInvestments] = useState<number[]>([]);
    const [holdingCurrentValues, setHoldingCurrentValues] = useState<string[]>([]);
    const [holdingStockCurrentPrices, setHoldingStockCurrentPrices] = useState<string[]>([]);
    const [holdingQuantities, setHoldingQuantities] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const token = localStorage.getItem('token');

    const fetchInitialHoldings = async () => {
        try {
            setLoading(true);
            const headers = { Authorization: `Bearer ${token}` };
            const decodedToken: any = jwtDecode(token);
            const userId = decodedToken.userId;
    
            const { data: holdingsData } = await axios.get(
                `${config.SERVER_URL}/api/holdings/${userId}`,
                { headers }
            );
            console.log(holdingsData);
    
            // Aggregate holdings by stockId
            const aggregatedHoldings: Record<string, { quantity: number; totalInvested: number }> = {};
    
            holdingsData.forEach((holding: any) => {
                if (!aggregatedHoldings[holding.stockId]) {
                    aggregatedHoldings[holding.stockId] = {
                        quantity: 0,
                        totalInvested: 0,
                    };
                }
    
                aggregatedHoldings[holding.stockId].quantity += parseFloat(holding.quantity);
                aggregatedHoldings[holding.stockId].totalInvested +=
                    holding.quantity * parseFloat(holding.buyPrice);
            });
    
            // Separate aggregated data into columns
            const stocks: string[] = [];
            const investments: number[] = [];
            const quantities: number[] = [];
    
            Object.entries(aggregatedHoldings).forEach(([stockId, { quantity, totalInvested }]) => {
                stocks.push(stockId);
                quantities.push(quantity);
                investments.push(totalInvested);
            });
    
            setHoldingStocks(stocks);
            setHoldingQuantities(quantities);
            setHoldingInvestments(investments);
    
            // Fetch current prices
            const priceRequests = await stocks.map((stock) =>
                axios.get(`${config.SERVER_URL}/api/stock/quote/${stock}`, { headers })
            );
    
            const priceResponses = await Promise.all(priceRequests);
            const currentPrices = priceResponses.map((response) => parseFloat(response.data.c));
    
            // Set current prices and current values
            const newCurrentPrices = currentPrices.map((price) => `$${price.toFixed(2)}`);
            const newCurrentValues = currentPrices.map(
                (price, index) => `$${(price * quantities[index]).toFixed(2)}`
            );
    
            setHoldingStockCurrentPrices(newCurrentPrices);
            setHoldingCurrentValues(newCurrentValues);
        } catch (err) {
            setError('Failed to fetch holdings data.');
        } finally {
            setLoading(false);
        }
    };
    

    // Fetch holdings on mount
    useEffect(() => {
        fetchInitialHoldings();
    }, []);

    // Update prices and current values periodically
    const updateHoldings = async () => {
        if (holdingStocks.length === 0) return; // Skip if no stocks are available

        try {
            const headers = { Authorization: `Bearer ${token}` };
            const priceRequests = holdingStocks.map((stock) =>
                axios.get(`${config.SERVER_URL}/api/stock/quote/${stock}`, { headers })
            );

            const priceResponses = await Promise.all(priceRequests);
            const currentPrices = priceResponses.map((response) => parseFloat(response.data.c));
            // console.log(currentPrices);
            const newCurrentPrices = currentPrices.map((price) => `$${price.toFixed(2)}`);
            const newCurrentValues = currentPrices.map(
                (price, index) => `$${(price * holdingQuantities[index]).toFixed(2)}`
            );

            setHoldingStockCurrentPrices(newCurrentPrices);
            setHoldingCurrentValues(newCurrentValues);

            setError(null); // Clear any previous errors
        } catch (err) {
            console.error('Failed to update holdings:', err);
            setError('Failed to update holdings.');
        }
    };

    // Update periodically if holdings are available
    useEffect(() => {
        const interval = setInterval(() => {
            if (!loading) updateHoldings();
        }, 10000);
        return () => clearInterval(interval);
    }, [loading, holdingStocks, holdingQuantities]);

    return (
        <HoldingsContext.Provider
            value={{
                holdingStocks,
                holdingInvestments,
                holdingCurrentValues,
                holdingStockCurrentPrices,
                holdingQuantities,
                loading,
                error,
                updateHoldings,
            }}
        >
            {children}
        </HoldingsContext.Provider>
    );
};
