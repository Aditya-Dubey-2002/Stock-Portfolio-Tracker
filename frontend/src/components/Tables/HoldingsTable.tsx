import React from 'react';
import useHoldings from '../../hooks/useHoldings';
import Loader from '../../common/Loader';

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

    const renderRow = (index: number) => (
        <div
            className={`grid grid-cols-6 ${
                index === holdingStocks.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={index}
        >
            <div className="flex items-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{holdingStocks[index]}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{`$${holdingInvestments[index].toFixed(2)}`}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">${holdingCurrentValues[index]}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">${holdingStockCurrentPrices[index]}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{holdingQuantities[index]}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
                <button className="rounded bg-primary px-4 py-2 text-white hover:bg-primary-dark">Place Order</button>
            </div>
        </div>
    );

    if (loading) return <Loader />;
    if (error) return <p>{error}</p>;

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">Holdings</h4>

            <div className="flex flex-col">
                <div className="grid grid-cols-6 rounded-sm bg-gray-2 dark:bg-meta-4">
                    <div className="p-2.5 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">Stock Name</h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">Investment</h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">Current Value</h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">Current Price</h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">Quantity</h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">Action</h5>
                    </div>
                </div>

                {holdingStocks.map((_, index) => renderRow(index))}
            </div>
        </div>
    );
};

export default HoldingsTable;
