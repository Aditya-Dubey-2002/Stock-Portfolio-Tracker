import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";
import Loader from "../common/Loader";

const Stock: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const [stockData, setStockData] = useState<any>(null);
  const [priceData, setPriceData] = useState<any>(null);
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const stockResponse = await axios.get(`${config.SERVER_URL}/api/stock/details/${symbol}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const priceResponse = await axios.get(`${config.SERVER_URL}/api/stock/quote/${symbol}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // const newsResponse = await axios.get(`${config.SERVER_URL}/api/stock/news/${symbol}`, {
        //   headers: { Authorization: `Bearer ${token}` },
        // });

        setStockData(stockResponse.data);
        setPriceData(priceResponse.data);
        // setNews(newsResponse.data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockDetails();
  }, [symbol]);

  if (loading) return <Loader/>;

  return (
    <div className="stock-details">
      <div className="header">
        <img src={stockData.logo} alt={`${stockData.name} logo`} width={'10%'} />
        <h1>{stockData.name} ({stockData.ticker})</h1>
        <p>Market Cap: ${stockData.marketCapitalization.toFixed(2)} Billion</p>
      </div>
      
      <div className="details-grid">
        <div>Current Price: ${priceData.c}</div>
        <div>52-Week High: ${priceData.high52Week}</div>
        <div>52-Week Low: ${priceData.low52Week}</div>
        <div>P/E Ratio: {priceData.peRatio}</div>
        <div>Outstanding Shares: {stockData.shareOutstanding}M</div>
        <div>IPO Date: {stockData.ipo}</div>
        <div>Exchange: {stockData.exchange}</div>
      </div>
      
      <div className="chart">
        <h2>Price Trends</h2>
        {/* Use a library like Chart.js or Recharts for the chart */}
      </div>

      <div className="actions">
        <button className="buy-button">Buy</button>
        <button className="favorite-button">Favorite</button>
      </div>

      {/* <div className="news">
        <h2>Related News</h2>
        <ul>
          {news.map((article, index) => (
            <li key={index}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">{article.headline}</a>
              <p>{article.source} - {new Date(article.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default Stock;
