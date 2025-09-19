import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./utility.jsx";

const PaystackForm = () => {
  const publicKey = "pk_live_5fadf3b006945de22692358a244a5af7d638d2f9"; // replace with your Paystack public key
  const [amount, setAmount] = useState("");
  const [data, setData] = useState({});
  const navigate = useNavigate();

  // Success + Close Handlers
  const onSuccess = (response) => {
    console.log("Payment success:", response);
    alert("Payment successful! Ref: " + response.reference);
  };

  const onClose = () => {
    alert("Payment window closed.");
  };

  // Call Paystack
  const payWithPaystack = () => {
    if (!amount || !data.email) {
      alert("Please enter a valid amount and ensure your email is loaded.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: data.email,
      amount: amount * 100, // Paystack expects kobo
      ref: new Date().getTime().toString(),
      metadata: {
        custom_fields: [
          {
            display_name: "Name",
            variable_name: "name",
            value: data.username,
          },
        ],
      },
      callback: onSuccess,
      onClose: onClose,
    });

    handler.openIframe();
  };

  // Load user data
  useEffect(() => {
    axiosInstance
      .get("/api/fundwallet/")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert("Error occurred while fetching user data");
      });
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      {/* Top bar */}
      <div className="mb-5 shadow fixed top-0 left-0 w-full p-4 z-50 bg-white flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-gray-700 text-lg font-medium">
          <FaArrowLeft onClick={() => navigate(-1)} />
          <span>Back</span>
        </div>
      </div>
      <br />
      <br />

      <h2 className="text-xl font-bold text-center">Fund Wallet</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={data.username || ""}
        readOnly
        className="w-full border rounded-lg p-2"
      />

      <input
        type="email"
        placeholder="Email Address"
        value={data.email || ""}
        readOnly
        className="w-full border rounded-lg p-2"
      />

      <input
        type="number"
        placeholder="Amount (₦)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border rounded-lg p-2"
      />

      <button
        onClick={payWithPaystack}
        className="w-full bg-green-600 text-white p-2 rounded-lg"
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaystackForm;