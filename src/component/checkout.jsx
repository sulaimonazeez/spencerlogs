import React, { useEffect, useState } from "react";
//import axios from "axios";
import axiosInstance from "./utility.jsx";
import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { useNavigate, useParams, Link } from "react-router-dom";
import InsufficientFundsModal from "./alert.jsx";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [credientials, setCredientials] = useState([]);
  const [show, setLog] = useState(false);
  const [balance, setBalance] = useState(0);
  const [showAlert, setAlert] = useState(false);
  //const token = localStorage.getItem("access_token"); // or however you store your token
const makePurchase = () =>{
  if (balance >= product.price) {
    axiosInstance.post(`/api/product/${id}/`)
    .then(res =>{
      if (res.data) {
        setLog(true);
        setAlert(true);
      }
      setCredientials(res.data);
    
    })
    .catch(err =>{
      console.log(err);
      alert(err);
    })
  } else {
    setAlert(true);
  }
}
  useEffect(() => {
    axiosInstance.get(`/api/product/${id}/`)
    .then(res => {
      setProduct(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Failed to fetch product", err);
      setLoading(false);
    });
    
    axiosInstance.get("api/wallet/").then(res =>{
      setBalance(res.data.balance);
    })
    .catch(err =>{
      console.log(err)
    })
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!product) return <div className="p-4 text-red-600">Product not found</div>;

  return (
    <div className="min-h-screen bg-white p-4">
      {/* Header */}
      <div className="mb-5 shadow fixed top-0 left-0 w-full p-4 z-50 bg-white flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-gray-700 text-lg font-medium">
          <FaArrowLeft onClick={() => navigate(-1)} />
          <span>Product Details</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xl">♠</span>
          <div className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-500">{balance || 0}</div>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-5"><br /><br />
        <div className="flex flex-col items-center text-center">
          <img
            src={product.icon_url}
            alt={product.name}
            className="w-20 h-20 object-contain"
          />
        </div>

        <h2 className="mt-5 text-xl font-semibold text-gray-700">{product.name}</h2>
        <p className="text-sm text-gray-500 mt-1">Product Description Here...</p>
      </div>

      {/* Price & Stock */}
      <div className="flex justify-between items-center mt-6 border-t border-gray-300">
        <span className="mt-5 text-lg text-gray-700 font-semibold">₦{product.price}</span>
        <span className={`mt-5 px-4 py-1 rounded-xl text-sm ${
          product.in_stock_count === 0 ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
        }`}>
          {product.in_stock_count} pcs in stock
        </span>
      </div>

      {/* Quantity & Total */}
      <div className="border-t border-gray-300 flex items-center justify-between mt-5">
        <input
          type="number"
          defaultValue={1}
          className="mt-5 w-20 border rounded-xl px-4 py-2 text-center text-lg outline-none"
        />
        <button className="mt-5 bg-gradient-to-r from-purple-700 to-pink-500 text-white font-bold px-6 py-2 rounded-xl">
          Buy ₦{Number(product.price).toLocaleString()}
        </button>
      </div>

      {/* Coupon Section */}
      <div className="mt-6 border-t border-gray-300">
        <p className="mt-5 text-sm text-gray-600 font-medium mb-2">Have a coupon?</p>
        <input
          type="text"
          placeholder="Enter Coupon Code"
          className="w-full border px-4 py-3 rounded-xl outline-none text-sm"
        />
      </div>

      {/* Disclaimer */}
      <div className="mt-5 mb-5"><br /><br />
        <p className="text-sm text-gray-600 font-medium mb-2 text-center">Disclaimer</p>
        <p className="mt-4 text-dark text-sm text-center">
          By purchasing any product, you agree that you are fully aware of these terms/conditions and agree to follow them!
          👉🏽 <Link className="text-blue-800" to="#">TERMS AND CONDITIONS</Link>
        </p>
      </div><br/><br /><br/>

      {/* Out of Stock Notice */}
      <div className="fixed bottom-0 left-0 z-50 bg-white p-3 w-full">
        <button onClick={makePurchase}
          disabled={product.in_stock_count === 0}
          className={`w-full mt-8 text-white py-3 rounded-full text-lg font-semibold flex items-center justify-center ${
            product.in_stock_count === 0
              ? 'bg-gray-400 opacity-60 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-700 to-pink-500'
          }`}
        >
          <FaShoppingCart className="mr-2" />
          {product.in_stock_count === 0 ? "Out of Stock" : "Buy Now"}
        </button>
      </div>
      <InsufficientFundsModal show={showAlert} setShow={setAlert}/>
      {show && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md">
      <h3 className="text-xl font-semibold mb-4">{product.name}</h3>
      <div className="text-gray-700">
        {credientials?.credential?.access_info || ''}
      </div>
      <button
        onClick={() => setLog(false)}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Close
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default ProductDetails;