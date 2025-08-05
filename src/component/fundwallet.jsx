import { useState, useEffect } from "react";
import axiosInstance from "./utility.jsx";

export default function FundWallet() {
  const [virtualAccount, setVirtualAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      axiosInstance.post("api/account/details/").then(res=>{
        setVirtualAccount(res.data);
      })
      .catch(err =>{
        console.log("error: ", err);
        alert(err);
      })
    } catch (err) {
      console.error("Error generating account:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() =>{
    axiosInstance.get("/api/account/details/").then(res=>{
      setVirtualAccount(res.data);
    })
    .catch(err=>{
      console.log("error")
    })
  }, [])
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Fund Wallet</h2>

      {virtualAccount ? (
        <div className="bg-green-50 p-4 rounded-lg shadow-inner">
          <p className="text-gray-700 font-medium">Send payment to:</p>
          <div className="mt-2">
            <p className="text-xl font-bold tracking-widest text-gray-900">{virtualAccount.account_number}</p>
            <p className="text-sm text-gray-600">{virtualAccount.bank_name}</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">First Name</label>
            <input
              name="first_name"
              type="text"
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="Enter your first name"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Last Name</label>
            <input
              name="last_name"
              type="text"
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Enter your last name"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
            <input
              name="phone_number"
              type="tel"
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="e.g. 08012345678"
            />
          </div>

          <button
            onClick={handleGenerate}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Account"}
          </button>
        </div>
      )}
    </div>
  );
}