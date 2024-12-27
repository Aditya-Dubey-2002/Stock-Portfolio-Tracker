import axios from "axios";
import { useState, useEffect } from "react";
import config from "../../config";
import { jwtDecode } from "jwt-decode";


interface Holding {
    stockId: string;
    quantity: number;
    buyPrice: number;
}

interface CombinedHolding {
    stockName: string;
    quantity: number;
    investment: number;
    currentPrice?: string;
    currentValue?: string;
}

interface QuoteResponse {
    c: string;
    price: string; // Assuming API returns price as a string
}

const HoldingsTable = () => {
    const [holdings, setHoldings] = useState<CombinedHolding[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const token = localStorage.getItem('token');
    if (!token) {
        setError('No token found. Please log in.');
        setLoading(false);
        return;
    }
    useEffect(() => {
        const fetchHoldings = async () => {
            try {
                setLoading(true);
                 // Retrieve token from localStorage
                const headers = { Authorization: `Bearer ${token}` };
                const decodedToken: any = jwtDecode(token);
                const userId = decodedToken.userId;
                // Fetch holdings from the API

                const { data: holdingsData } = await axios.get<Holding[]>(
                    `${config.SERVER_URL}/api/holdings/${userId}`,
                    { headers }
                );

                // Map holdings by stockId to combine them
                const combinedHoldings = holdingsData.reduce<Record<string, CombinedHolding>>(
                    (acc, holding) => {
                        const { stockId, quantity, buyPrice } = holding;

                        if (!acc[stockId]) {
                            acc[stockId] = {
                                stockName: stockId,
                                quantity: 0,
                                investment: 0,
                            };
                        }

                        acc[stockId].quantity += quantity;
                        acc[stockId].investment += quantity * parseFloat(buyPrice.toString());
                        return acc;
                    },
                    {}
                );

                // Fetch current prices for all stocks
                const stockIds = Object.keys(combinedHoldings);
                const fetchStockPrices = async (stockIds: string[], headers: Record<string, string>): Promise<number[]> => {
                    try {
                        const priceRequests = stockIds.map((stockId) =>
                            axios.get<QuoteResponse>(`${config.SERVER_URL}/api/stock/quote/${stockId}`, { headers })
                        );
                
                        const priceResponses = await Promise.all(priceRequests);
                        return priceResponses.map((response) => parseFloat(response.data.c)); // Adjusted to use `data.c`
                    } catch (error) {
                        console.error("Error fetching stock prices:", error);
                        throw error; // Re-throw error to handle it further up the call stack if needed
                    }
                };
                
                // Usage example
                const currentPrices = await fetchStockPrices(stockIds, headers);
                console.log(currentPrices);
                // Add current prices and current value to holdings
                const formattedHoldings = stockIds.map((stockId, index) => {
                    const currentPrice = (currentPrices[index]); // Corrected variable name
                    const holding = combinedHoldings[stockId];
                    return {
                        ...holding,
                        currentPrice: `$${currentPrice.toFixed(2)}`, // Format as a dollar amount
                        currentValue: `$${(holding.quantity * currentPrice).toFixed(2)}`, // Calculate and format current value
                        investment: `$${holding.investment.toFixed(2)}`, // Format investment as a dollar amount
                    };
                });
                setHoldings(formattedHoldings);
                console.log(formattedHoldings);

            } catch (err) {
                setError("Failed to fetch holdings data.");
            } finally {
                setLoading(false);
            }
        };

        fetchHoldings();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                Holdings
            </h4>

            <div className="flex flex-col">
                {/* Table Header */}
                <div className="grid grid-cols-6 rounded-sm bg-gray-2 dark:bg-meta-4">
                    <div className="p-2.5 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Stock Name
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Investment
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Current Value
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Current Price
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Quantity
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Action
                        </h5>
                    </div>
                </div>

                {/* Table Rows */}
                {holdings.map((holding, index) => (
                    <div
                        className={`grid grid-cols-6 ${index === holdings.length - 1
                            ? ''
                            : 'border-b border-stroke dark:border-strokedark'
                            }`}
                        key={index}
                    >
                        <div className="flex items-center p-2.5 xl:p-5">
                            <p className="text-black dark:text-white">{holding.stockName}</p>
                        </div>
                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-black dark:text-white">{holding.investment}</p>
                        </div>
                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-meta-3">{holding.currentValue}</p>
                        </div>
                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-black dark:text-white">{holding.currentPrice}</p>
                        </div>
                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-black dark:text-white">{holding.quantity}</p>
                        </div>
                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <button className="rounded bg-primary px-4 py-2 text-white hover:bg-primary-dark">
                                Place Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HoldingsTable;
