import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [confirm, setConfirm] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !username || !password || !confirm) {
      setTrigger(false);
      alert("Please fill out all fields.");
    } else if (password !== confirm) {
      setTrigger(false);
      alert("Passwords do not match.");
    } else {
      setTrigger(true);
      try {
        const response = await axios.post("https://logserver.pythonanywhere.com/create/", {
          email,
          username,
          password
        });

        if (response.status === 201 || response.status === 200) {
          alert("Signup successful! 🎉");
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
        setTrigger(false);
        alert(error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-center text-2xl font-bold text-gray-700 mb-1">Create Your Account</h2>
        <p className="text-center text-sm text-gray-400 mb-6">Join the winning team</p>

        <div className="space-y-4">
          {/* Username */}
          <div className="flex items-center border rounded-lg px-3 py-2 text-gray-700">
            <FaUser className="mr-2" />
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Enter username"
              className="w-full outline-none"
              name="username"
            />
          </div>

          {/* Email */}
          <div className="flex items-center border rounded-lg px-3 py-2 text-gray-700">
            <FaEnvelope className="mr-2" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter Email Address"
              className="w-full outline-none"
              name="email"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded-lg px-3 py-2 text-gray-700">
            <FaLock className="mr-2" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Choose a password"
              className="w-full outline-none"
              name="password"
            />
            <span
              className="cursor-pointer text-xl text-gray-500 ml-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="flex items-center border rounded-lg px-3 py-2 text-gray-700">
            <FaLock className="mr-2" />
            <input
              onChange={(e) => setConfirm(e.target.value)}
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password"
              className="w-full outline-none"
              name="confirm"
            />
            <span
              className="cursor-pointer text-xl text-gray-500 ml-2"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>

          {/* Submit Button */}
          <button disabled={trigger}
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-indigo-700 to-purple-700 text-white font-semibold py-2 rounded-full hover:opacity-90 transition"
          >
            REGISTER
          </button>

          {/* Terms */}
          <div className="flex items-center mt-2">
            <input id="check" type="checkbox" defaultChecked className="mr-2" />
            <label htmlFor="check" className="text-sm text-gray-600">Terms and Conditions</label>
          </div>

          {/* Login Redirect */}
          <p className="text-sm text-center text-blue-500 mt-4">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;