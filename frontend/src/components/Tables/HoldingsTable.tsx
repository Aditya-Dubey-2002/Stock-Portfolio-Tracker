import React, { useEffect, useState } from 'react';
import useHoldings from '../../hooks/useHoldings';
import Loader from '../../common/Loader';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import axios from 'axios';

const HoldingsTable = () => {
    const {
        holdingStocks,
        holdingInvestments,
        holdingCurrentValues,
        holdingStockCurrentPrices,
        holdingQuantities,
        loading,
        error,
    } = useHoldings();

    const [stockMap, setStockMap] = useState();
    const fetchStocks = async () => {
        try {
            const response = await axios.get(`${config.SERVER_URL}/api/stock/100list`, {
                params: { exchange: 'US' },
            });

            // Assuming the API returns an object with symbols as keys
            const stockMap = response.data; // Example: { AAPL: { name: "Apple Inc.", symbol: "AAPL" }, ... }
            // console.log(stockMap);
            // Map the API response to the desired structure


            // Update the stockOptions state
            // setStockMap(stockMap);
        } catch (error) {
            console.error('Error fetching stock options:', error);
        }
    };
    // useEffect(()=>{
    //     fetchStocks();
    // })
    // fetchStocks();

    const navigate = useNavigate();
    const [sortConfig, setSortConfig] = useState({ key: '', direction: null });
    const [userBalance, setUserBalance] = useState('User Balance Loading...');
    const [userName, setUserName] = useState('User');
    const token = localStorage.getItem('token');

    const getBalance = async () => {
        try {
            const response = await axios.get(`${config.SERVER_URL}/api/user/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const profileBalance = response.data.userDetails.balance;
            setUserBalance(profileBalance);
            setUserName(response.data.userDetails.fullName);
        } catch (err) {
            console.log('Error fetching User balance');
        }
    };

    useEffect(() => {
        getBalance();
    }, []);

    const getSortedData = () => {
        if (!sortConfig.key || !sortConfig.direction) return holdingStocks;

        const sortedStocks = [...holdingStocks];
        sortedStocks.sort((a, b) => {
            const columnDataA = getColumnData(sortConfig.key, a);
            const columnDataB = getColumnData(sortConfig.key, b);

            if (columnDataA < columnDataB) return sortConfig.direction === 'ascending' ? -1 : 1;
            if (columnDataA > columnDataB) return sortConfig.direction === 'ascending' ? 1 : -1;
            return 0;
        });

        return sortedStocks;
    };

    const getColumnData = (key, stockId) => {
        switch (key) {
            case 'stockName':
                return stockId;
            case 'investment':
                return holdingInvestments[stockId] || 0;
            case 'currentValue':
                return holdingCurrentValues[stockId] || 0;
            case 'quantity':
                return holdingQuantities[stockId] || 0;
            case 'price':
                return holdingStockCurrentPrices[stockId] || 0;
            default:
                return null;
        }
    };

    const handleSort = (key) => {
        setSortConfig((prev) => {
            let direction = 'ascending';
            if (prev.key === key && prev.direction === 'ascending') direction = 'descending';
            if (prev.key === key && prev.direction === 'descending') direction = null;

            return { key, direction };
        });
    };

    const renderSortIcon = (key) => {
        if (sortConfig.key !== key) return <span className="text-gray-400">⇅</span>;
        if (sortConfig.direction === 'ascending') return <span className="text-primary">▲</span>;
        if (sortConfig.direction === 'descending') return <span className="text-primary">▼</span>;
        return <span className="text-gray-400">⇅</span>;
    };

    const sortedStocks = getSortedData();

    const renderRow = (stockId) => {
        const investment = holdingInvestments[stockId] || 0;
        const value = holdingCurrentValues[stockId] || 0;
        const quantity = holdingQuantities[stockId] || 0;
        const price = holdingStockCurrentPrices[stockId] || 0;
        const difference = value - investment;
        const diffColor = difference > 0 ? 'text-green-500' : 'text-red-500';

        return (
            <div
                className={`grid grid-cols-5 sm:grid-cols-6 ${stockId === sortedStocks[sortedStocks.length - 1] ? '' : 'border-b border-stroke dark:border-strokedark'
                    }`}
                key={stockId}
            >
                <div className="flex items-center p-2.5 xl:p-5">
                    <p className="text-black dark:text-white">{stockId}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-black dark:text-white text-center">{quantity}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-black dark:text-white text-center">${price}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-black dark:text-white text-center">${investment.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-black dark:text-white text-center">
                        ${value.toFixed(2)}{' '}
                        <span className={diffColor}>({difference > 0 ? '+' : ''}{difference.toFixed(2)})</span>
                    </p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <button className="rounded bg-primary px-4 py-2 text-white hover:bg-primary-dark">Place Order</button>
                </div>
            </div>
        );
    };

    if (loading) return <Loader statusMessage={null} />;

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 mt-3 mb-3 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
  {/* Header Section */}
  <div className="flex justify-between items-center mb-4">
    <h4 className="text-xl font-semibold text-black dark:text-white">
      {userName}'s Holdings
    </h4>
    <h4 className="text-lg font-medium text-black dark:text-white">
      Current Balance: ${userBalance}
    </h4>
  </div>

  {/* Table Section */}
  <div className="flex flex-col">
    {/* Table Header */}
    <div className="grid grid-cols-5 sm:grid-cols-6 rounded-sm bg-gray-2 dark:bg-meta-4">
      <div
        className="p-2.5 xl:p-5 cursor-pointer"
        onClick={() => handleSort("stockName")}
      >
        <h5 className="text-sm font-medium uppercase xsm:text-base flex items-center gap-1">
          Name {renderSortIcon("stockName")}
        </h5>
      </div>
      <div
        className="p-2.5 text-center xl:p-5 cursor-pointer"
        onClick={() => handleSort("quantity")}
      >
        <h5 className="text-sm font-medium uppercase xsm:text-base flex items-center gap-1">
          Quantity {renderSortIcon("quantity")}
        </h5>
      </div>
      <div
        className="p-2.5 text-center xl:p-5 cursor-pointer"
        onClick={() => handleSort("price")}
      >
        <h5 className="text-sm font-medium uppercase xsm:text-base flex items-center gap-1">
          Current Price {renderSortIcon("price")}
        </h5>
      </div>
      <div
        className="p-2.5 text-center xl:p-5 cursor-pointer"
        onClick={() => handleSort("investment")}
      >
        <h5 className="text-sm font-medium uppercase xsm:text-base flex items-center gap-1">
          Total Investment {renderSortIcon("investment")}
        </h5>
      </div>
      <div
        className="p-2.5 text-center xl:p-5 cursor-pointer"
        onClick={() => handleSort("currentValue")}
      >
        <h5 className="text-sm font-medium uppercase xsm:text-base flex items-center gap-1">
          Current Value {renderSortIcon("currentValue")}
        </h5>
      </div>
      <div className="p-2.5 text-center xl:p-5">
        <h5 className="text-sm font-medium uppercase xsm:text-base">Action</h5>
      </div>
    </div>

    {/* Scrollable Rows */}
    <div
      className="overflow-y-auto"
      style={{
        maxHeight: "550px", // Adjust max height as needed
      }}
    >
      {sortedStocks.map((stockId) => renderRow(stockId))}
    </div>
  </div>
</div>

    );
};

export default HoldingsTable;
