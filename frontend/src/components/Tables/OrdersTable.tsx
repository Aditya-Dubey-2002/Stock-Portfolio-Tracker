import React, { useEffect, useState } from 'react';
import config from '../../config';
import axios from 'axios';
// Define the structure of the data
interface Order {
  profit: any;
  orderId: number;
  userId: number;
  stockId: string;
  orderType: 'buy' | 'sell';
  orderTime: string;
  quantity: number;
  amount: string;
}

const OrdersTable = () => {
  // Specify the type of the state
  const [ordersData, setOrdersData] = useState<Order[]>([]);

  const token = localStorage.getItem('token');
  useEffect(() => {
    // Fetch orders data from the API
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${config.SERVER_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = response.data;
        data.reverse();
        setOrdersData(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-3 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Orders
      </h4>

      <div className="flex flex-col overflow-y-auto" style={{ maxHeight: '350px' }}>
        <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Stock</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Type</h5>
          </div>
          <div className="hidden sm:flex p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Time</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Quantity</h5>
          </div>
          <div className=" p-2.5 text-center block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Amount</h5>
          </div>
          <div className=" p-2.5 text-center block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Profit/Loss</h5>
          </div>
        </div>

        {ordersData.map((order, key) => (
          <div
            className={`grid grid-cols-4 sm:grid-cols-6 ${key === ordersData.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
              }`}
            key={order.orderId}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{order.stockId}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p
                className={`${order.orderType === 'buy' ? 'text-green-500' : 'text-red-500'
                  }`}
              >
                {order.orderType}
              </p>
            </div>

            <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {new Date(order.orderTime).toLocaleString()}
              </p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{order.quantity}</p>
            </div>

            <div className="items-center justify-center p-2.5 flex xl:p-5">
              <p className="text-blue-500">${order.amount}</p>
            </div>

            <div className="items-center justify-center p-2.5 flex xl:p-5">
              {order.orderType === 'sell'&& (order.profit!==null) ? (
                <p
                  className={`${order.profit >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                >
                  ${parseFloat(order.profit).toFixed(2)}
                </p>
              ) : (
                <p className="text-gray-500">N/A</p>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersTable;
