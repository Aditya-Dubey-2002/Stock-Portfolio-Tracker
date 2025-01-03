import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import config from '../../config';
import { useNavigate } from 'react-router-dom';

// Define StockOption type
type StockOption = {
  label: string;
  value: string;
  price: number;
};

type PlaceOrderFormProps = {
  selectedStockSymbol: string;
};
const PlaceOrderForm: React.FC<PlaceOrderFormProps> = ({ selectedStockSymbol }) => {
  const [stockName, setStockName] = useState('');
  const [stockSymbol, setStockSymbol] = useState('');
  const [stockPrice, setStockPrice] = useState<number | undefined>(undefined);
  const [selectedStock, setSelectedStock] = useState<StockOption | null>(null);
  const [quantity, setQuantity] = useState<number>(1); // Initialize quantity to 1
  const [placeAtCurrentPrice, setPlaceAtCurrentPrice] = useState(true); // Checkbox state
  const [orderStatus, setOrderStatus] = useState(''); // To store order status message
  const [loading, setLoading] = useState(false); // To handle loading state
  const [orderType, setOrderType] = useState('buy');

  // Define the StockOption type
  interface StockOption {
    label: string;
    value: string;
  }
  const navigate = useNavigate();

  // const selectedSymbol = props.stockSymbol;
  // setStockName(selectedSymbol);


  // State to hold the stock options
  const [stockOptions, setStockOptions] = useState<StockOption[]>([]);

  // Function to fetch stock list
  const fetchStockOptions = async () => {
    try {
      const response = await axios.get(`${config.SERVER_URL}/api/stock/100list`, {
        params: { exchange: 'US' },
      });

      // Assuming the API returns an object with symbols as keys
      const stockMap = response.data; // Example: { AAPL: { name: "Apple Inc.", symbol: "AAPL" }, ... }
      // console.log(stockMap);
      // Map the API response to the desired structure
      const options: StockOption[] = Object.keys(stockMap).map((symbol) => ({
        label: `${stockMap[symbol].name} (${symbol})`,
        value: symbol,
      }));

      // Update the stockOptions state
      setStockOptions(options);
    } catch (error) {
      console.error('Error fetching stock options:', error);
    }
  };


  // Fetch stock options on component mount
  useEffect(() => {
    fetchStockOptions();
  }, []);


  const fetchStockPrice = async (symbol: string) => {
    try {
      const response = await axios.get(`${config.SERVER_URL}/api/stock/quote/${symbol}`);
      setStockPrice(response.data.c);
    } catch (error) {
      console.error('Error fetching stock price:', error);
      setStockPrice(undefined);
    }
  };
  useEffect(() => {
    if (selectedStockSymbol) {
      const matchingStock = stockOptions.find((option) => option.value === selectedStockSymbol);
      if (matchingStock) {
        setSelectedStock(matchingStock);
        setStockSymbol(matchingStock.value);
        setStockName(matchingStock.label);
        fetchStockPrice(selectedStockSymbol);
      }
    }
  }, [selectedStockSymbol, stockOptions]);

  const handleStockSelect = async (selectedOption: StockOption | null) => {
    if (selectedOption) {
      // Set selected stock data
      setSelectedStock(selectedOption);
      setStockName(selectedOption.label);
      setStockSymbol(selectedOption.value);
      setLoading(true);
      try {
        // Fetch stock quote from the API
        const response = await fetch(`${config.SERVER_URL}/api/stock/quote/${selectedOption.value}`);
        const data = await response.json();

        // Assuming the price is in response.data.c
        setStockPrice(data.c); // Set the stock price from the API response
      } catch (error) {
        console.error('Error fetching stock quote:', error);
        // Handle error, maybe set stockPrice to null or show an error message
        setStockPrice(undefined); // Or any default value
      }
    }

  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const handleCheckboxChange = async () => {
    setPlaceAtCurrentPrice(!placeAtCurrentPrice);
    if (!placeAtCurrentPrice) {
      try {
        // Fetch stock quote from the API
        const response = await fetch(`${config.SERVER_URL}/api/stock/quote/${stockSymbol}`);
        const data = await response.json();

        // Assuming the price is in response.data.c
        setStockPrice(data.c); // Set the stock price from the API response
      } catch (error) {
        console.error('Error fetching stock quote:', error);
        // Handle error, maybe set stockPrice to null or show an error message
        setStockPrice(undefined); // Or any default value
      }
    }
  };

  const handlePlaceOrder = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (!selectedStock) {
      setOrderStatus('Please select a stock.');
      return;
    }

    if (quantity <= 0) {
      setOrderStatus('Quantity must be greater than zero.');
      return;
    }

    setLoading(true);
    setOrderStatus(''); // Clear previous status message

    try {
      const orderData = {
        stockId: stockSymbol, // Use the stock symbol
        orderType: orderType, // Assume 'buy' for simplicity
        price: stockPrice,
        quantity: quantity,
      };
      console.log(orderData);

      // Send POST request to place the order
      const response = await axios.post(`${config.SERVER_URL}/api/orders`, orderData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming JWT token in localStorage
        }
      });
      console.log(response);

      if (response.status === 201) {
        setOrderStatus('Order placed successfully.');
        alert(response.data.message);
        setLoading(false);
        navigate('/update-portfolio');
        window.location.reload();
      } else {
        alert(response.data.message);
        setOrderStatus('Error placing order.');
        alert(setOrderStatus);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert(error.response.data.message);

      setOrderStatus('Error placing order.');
      // alert(setOrderStatus);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Breadcrumb can be uncommented if needed */}
      {/* <Breadcrumb pageName="Form Layout" /> */}
      <div className="grid grid-cols-1 gap-4 mt-3 mb-3 sm:grid-cols justify-center">
        <div className="flex flex-col gap-4">
          {/* Place Order Form */}
          <div className="w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-4.5 dark:border-strokedark">
              <h2 className="font-bold text-xl text-black dark:text-white">Place Order</h2>
            </div>
            <form action="#">
              <div className="p-4">
                <div className="mb-4.5 flex flex-col gap-6">
                  {/* Stock Name Field */}
                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">Stock Name</label>
                    <Select
                      options={stockOptions}
                      getOptionLabel={(e) => e.label}
                      getOptionValue={(e) => e.value}
                      onChange={handleStockSelect}
                      placeholder="Search for a stock"
                      value={selectedStock}
                    />
                    {/* <SelectStock options={stockOptions} selectedStock= {selectedStock}/> */}
                  </div>

                  {/* Stock Symbol Field */}
                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">Stock Symbol</label>
                    <input
                      type="text"
                      placeholder="Stock Symbol"
                      value={stockSymbol}
                      onChange={(e) => setStockSymbol(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    // readOnly
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">Stock Price</label>
                  <input
                    type="number"
                    placeholder="Stock Price"
                    value={stockPrice}
                    onChange={(e) => setStockPrice(parseFloat(e.target.value))}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    readOnly={placeAtCurrentPrice}
                  />
                </div>

                {/* Quantity Input */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">Quantity</label>
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(parseFloat(e.target.value))}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">Order Type</label>
                  <select
                    value={orderType} // Bind the value to orderType state
                    onChange={(e) => setOrderType(e.target.value)} // Correctly handle the change
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                  </select>
                </div>


                {/* Checkbox for placing order at current price */}
                <div className="mb-4.5 flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="currentPriceCheckbox"
                    checked={placeAtCurrentPrice}
                    onChange={handleCheckboxChange}
                    // readOnly
                    className="h-5 w-5 rounded border-stroke text-primary focus:ring-primary dark:border-form-strokedark dark:bg-form-input dark:checked:bg-primary"
                  />
                  <label htmlFor="currentPriceCheckbox" className="text-black dark:text-white">
                    Place order at current price
                  </label>
                </div>

                {/* <button onClick={handlePlaceOrder} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Place Order
                </button> */}
                <button
                  type="button" // Explicitly set the button type
                  onClick={handlePlaceOrder}
                  // disabled={loading} // Disable the button while loading
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  {loading ? 'Placing Order...' : 'Place Order'}
                  {/* Place Order */}
                </button>

              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderForm;
