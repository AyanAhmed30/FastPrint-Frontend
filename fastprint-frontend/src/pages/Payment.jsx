import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Payment = () => {
  return (
    <>
      <Header />
       <div
        className="w-full h-[51px] flex items-center px-6"
        style={{
          background:
            "linear-gradient(90deg, #016AB3 16.41%, #0096CD 60.03%, #00AEDC 87.93%)",
        }}
      >
        <h1 className="text-white text-lg font-semibold">Payment</h1>
      </div>
      <div className="min-h-screen bg-gradient-to-br from-[#eef4ff] to-[#fef6fb] px-6 py-10 font-sans">
        <div className="max-w-[1400px] mx-auto flex gap-10">
          
          {/* Left Section */}
          <div className="w-[60%] bg-gradient-to-br from-[#f2f9ff] via-white to-[#fff0f5] rounded-2xl shadow-xl p-10">
            <h2 className="text-2xl font-bold text-[#2A428C] mb-2">Payment Info</h2>
            <p className="text-sm text-gray-600 mb-6">
              All transactions are secure and encrypted
            </p>

            {/* Credit Card Option */}
            <div className="border p-4 rounded-lg mb-4">
              <label className="flex items-center gap-3">
                <input type="radio" name="payment" defaultChecked />
                <span className="text-sm font-semibold">Credit Card</span>
              </label>
            </div>

            {/* PayPal Option */}
            <div className="border p-4 rounded-lg mb-6">
              <label className="flex items-center gap-3">
                <input type="radio" name="payment" />
                <span className="text-sm font-semibold">PayPal</span>
              </label>
            </div>

            {/* Card Number */}
            <input
              type="text"
              placeholder="Card Number"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md text-sm"
            />

            {/* Expiration & CVV */}
            <div className="flex gap-6 mb-6">
              <input
                type="text"
                placeholder="MM/YY"
                className="w-1/2 p-3 border border-gray-300 rounded-md text-sm"
              />
              <input
                type="text"
                placeholder="CVV"
                className="w-1/2 p-3 border border-gray-300 rounded-md text-sm"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button className="w-1/2 py-3 bg-gray-200 text-black font-medium text-sm rounded-full shadow-md hover:shadow-lg">
                Cancel
              </button>
              <button className="w-1/2 py-3 bg-gradient-to-r from-[#0a79f8] to-[#1e78ee] text-white font-medium text-sm rounded-full shadow-md hover:shadow-lg">
                Confirm Payment
              </button>
            </div>
          </div>

          {/* Right Section - Cart Summary */}
          <div className="w-[40%] relative">
            <div className="absolute w-[526px] h-[601px] bg-gradient-to-br from-[#e0f3ff] via-white to-[#ffe4ec] rounded-[20px] shadow-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[#2A428C] text-xl font-semibold">Cart summary</h3>
                <div className="flex items-center gap-2 text-[#2A428C] font-semibold text-xl cursor-pointer">
                  <span>Edit</span>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M3 17.25V21h3.75l11-11.03-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 000-1.42l-2.34-2.34a1.003 1.003 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" />
                  </svg>
                </div>
              </div>

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

              {/* Discount */}
              <div className="flex justify-between items-center bg-[#F7F7F7] px-4 py-2 rounded-lg mb-6">
                <span className="text-[#CBCBCB] text-sm">Discount</span>
                <button className="px-4 py-1 bg-gradient-to-r from-[#D15D9E] to-[#5D4495] text-white rounded-lg text-sm">
                  Apply
                </button>
              </div>

              {/* Pricing */}
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

export default Payment;
