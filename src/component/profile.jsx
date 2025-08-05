import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUserCircle } from 'react-icons/fa'
import axiosInstance from "./utility.jsx";

const Profile = () => {
  const navigate = useNavigate();

  // Example user data
  const user = {
    name: "Azeez Sulaimon",
    email: "azeez@email.com",
    phone: "+234 808 000 0000",
    balance: 7200,
    totalOrders: 15,
    totalSpent: 32800
  };
  const [balance, setBalance] = useState(0);
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(true);
  const Logout = () =>{
    localStorage.removeItem("access_token");
    localStorage.removeItem("expires_in")
    navigate("/login");
  }
  useEffect(() =>{
    axiosInstance.get("/api/profile").then( response=>{
      setProfile(response.data);
      setLoading(false);
    })
    .catch(err =>{
      console.log(err);
      setLoading(false)
    })
    
    axiosInstance.get("/api/wallet/").then(res =>{
      setBalance(res.data.balance);
    })
    .catch(err =>{
      console.log(err);
    })
  }, [])
  if (loading) return <div className="p-4">Loading...</div>;
  if (!profile) return <div className="p-4 text-red-600">Product not found</div>;
  
  return (
    <div className="relative min-h-screen bg-gray-100 px-4 pt-20 pb-10">
      {/* Top Bar */}
      <div className="fixed top-4 left-4 z-50 flex items-center justify-between w-[calc(100%-2rem)]">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="bg-white shadow p-2 rounded-full text-gray-700 hover:bg-gray-200"
        >
          <FaArrowLeft />
        </button>

        {/* Balance Button */}
        <button className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow hover:bg-purple-700">
          ₦{balance || 0}
        </button>
      </div>

      {/* Profile Avatar */}
      <div className="flex flex-col items-center mt-4">
        <FaUserCircle className="text-6xl text-purple-500 mb-2" />
        <h1 className="text-lg font-bold text-gray-800">{profile.username}</h1>
        <p className="text-sm text-gray-600">{profile.email}</p>
        <p className="text-sm text-gray-600">{user.phone}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mt-6 max-w-sm mx-auto">
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-xs text-gray-500">Total Orders</p>
          <h2 className="text-xl font-bold text-purple-600">{profile.total_orders}</h2>
        </div>
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-xs text-gray-500">Total Spent</p>
          <h2 className="text-xl font-bold text-green-600">₦{profile.total_spent}</h2>
        </div>
      </div>

      {/* Action Button */}
      <div className="max-w-sm mx-auto mt-8">
        <button onClick={Logout} className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;