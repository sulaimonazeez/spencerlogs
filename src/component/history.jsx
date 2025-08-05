import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axiosInstance from './utility.jsx';

const getStatusStyle = (status) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-green-100 text-green-700';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'failed':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const OrderHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your actual endpoint
        const response = await axiosInstance.get('/api/transactions/');
        setOrders(response.data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      }
    };

    const fetchBalance = async () => {
      try {
        const res = await axiosInstance.get('/api/wallet/');
        setBalance(res.data.balance);
      } catch (err) {
        console.error('Failed to fetch balance:', err);
      }
    };

    fetchData();
    fetchBalance();
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-100 px-4 pt-20 pb-10">
      {/* Top Bar */}
      <div className="fixed top-4 left-4 z-50 flex items-center justify-between w-[calc(100%-2rem)]">
        <button
          onClick={() => navigate(-1)}
          className="bg-white shadow p-2 rounded-full text-gray-700 hover:bg-gray-200"
        >
          <FaArrowLeft />
        </button>
        <button className="bg-purple-600 text-white font-bold text-xs px-3 py-1 rounded-full shadow hover:bg-purple-700">
          ₦{ balance || 0}
        </button>
      </div>

      {/* Page Title */}
      <div className="text-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Order History</h2>
        <p className="text-sm text-gray-500">All your past orders in one place</p>
      </div>

      {/* Order List */}
      <div className="space-y-4 max-w-md mx-auto">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-4 rounded-xl shadow-md"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">
                  {order.product_type?.name || 'Deleted Product'}
                </h3>
                <p className="text-xs text-gray-500">
                  {new Date(order.timestamp).toLocaleString()}
                </p>
                <p className="text-sm mt-1 text-gray-700">₦{parseFloat(order.amount).toLocaleString()}</p>
              </div>
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusStyle(order.status)}`}
              >
                {order.status}
              </span>
            </div>

            {/* Credentials */}
            {order.product?.access_info && (
              <div className="mt-3 bg-gray-100 p-3 rounded text-sm text-gray-800">
                <span className="font-semibold text-gray-600">Credential:</span><br />
                <code className="block whitespace-pre-wrap break-words">{order.product.access_info}</code>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;