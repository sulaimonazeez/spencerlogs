import { Mail, Phone, Globe } from "lucide-react";
import Navbar from "./header.jsx";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LandingPage() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const sendMessage = () =>{
      if (message && email && name) {
        axios.post("http://127.0.0.1:8000/api/message/", {"name":name, "email":email, "message":message}).then(res=>{
          if (res.status === 201) {
            alert("Sent Successful Youll hear from us through email address.");
          } else {
            alert("Unable to send Message");
          }
        })
        .catch(err =>{
          console.log(err);
          alert("Something went wrong");
        })
      }
      setName("");
      setMessage("");
      setEmail("");
    }
    return ( <div className="font-sans text-gray-800"> {/* Header */} <header className="bg-gradient-to-r from-indigo-600 to-purple-600 py-6 shadow-xl"> <Navbar /> </header>

{/* Hero Section */}
  <section className="bg-white py-20 text-center">
    <div className="max-w-3xl mx-auto px-4">
      <h2 className="text-4xl font-extrabold mb-6">Stay Connected, Anytime, Anywhere</h2>
      <p className="text-lg mb-8 text-gray-600">
       Acquire Authentic Social Media Services With Ease! and virtual number. Works globally.
      </p>
      <button onClick={ ()=>{
        navigate("/login")
      }} className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold px-8 py-4 rounded-lg shadow-md">
        Get Started Now
      </button>
    </div>
  </section>

  {/* Features Section */}
  <section id="features" className="bg-gray-100 py-20">
    <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-10">
      <div className="bg-white p-6 rounded-2xl shadow">
        <Phone className="h-8 w-8 text-indigo-500 mb-4" />
        <h3 className="text-xl font-bold mb-2">Free Voice Calls</h3>
        <p>Get a international phone number for calling accross the world.</p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow">
        <Mail className="h-8 w-8 text-indigo-500 mb-4" />
        <h3 className="text-xl font-bold mb-2">Text Messaging</h3>
        <p>Get a virtual number for verifivation. (e.g WhatsApp Verifivation)</p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow">
        <Globe className="h-8 w-8 text-indigo-500 mb-4" />
        <h3 className="text-xl font-bold mb-2">Social Service</h3>
        <p>Get your own social services from multiple countries for business or personal use.</p>
      </div>
    </div>
  </section>

  {/* How It Works Section */}
  <section className="bg-white py-20">
    <div className="max-w-5xl mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-12">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-8 text-left">
        <div>
          <h4 className="text-xl font-semibold mb-2">1. Sign Up</h4>
          <p>Create your free account in less than a minute.</p>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-2">2. Pick a Number</h4>
          <p>Choose any of our service and make a purchase.</p>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-2">3. Start Connecting</h4>
          <p>Call or text anyone, anywhere, anytime.</p>
        </div>
      </div>
    </div>
  </section>

  {/* Testimonials */}
  <section className="bg-gray-50 py-20">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <p>"This app changed how I connect with clients abroad. Absolutely seamless experience!"</p>
          <span className="mt-4 block font-semibold">— Jane D.</span>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p>"Easy to use and very reliable. I use it for all my international calls."</p>
          <span className="mt-4 block font-semibold">— Mike R.</span>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p>"Affordable and powerful. I love the simplicity and global reach."</p>
          <span className="mt-4 block font-semibold">— Linda W.</span>
        </div>
      </div>
    </div>
  </section>

  {/* Pricing Section */}
  <section id="pricing" className="bg-white py-20">
    <div className="max-w-5xl mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-10">Simple Pricing</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="border rounded-2xl p-6 shadow">
          <h3 className="text-xl font-semibold mb-2">Free</h3>
          <p className="mb-4">Basic calling and messaging</p>
          <p className="text-2xl font-bold mb-4">$0/mo</p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold">
            Start for Free
          </button>
        </div>
        <div className="border rounded-2xl p-6 shadow">
          <h3 className="text-xl font-semibold mb-2">Pro</h3>
          <p className="mb-4">Unlock more features</p>
          <p className="text-2xl font-bold mb-4">$2/mo</p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold">
            Choose Pro
          </button>
        </div>
        <div className="border rounded-2xl p-6 shadow">
          <h3 className="text-xl font-semibold mb-2">Business</h3>
          <p className="mb-4">For teams & enterprises</p>
          <p className="text-2xl font-bold mb-4">$8.99/mo</p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold">
            Get Business
          </button>
        </div>
      </div>
    </div>
  </section>

  {/* Contact Section */}
  <section id="contact" className="bg-gray-100 py-20">
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
      <form onSubmit={(e)=>{
        e.preventDefault();
        sendMessage();
      }} className="grid gap-6 md:grid-cols-2">
        <input value={name} onChange={(e)=>{
          setName(e.target.value)
        }}
          type="text"
          placeholder="Your Name"
          className="p-4 rounded-xl border border-gray-300 w-full"
        />
        <input value={email} onChange={(e)=>{
          setEmail(e.target.value);
        }}
          type="email"
          placeholder="Your Email"
          className="p-4 rounded-xl border border-gray-300 w-full"
        />
        <textarea value={message} onChange={(e)=>{
          setMessage(e.target.value)
        }}
          placeholder="Your Message"
          className="p-4 rounded-xl border border-gray-300 w-full md:col-span-2"
          rows={5}
        ></textarea>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white md:col-span-2 w-full py-4 text-lg font-semibold rounded-lg"
        >
          Send Message
        </button>
      </form>
    </div>
  </section>

  {/* Footer */}
  <footer className="bg-gray-900 text-white py-8 text-center">
    <div className="max-w-6xl mx-auto px-4">
      <p>&copy; {new Date().getFullYear()} ClashLogs. All rights reserved.</p>
    </div>
  </footer>
</div>

); }

