import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import config from '../config';

interface HoldingsContextProps {
  holdingStocks: string[];
  holdingInvestments: Record<string, number>;
  holdingCurrentValues: Record<string, number>;
  holdingStockCurrentPrices: Record<string, number>;
  holdingQuantities: Record<string, number>;
  loading: boolean;
  error: string | null;
  updateHoldings: () => void;
}

export const HoldingsContext = createContext<HoldingsContextProps | undefined>(undefined);

export const HoldingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [holdingStocks, setHoldingStocks] = useState<string[]>([]);
  const [holdingInvestments, setHoldingInvestments] = useState<Record<string, number>>({});
  const [holdingCurrentValues, setHoldingCurrentValues] = useState<Record<string, number>>({});
  const [holdingStockCurrentPrices, setHoldingStockCurrentPrices] = useState<Record<string, number>>({});
  const [holdingQuantities, setHoldingQuantities] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('token');

  const CACHE_KEY = 'stockPricesCache';

  const loadCache = () => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    return cachedData ? JSON.parse(cachedData) : {};
  };

  const saveCache = (cache: Record<string, { price: number; timestamp: number }>) => {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  };

  const fetchInitialHoldings = async () => {
    try {
      setLoading(true);
      const headers = { Authorization: `Bearer ${token}` };
      const decodedToken: any = jwtDecode(token || '');
      const userId = decodedToken.userId;

      const { data: holdingsData } = await axios.get(
        `${config.SERVER_URL}/api/holdings/${userId}`,
        { headers }
      );

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

      const stocks: string[] = [];
      const investments: Record<string, number> = {};
      const quantities: Record<string, number> = {};

      Object.entries(aggregatedHoldings).forEach(([stockId, { quantity, totalInvested }]) => {
        stocks.push(stockId);
        quantities[stockId] = parseFloat(quantity.toFixed(2));
        investments[stockId] = parseFloat(totalInvested.toFixed(2));
      });

      setHoldingStocks(stocks);
      setHoldingQuantities(quantities);
      setHoldingInvestments(investments);

      const cache = loadCache();
      const currentTime = Date.now();
      const currentPrices: Record<string, number> = {};
      const fetchPromises: Promise<void>[] = [];

      stocks.forEach((stock) => {
        if (cache[stock] && currentTime - cache[stock].timestamp < 15000) {
          currentPrices[stock] = cache[stock].price;
        } else {
          fetchPromises.push(
            axios
              .get(`${config.SERVER_URL}/api/stock/quote/${stock}`, { headers })
              .then((response) => {
                const price = parseFloat(response.data.c.toFixed(2));
                cache[stock] = { price, timestamp: Date.now() };
                currentPrices[stock] = price;
              })
          );
        }
      });

      await Promise.all(fetchPromises);
      saveCache(cache);

      const newCurrentValues: Record<string, number> = {};
      Object.keys(currentPrices).forEach((stock) => {
        newCurrentValues[stock] = parseFloat((currentPrices[stock] * quantities[stock]).toFixed(2));
      });

      setHoldingStockCurrentPrices(currentPrices);
      setHoldingCurrentValues(newCurrentValues);
    } catch (err) {
      setError('Failed to fetch holdings data. Please refresh.');
    } finally {
      setLoading(false);
    }
  };

  const updateHoldings = async () => {
    if (holdingStocks.length === 0) return;

    try {
      const headers = { Authorization: `Bearer ${token}` };
      const cache = loadCache();
      const currentTime = Date.now();
      const currentPrices: Record<string, number> = {};
      const fetchPromises: Promise<void>[] = [];

      holdingStocks.forEach((stock) => {
        if (cache[stock] && currentTime - cache[stock].timestamp < 15000) {
          currentPrices[stock] = cache[stock].price;
        } else {
          fetchPromises.push(
            axios
              .get(`${config.SERVER_URL}/api/stock/quote/${stock}`, { headers })
              .then((response) => {
                const price = parseFloat(response.data.c.toFixed(2));
                cache[stock] = { price, timestamp: Date.now() };
                currentPrices[stock] = price;
              })
          );
        }
      });

      await Promise.all(fetchPromises);
      saveCache(cache);

      const newCurrentValues: Record<string, number> = {};
      Object.keys(currentPrices).forEach((stock) => {
        newCurrentValues[stock] = parseFloat((currentPrices[stock] * holdingQuantities[stock]).toFixed(2));
      });

      setHoldingStockCurrentPrices(currentPrices);
      setHoldingCurrentValues(newCurrentValues);
      setError(null);
    } catch (err) {
      console.error('Failed to update holdings:', err);
      alert('Failed to update holdings');
      setError('Failed to update holdings.');
    }
  };

  useEffect(() => {
    fetchInitialHoldings();
  }, []);

  useEffect(() => {
    const interval = setInterval(updateHoldings, 15000);
    return () => clearInterval(interval);
  }, [holdingStocks, holdingQuantities]);

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
