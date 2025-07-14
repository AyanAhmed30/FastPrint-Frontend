import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Shop = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    company: "",
    address: "",
    apt_floor: "",
    country: "",
    state: "",
    city: "",
    postal_code: "",
    phone_number: "",
  });

const deliveryHandler = async () => {
  const token = localStorage.getItem("accessToken"); // 🛠 Correct token key

  if (
    !form.first_name ||
    !form.last_name ||
    !form.address ||
    !form.country ||
    !form.city ||
    !form.phone_number
  ) {
    alert("Please fill all required fields.");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:8000/api/save-shipping/",
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Correct header
          "Content-Type": "application/json",
        },
      }
    );

    alert("Shipping information saved!");
    navigate("/payment");
  } catch (error) {
    console.error("Shipping save error:", error.response?.data || error.message);
    if (error.response?.status === 401) {
      alert("Session expired. Please log in again.");
    } else {
      alert("Failed to save shipping info. Please try again.");
    }
  }
};




  return (
    <>
      <Header />
      <div
        className="w-full h-[51px] flex items-center px-6"
        style={{
          background: "linear-gradient(90deg, #016AB3 16.41%, #0096CD 60.03%, #00AEDC 87.93%)",
        }}
      >
        <h1 className="text-white text-lg font-semibold">Shop</h1>
      </div>

      <div className="w-full min-h-screen bg-gradient-to-br from-[#eef4ff] to-[#fef6fb] px-6 py-10 font-sans relative">
        <div className="max-w-[1400px] mx-auto flex gap-10 relative">
          {/* Left Section with Gradient */}
          <div className="w-[60%] bg-gradient-to-br from-[#f2f9ff] via-white to-[#fff0f5] rounded-2xl shadow-xl p-10">
            <h2 className="text-2xl font-bold text-[#2A428C] mb-4">Enter Your Shipping Address</h2>
            <hr className="mb-6 border-[#2A428C]" />

            {/* Full Name */}
            <div className="flex gap-6 mb-4">
              <input
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                placeholder="First Name"
                className="w-1/2 p-3 border border-gray-300 rounded-md text-sm"
              />
              <input
                type="text"
                name="last_name"
                value={form.last_name}
                onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                placeholder="Last Name"
                className="w-1/2 p-3 border border-gray-300 rounded-md text-sm"
              />
            </div>

            {/* Company Name */}
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
              placeholder="Company/Organization Name"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md text-sm"
            />

            {/* Address */}
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
              placeholder="Address"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md text-sm"
            />

            {/* Apt/Floor */}
            <input
              type="text"
              name="apt_floor"
              value={form.apt_floor}
              onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
              placeholder="Apt/Floor"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md text-sm"
            />

            {/* Country & State */}
            <div className="flex gap-6 mb-4">
              <input
                type="text"
                name="country"
                value={form.country}
                onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                placeholder="Country"
                className="w-1/2 p-3 border border-gray-300 rounded-md text-sm"
              />
              <input
                type="text"
                name="state"
                value={form.state}
                onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                placeholder="State"
                className="w-1/2 p-3 border border-gray-300 rounded-md text-sm"
              />
            </div>

            {/* City & Postal Code */}
            <div className="flex gap-6 mb-4">
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                placeholder="City"
                className="w-1/2 p-3 border border-gray-300 rounded-md text-sm"
              />
              <input
                type="text"
                name="postal_code"
                value={form.postal_code}
                onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                placeholder="Postal Code"
                className="w-1/2 p-3 border border-gray-300 rounded-md text-sm"
              />
            </div>

            {/* Phone Number */}
            <input
              type="text"
              name="phone_number"
              value={form.phone_number}
              onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
              placeholder="Phone Number"
              className="w-full p-3 mb-6 border border-gray-300 rounded-md text-sm"
            />

            <button
              className="w-full py-3 bg-gradient-to-r from-[#0a79f8] to-[#1e78ee] text-white font-medium text-sm rounded-full shadow-md hover:shadow-lg"
              onClick={deliveryHandler}
            >
              Check Delivery Method
            </button>
          </div>

          {/* Right Section - Cart Summary */}
          <div className="relative w-[40%]">
            <div className="absolute w-[526px] h-[640px] bg-gradient-to-br from-[#e0f3ff] via-white to-[#ffe4ec] rounded-[20px] shadow-xl top-0 right-0 p-6">
              <div className="flex justify-between mb-4">
                <h3 className="text-[#2A428C] text-xl font-semibold">Cart summary</h3>
                <div className="flex items-center gap-2 text-[#2A428C] font-semibold text-xl cursor-pointer">
                  <span>Edit</span>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M3 17.25V21h3.75l11-11.03-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 000-1.42l-2.34-2.34a1.003 1.003 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" />
                  </svg>
                </div>
              </div>

              {/* Book Item */}
              <div className="bg-[#E5FBFF] rounded-xl p-4 flex gap-4 mb-6">
                <div className="w-[116px] h-[121px] bg-gray-200 rounded-xl"></div>
                <div className="flex flex-col justify-center">
                  <h4 className="text-[#2A428C] font-bold text-xl mb-1">Book</h4>
                  <p className="text-[#2A428C] text-sm">Paperback</p>
                  <p className="text-black font-bold text-lg mt-2">$80.49</p>
                </div>
                <div className="ml-auto w-[36px] h-[36px] bg-gradient-to-r from-[#0060A9] to-[#00AEDC] rounded-full text-white flex items-center justify-center shadow-md font-bold text-sm">
                  2
                </div>
              </div>

              {/* Discount Box */}
              <div className="flex justify-between items-center bg-[#F7F7F7] px-4 py-2 rounded-lg mb-6">
                <span className="text-[#CBCBCB] text-sm">Discount</span>
                <button className="px-4 py-1 bg-gradient-to-r from-[#D15D9E] to-[#5D4495] text-white rounded-lg text-sm">
                  Apply
                </button>
              </div>

              {/* Pricing Summary */}
              <div className="text-sm space-y-2">
                <div className="flex justify-between font-bold">
                  <span>Subtotal</span>
                  <span>1295 USD</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Shipping</span>
                  <span>000 USD</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Taxes</span>
                  <span>000 USD</span>
                </div>
                <div className="flex justify-between font-bold text-[#2A428C] text-lg">
                  <span>Total</span>
                  <span>1295 USD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shop;
