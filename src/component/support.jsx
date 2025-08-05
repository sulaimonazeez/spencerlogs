import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
import axiosInstance from "./utility.jsx";
const Support = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  useEffect(() =>{
    axiosInstance.get("/api/wallet/").then(res =>{
      setBalance(res.data.balance);
    })
    .catch(err =>{
      console.log(err);
    })
  }, [])
  return (
    <div className="relative min-h-screen bg-gray-100 px-4 pt-20 pb-10">
      {/* Top Navigation */}
      <div className="fixed top-4 left-4 z-50 flex items-center justify-between w-[calc(100%-2rem)]">
        <button
          onClick={() => navigate(-1)}
          className="bg-white shadow p-2 rounded-full text-gray-700 hover:bg-gray-200"
        >
          <FaArrowLeft />
        </button>
        <button className="bg-white-600 text-gray font-bold text-xs px-3 py-1 rounded-full shadow hover:bg-purple-700">
  ₦{balance || 0}
         </button>
      </div>

      {/* Heading */}
      <div className="text-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Need Help?</h2>
        <p className="text-sm text-gray-600">Contact our support channels below</p>
      </div>

      {/* Support Links */}
      <div className="grid gap-4 max-w-md mx-auto">
        {/* Telegram Customer Support */}
        <a
          href="https://t.me/customer_support_channel"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-white shadow p-4 rounded-xl hover:bg-gray-50"
        >
          <div className="flex items-center gap-4">
            <FaTelegramPlane className="text-blue-500 text-2xl" />
            <div>
              <p className="font-semibold text-gray-800 text-sm">Customer Support</p>
              <p className="text-xs text-gray-500">@customer_support_channel</p>
            </div>
          </div>
          <span className="text-sm text-blue-500 font-medium">Open</span>
        </a>

        {/* Telegram Channel */}
        <a
          href="https://t.me/announcement_channel"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-white shadow p-4 rounded-xl hover:bg-gray-50"
        >
          <div className="flex items-center gap-4">
            <FaTelegramPlane className="text-blue-600 text-2xl" />
            <div>
              <p className="font-semibold text-gray-800 text-sm">Telegram Channel</p>
              <p className="text-xs text-gray-500">@announcement_channel</p>
            </div>
          </div>
          <span className="text-sm text-blue-600 font-medium">Join</span>
        </a>

        {/* WhatsApp Group */}
        <a
          href="https://chat.whatsapp.com/+2348080891605"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-white shadow p-4 rounded-xl hover:bg-gray-50"
        >
          <div className="flex items-center gap-4">
            <FaWhatsapp className="text-green-500 text-2xl" />
            <div>
              <p className="font-semibold text-gray-800 text-sm">WhatsApp Group</p>
              <p className="text-xs text-gray-500">Join our reseller group</p>
            </div>
          </div>
          <span className="text-sm text-green-600 font-medium">Join</span>
        </a>
      </div>
    </div>
  );
};

export default Support;