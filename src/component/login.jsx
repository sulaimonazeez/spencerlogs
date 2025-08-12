// src/pages/Login.jsx
import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter username and password.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      });

      const token = response.data.access;
      localStorage.setItem("access_token", token);
      const decoded = jwtDecode(token);
      const expiresAt = decoded.exp * 1000;
      localStorage.setItem("expires_in", expiresAt.toString());
      alert("Login successful! ✅");
      navigate("/home"); // redirect to dashboard or home
    } catch (error) {
      console.error(error);
      alert("Invalid credentials. Try again.");
    }
  };
  
  useEffect(() =>{
  const accessToken = localStorage.getItem("access_token");
  const expiresIn = localStorage.getItem("expires_in");

  if (!accessToken || !expiresIn || Date.now() >= parseInt(expiresIn)) {
    if (accessToken && expiresIn && Date.now() >= parseInt(expiresIn)) {
      console.log("Access token expired for route protection. Logging out.");
      localStorage.removeItem('access_token');
      localStorage.removeItem('expires_in');
    } else if (!accessToken) {
      console.log("No access token found. Ensuring logout state.");
    }
  } else {
    navigate("/home")
  }


}, [navigate])


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-center text-2xl font-bold text-gray-700 mb-1">Welcome Back</h2>
        <p className="text-center text-sm text-gray-400 mb-6">Login to continue</p>

        <div className="space-y-4">
          {/* Username Field */}
          <div className="flex items-center border rounded-lg px-3 py-2 text-gray-700">
            <FaUser className="mr-2" />
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
              className="w-full outline-none"
            />
          </div>

          {/* Password Field */}
          <div className="flex items-center border rounded-lg px-3 py-2 text-gray-700">
            <FaLock className="mr-2" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full outline-none"
            />
            <span
              className="cursor-pointer text-xl text-gray-500 ml-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>

          {/* Submit */}
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-indigo-700 to-purple-700 text-white font-semibold py-2 rounded-full hover:opacity-90 transition"
          >
            LOGIN
          </button>

          {/* Redirect */}
          <p className="text-sm text-center text-blue-500 mt-4">
            Don't have an account? <Link to="/create">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;