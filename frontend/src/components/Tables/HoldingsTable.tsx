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
    const navigate = useNavigate();
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' | null }>({
        key: '',
        direction: null,
    });
    console.log(holdingStockCurrentPrices);
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
            const profileBalance: string = response.data.userDetails.balance;
            setUserBalance(profileBalance);
            setUserName(response.data.userDetails.fullName);
        } catch (err) {
            console.log('Error fetching User balance');
        }
    };
    useEffect(() => {
        getBalance();
    });

    const getSortedData = () => {
        if (!sortConfig.key || !sortConfig.direction) return holdingStocks.map((_, index) => index);

        const sortedIndices = holdingStocks.map((_, index) => index);
        sortedIndices.sort((a, b) => {
            const columnDataA = getColumnData(sortConfig.key, a);
            const columnDataB = getColumnData(sortConfig.key, b);

            if (columnDataA < columnDataB) return sortConfig.direction === 'ascending' ? -1 : 1;
            if (columnDataA > columnDataB) return sortConfig.direction === 'ascending' ? 1 : -1;
            return 0;
        });

        return sortedIndices;
    };

    const getColumnData = (key: string, index: number) => {
        switch (key) {
            case 'stockName':
                return holdingStocks[index];
            case 'investment':
                return holdingInvestments[index];
            case 'currentValue':
                return holdingCurrentValues[index];
            case 'quantity':
                return holdingQuantities[index];
            case 'price':
                return holdingStockCurrentPrices[index];
            default:
                return null;
        }
    };

    const handleSort = (key: string) => {
        setSortConfig((prev) => {
            let direction: 'ascending' | 'descending' | null = 'ascending';
            if (prev.key === key && prev.direction === 'ascending') direction = 'descending';
            if (prev.key === key && prev.direction === 'descending') direction = null;

            return { key, direction };
        });
    };

    const renderSortIcon = (key: string) => {
        if (sortConfig.key !== key) return <span className="text-gray-400">⇅</span>;
        if (sortConfig.direction === 'ascending') return <span className="text-primary">▲</span>;
        if (sortConfig.direction === 'descending') return <span className="text-primary">▼</span>;
        return <span className="text-gray-400">⇅</span>;
    };

    const sortedIndices = getSortedData();

    const renderRow = (index: number) => {
        const investment = holdingInvestments[index];
        const value = holdingCurrentValues[index];
        const difference = value - investment;
        const diffColor = difference > 0 ? 'text-green-500' : 'text-red-500';

        return (
            <div
                className={`grid grid-cols-5 sm:grid-cols-6 ${index === holdingStocks.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
                    }`}
                key={index}
            >
                <div className="flex items-center p-2.5 xl:p-5">
                    <p className="text-black dark:text-white">{holdingStocks[index]}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-black dark:text-white text-center">{holdingQuantities[index]}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-black dark:text-white text-center">${holdingStockCurrentPrices[index]}</p>
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

    if (loading) return <Loader />;

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 mt-6 mb-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-semibold text-black dark:text-white">{userName}'s Holdings</h4>
                <h4 className="text-lg font-medium text-black dark:text-white">Current Balance: ${userBalance}</h4>
            </div>
            <div className="flex flex-col">
                <div className="grid grid-cols-5 sm:grid-cols-6 rounded-sm bg-gray-2 dark:bg-meta-4">
                    <div className="p-2.5 xl:p-5 cursor-pointer" onClick={() => handleSort('stockName')}>
                        <h5 className="text-sm font-medium uppercase xsm:text-base flex items-center gap-1">
                            Name {renderSortIcon('stockName')}
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5 cursor-pointer" onClick={() => handleSort('quantity')}>
                        <h5 className="text-sm font-medium uppercase xsm:text-base flex items-center gap-1">
                            Quantity {renderSortIcon('quantity')}
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5 cursor-pointer" onClick={() => handleSort('price')}>
                        <h5 className="text-sm font-medium uppercase xsm:text-base flex items-center gap-1">
                            Current Price {renderSortIcon('price')}
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5 cursor-pointer" onClick={() => handleSort('investment')}>
                        <h5 className="text-sm font-medium uppercase xsm:text-base flex items-center gap-1">
                            Total Investment {renderSortIcon('investment')}
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5 cursor-pointer" onClick={() => handleSort('currentValue')}>
                        <h5 className="text-sm font-medium uppercase xsm:text-base flex items-center gap-1">
                            Current Value {renderSortIcon('currentValue')}
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">Action</h5>
                    </div>
                </div>

                {sortedIndices.map((index) => renderRow(index))}
            </div>
        </div>
    );
};

export default HoldingsTable;
