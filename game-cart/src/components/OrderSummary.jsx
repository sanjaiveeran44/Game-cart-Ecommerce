import { useAppContext } from "@/context/AppContext";
import React, { useEffect, useRef, useState } from "react";

const OrderSummary = () => {

  const { currency, router, getCartCount, getCartAmount, userAddresses, selectedAddressId, setSelectedAddressId } = useAppContext()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showPlaceOrderToast, setShowPlaceOrderToast] = useState(false);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const toastTimerRef = useRef(null);

  const handleAddressSelect = (address) => {
    setSelectedAddressId(address?._id || null);
    setIsDropdownOpen(false);
  };

  const createOrder = async () => {
    setShowPlaceOrderToast(true)
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    toastTimerRef.current = setTimeout(() => {
      setShowPlaceOrderToast(false)
      toastTimerRef.current = null
    }, 2200)
  }

  const handlePlaceOrderClick = () => {
    setShowOrderConfirmation(true)
  }

  const handleConfirmOrder = async () => {
    setShowOrderConfirmation(false)
    await createOrder()
    // Route to order-placed page after confirming order
    router.push('/order-placed')
  }

  const dismissPlaceOrderToast = () => {
    setShowPlaceOrderToast(false)
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current)
      toastTimerRef.current = null
    }
  }

  useEffect(() => {
    if (!selectedAddressId && userAddresses?.length) {
      setSelectedAddressId(userAddresses[0]._id)
    }
  }, [selectedAddressId, userAddresses?.length])

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    }
  }, [])

  const selectedAddress = userAddresses?.find((a) => a?._id === selectedAddressId) || null

  return (
    <div className="w-full lg:w-96 h-fit rounded-2xl border border-slate-200/70 bg-white p-6 md:p-7 shadow-[0_18px_40px_-28px_rgba(2,6,23,0.35)]">
      <div className="fixed left-1/2 top-20 z-[60] w-[92vw] max-w-md -translate-x-1/2">
        <div className={`transform-gpu origin-right overflow-hidden rounded-2xl border border-emerald-200/60 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900 shadow-[0_18px_50px_-30px_rgba(16,185,129,0.35)] ring-1 ring-emerald-300/30 transition-all duration-300 ease-out ${showPlaceOrderToast ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}>
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-600 text-white shadow-sm">
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 011.414-1.42l2.793 2.794 6.793-6.794a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </span>
            <span className="whitespace-nowrap">Order placed</span>
            <button
              type="button"
              onClick={dismissPlaceOrderToast}
              className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-xl text-emerald-800/70 hover:bg-emerald-100 hover:text-emerald-900 transition-colors"
              aria-label="Close notification"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-6 border-b border-slate-200/70 pb-4">
        Order Summary
      </h2>

      <div className="space-y-6 mb-8">
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-2">
            Select Shipping Address
          </label>
          <div className="relative w-full">
            <button
              className="peer w-full text-left px-4 py-3 bg-white border border-slate-200/70 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400/60 transition-all duration-200 flex items-center justify-between shadow-sm hover:border-blue-700"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>
                {selectedAddress
                  ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
                  : "Select Address"}
              </span>
              <svg className={`w-5 h-5 text-gray-500 transform ${isDropdownOpen ? "rotate-180" : "rotate-0"} transition-transform duration-200`}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul className="absolute w-full bg-white border border-slate-200 rounded-xl shadow-lg mt-2 z-10 py-1.5 max-h-60 overflow-y-auto">
                {userAddresses.map((address, index) => (
                  <li
                    key={address?._id || index}
                    className="px-4 py-2 text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors duration-200 text-sm"
                    onClick={() => handleAddressSelect(address)}
                  >
                    {address.fullName}, {address.area}, {address.city}, {address.state}
                  </li>
                ))}
                <li
                  onClick={() => { router.push("/add-address"); setIsDropdownOpen(false); }}
                  className="px-4 py-2 text-indigo-600 hover:bg-slate-50 cursor-pointer text-center font-semibold border-t border-slate-200 transition-colors duration-200"
                >
                  + Add New Address
                </li>
              </ul>
            )}
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-2">
            Payment Method
          </label>
          <div className="relative">
           <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="
            w-full h-12 px-4 pr-10
            rounded-lg
            border border-slate-200
            bg-white text-slate-900
            shadow-sm appearance-none
            transition-all duration-200
            hover:border-blue-700
            focus:outline-none
            focus:ring-2 focus:ring-blue-500/50
            focus:border-blue-500
            cursor-pointer

            [&_option]:py-3
            [&_option]:px-4
            [&_option]:text-slate-700
            [&_option]:rounded-md
            [&_option]:flex
            [&_option]:items-center
            [&_option]:gap-3
            [&_option]:hover:bg-blue-50
            [&_option]:hover:text-blue-900
          "
        >
          <option value="cod">Cash on Delivery</option>
          <option value="netbanking">Net Banking</option>
          <option value="gpay">GPay</option>
        </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-700">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-2">
            Promo Code
          </label>
          <div className="flex w-full min-w-0 flex-col items-stretch gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Enter promo code"
              className="h-12 w-full min-w-0 flex-1 px-4 rounded-lg border border-slate-200/70 hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 text-slate-900 placeholder-slate-500 shadow-sm"
            />
            <button className="h-12 w-full shrink-0 bg-slate-900 text-white px-8 py-2 rounded-lg font-semibold shadow-sm hover:bg-slate-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400/60 sm:w-auto">
              Apply
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between text-sm font-medium text-slate-700">
          <p>Items ({getCartCount()})</p>
          <p className="text-slate-900 font-semibold">{currency}{getCartAmount()}</p>
        </div>
        <div className="flex justify-between text-slate-600 text-sm">
          <p>Shipping Fee</p>
          <p className="font-medium text-slate-900">Free</p>
        </div>
        <div className="flex justify-between text-slate-600 text-sm">
          <p>Tax (2%)</p>
          <p className="font-medium text-slate-900">{currency}{(getCartAmount() * 0.02).toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-lg font-extrabold border-t border-slate-200/70 pt-4 mt-4 text-slate-900">
          <p>Total</p>
          <p>{currency}{(getCartAmount() + (getCartAmount() * 0.02)).toFixed(2)}</p>
        </div>
      </div>

      {!showOrderConfirmation ? (
        <button onClick={handlePlaceOrderClick} className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-4 font-bold text-white shadow-sm shadow-indigo-500/20 hover:from-violet-500 hover:to-indigo-500 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/20">
          Place Order
        </button>
      ) : (
        <div className="w-full rounded-xl border border-slate-200/70 bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold text-slate-800">Do you confirm this order?</p>
          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowOrderConfirmation(false)}
              className="flex-1 rounded-xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-300/60"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmOrder}
              className="flex-1 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3 text-sm font-bold text-white shadow-sm shadow-indigo-500/20 hover:from-violet-500 hover:to-indigo-500 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;