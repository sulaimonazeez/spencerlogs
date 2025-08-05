import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-indigo-600">Spylogs</div>

          {/* Desktop nav */}
          <div className="hidden md:flex space-x-6">
            <a href="#features" className="text-gray-600 hover:text-indigo-600">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-indigo-600">Pricing</a>
            <a href="#contact" className="text-gray-600 hover:text-indigo-600">Contact</a>
            <Link to="/login" className="text-gray-600 hover:text-indigo-600">Sign In</Link>
            <Link to="/create" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Sign Up</Link>
          </div>

          {/* Mobile toggle button */}
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={toggleMenu}
        />
      )}

      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="p-6 space-y-6 pt-20">
          <a href="#features" onClick={toggleMenu} className="block text-gray-700 hover:text-indigo-600">Features</a>
          <a href="#pricing" onClick={toggleMenu} className="block text-gray-700 hover:text-indigo-600">Pricing</a>
          <a href="#contact" onClick={toggleMenu} className="block text-gray-700 hover:text-indigo-600">Contact</a>
          <Link to="/login" onClick={toggleMenu} className="block text-gray-700 hover:text-indigo-600">Sign In</Link>
          <Link
            to="/create"
            onClick={toggleMenu}
            className="block text-center bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
}