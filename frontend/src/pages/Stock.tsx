import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";
import Loader from "../common/Loader";

const Stock: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const [stockProfile, setStockProfile] = useState<any>(null);
  const [stockQuote, setStockQuote] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const profileResponse = await axios.get(
          `${config.SERVER_URL}/api/stock/details/${symbol}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const quoteResponse = await axios.get(
          `${config.SERVER_URL}/api/stock/quote/${symbol}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setStockProfile(profileResponse.data);
        setStockQuote(quoteResponse.data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockDetails();
  }, [symbol]);

  if (loading) return <Loader />;

  return (
    <div className="">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 flex items-center gap-4 mb-6">
        <img
          src={stockProfile.logo}
          alt={`${stockProfile.name} logo`}
          className="w-16 h-16 rounded-md"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {stockProfile.name} ({stockProfile.ticker})
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Country: {stockProfile.country}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Industry: {stockProfile.finnhubIndustry || "N/A"}
          </p>
        </div>
      </div>

      {/* Highlighted Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 p-4 rounded-lg shadow">
          <p className="text-sm font-medium">Current Price</p>
          <p className="text-xl font-bold">${stockQuote.c?.toFixed(2)}</p>
        </div>
        <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 p-4 rounded-lg shadow">
          <p className="text-sm font-medium">High (Today)</p>
          <p className="text-xl font-bold">${stockQuote.h?.toFixed(2)}</p>
        </div>
        <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 p-4 rounded-lg shadow">
          <p className="text-sm font-medium">Low (Today)</p>
          <p className="text-xl font-bold">${stockQuote.l?.toFixed(2)}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 p-4 rounded-lg shadow">
          <p className="text-sm font-medium">Open Price</p>
          <p className="text-xl font-bold">${stockQuote.o?.toFixed(2)}</p>
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 p-4 rounded-lg shadow">
          <p className="text-sm font-medium">Previous Close</p>
          <p className="text-xl font-bold">${stockQuote.pc?.toFixed(2)}</p>
        </div>
        <div className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 p-4 rounded-lg shadow">
          <p className="text-sm font-medium">Exchange</p>
          <p className="text-xl font-bold">{stockProfile.exchange}</p>
        </div>
      </div>

      {/* Company Info */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          About the Company
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {stockProfile.name} is listed on the {stockProfile.exchange}. This
          company operates in the {stockProfile.finnhubIndustry || "N/A"}{" "}
          sector. Located in {stockProfile.country}, it has a global presence.
        </p>
      </div>

      {/* Actions Section */}
      <div className="flex gap-4">
        <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700">
          Buy
        </button>
        {/* <button className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded-md shadow hover:bg-yellow-600">
          Favorite
        </button> */}
      </div>
    </div>
  );
};

export default Stock;
