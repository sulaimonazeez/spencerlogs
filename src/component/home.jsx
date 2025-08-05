import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import { FaWallet, FaBoxOpen, FaHome, FaHeadset, FaUser } from 'react-icons/fa';
import axiosInstance from './utility.jsx';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [wallet, setWallet] = useState({ balance: 0 });
  const [products, setProducts] = useState([]);
  //const host = "http://127.0.0.1:8000/media/product_icons";
  useEffect(() => {
    //const token = localStorage.getItem("access_token");

    axiosInstance.get("/dashboard/").then(res => {
      setUser(res.data.user);
      setWallet(res.data.wallet);
      setProducts(res.data.products);
    }).catch(err => {
      console.error("Failed to fetch dashboard:", err);
    });
  }, []);

  return (
    <div className="pb-24 px-4">
      {/* Top Section */}
      <div className="py-5">
        <h2 className="text-lg font-semibold text-gray-800">
          Good afternoon, {user?.username || "Guest"} 👋
        </h2>

        <div className="mt-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl text-white p-4 w-56">
          <p className="text-sm">Balance</p>
          <h3 className="text-2xl font-bold">₦{wallet?.balance || 0}</h3>
          <Link
            to="/fundwallet"
            className="mt-2 inline-block bg-white text-purple-600 px-4 py-1 text-sm font-semibold rounded-full"
          >
            Fund Wallet
          </Link>
        </div>
      </div>

      {/* Products */}
      <h3 className="text-md font-semibold text-gray-700 mb-2">Top Products</h3>
      <div className="grid gap-4">
        {products.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="bg-white shadow-md p-4 rounded-xl flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <img
                src={`${product.icon_url || product.image}`}
                alt={product.name}
                className="w-12 h-12 object-contain" onClick={() =>{
                  alert(product.icon_url);
                }}
              />
              <div>
                <h4 className="text-sm font-semibold text-gray-700">{product.name}</h4>
                <p className="text-xs text-gray-500">₦{product.price.toLocaleString()}/Pcs</p>
                <p
                  className={`text-xs mt-1 font-medium ${
                    product.in_stock_count === 0 ? 'text-red-500' : 'text-green-600'
                  }`}
                >
                  {product.in_stock_count === 0
                    ? 'Out of Stock'
                    : `${product.in_stock_count} in stock`}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow z-50 flex justify-around items-center py-3">
        <Link to="/home" className="flex flex-col items-center text-xs text-gray-600">
          <FaHome className="text-lg" />
          Home
        </Link>
        <Link to="/history" className="flex flex-col items-center text-xs text-gray-600">
          <FaBoxOpen className="text-lg" />
          Orders
        </Link>
        <Link to="/fundwallet" className="flex flex-col items-center text-xs text-gray-600">
          <FaWallet className="text-lg" />
          Wallet
        </Link>
        <Link to="/support" className="flex flex-col items-center text-xs text-gray-600">
          <FaHeadset className="text-lg" />
          Support
        </Link>
        <Link to="/profile" className="flex flex-col items-center text-xs text-gray-600">
          <FaUser className="text-lg" />
          Account
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;