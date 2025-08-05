//import logo from './logo.svg';
import './App.css';
import Dashboard from "./component/home.jsx";
import LandingPage from "./component/landing.jsx";
import LoginPage from "./component/login.jsx";
import Signup from "./component/signup.jsx";
import ProductDetails from "./component/checkout.jsx";
import Profile from "./component/profile.jsx";
import Support from "./component/support.jsx";
import OrderHistory from "./component/history.jsx";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import FundWallet from "./component/fundwallet.jsx";
import { logout } from './component/auth';

const isAuthenticated = () => {
  const accessToken = localStorage.getItem("access_token");
  const expiresIn = localStorage.getItem("expires_in");

  if (!accessToken || !expiresIn || Date.now() >= parseInt(expiresIn)) {
    if (accessToken && expiresIn && Date.now() >= parseInt(expiresIn)) {
      console.log("Access token expired for route protection. Logging out.");
      logout();
    } else if (!accessToken) {
      console.log("No access token found. Ensuring logout state.");
      logout();
    }
    return false;
  }
  console.log("Access Token Valid for route access.");
  return true;
};

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={ <LandingPage />} />
        <Route path="/create" element={<Signup />} />
        <Route path="/product/:id" element={<PrivateRoute element={<ProductDetails />} />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
        <Route path="/support" element={<Support />} />
        <Route path="/history" element={<PrivateRoute element={<OrderHistory />} />} />
        <Route path="/home" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/fundwallet" element={<PrivateRoute element={<FundWallet />} />} />
      </Routes>
    </Router>
  );
}

export default App;