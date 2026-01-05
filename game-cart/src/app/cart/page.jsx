'use client'
import React from "react";
import { assets } from "@/assets/assets";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

const Cart = () => {

  const { products, router, cartItems, addToCart, updateCartQuantity, getCartCount } = useAppContext();

  return (
    <div className="min-h-screen py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 md:px-8 pb-14 md:pb-20 flex flex-col lg:flex-row gap-8 lg:gap-10">
        <div className="flex-1 rounded-2xl border border-slate-200/70 bg-white p-6 md:p-8 shadow-[0_18px_40px_-28px_rgba(2,6,23,0.35)]">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-6 pb-5 border-b border-slate-200/70">
            <div>
              <p className="text-xs font-semibold tracking-widest text-indigo-700">CHECKOUT</p>
              <h1 className="mt-2 text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900">Your Cart</h1>
            </div>
            <p className="text-sm md:text-base text-slate-600 font-medium">({getCartCount()} Items)</p>
          </div>
          {getCartCount() === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-600">
              <p className="text-xl md:text-2xl font-semibold mb-4">Your cart is empty.</p>
              <button onClick={() => router.push('/all-products')} className="inline-flex items-center justify-center rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400/60">
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.keys(cartItems).map((itemId) => {
                const product = products.find(product => product._id === itemId);

                if (!product || cartItems[itemId] <= 0) return null;

                return (
                  <div key={itemId} className="flex flex-col gap-4 rounded-2xl border border-slate-200/70 bg-white p-4 md:p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center gap-4">
                      <div className="rounded-xl overflow-hidden border border-slate-200/70 p-2 bg-slate-50 flex-shrink-0">
                        <Image
                          src={product.image[0]}
                          alt={product.name}
                          className="w-20 h-20 md:w-24 md:h-24 object-contain"
                          width={96}
                          height={96}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-900 font-semibold text-base md:text-lg leading-tight">{product.name}</p>
                        <button
                          className="mt-1 text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors duration-200"
                          onClick={() => updateCartQuantity(product._id, 0)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center justify-between sm:justify-start gap-6">
                        <p className="text-slate-700 font-bold">${product.offerPrice}</p>
                        <div className="flex items-center gap-2 border border-slate-200/70 rounded-xl p-1 w-fit bg-slate-50">
                          <button onClick={() => updateCartQuantity(product._id, cartItems[itemId] - 1)} className="p-2 text-slate-600 hover:bg-white rounded-lg transition-colors duration-200 focus:outline-none">
                          <Image
                            src={assets.decrease_arrow}
                            alt="decrease_arrow"
                            className="w-4 h-4"
                          />
                          </button>
                          <input onChange={e => updateCartQuantity(product._id, Number(e.target.value))} type="number" value={cartItems[itemId]} className="w-12 text-center text-slate-900 font-semibold text-sm border-x border-slate-200/70 bg-transparent focus:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"></input>
                          <button onClick={() => addToCart(product._id)} className="p-2 text-slate-600 hover:bg-white rounded-lg transition-colors duration-200 focus:outline-none">
                          <Image
                            src={assets.increase_arrow}
                            alt="increase_arrow"
                            className="w-4 h-4"
                          />
                          </button>
                        </div>
                      </div>
                      <p className="text-slate-900 font-extrabold text-lg md:text-xl">${(product.offerPrice * cartItems[itemId]).toFixed(2)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {getCartCount() > 0 && (
            <button onClick={() => router.push('/all-products')} className="group flex items-center mt-8 gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors duration-200">
              <Image
                className="group-hover:-translate-x-0.5 transition-transform duration-200 w-5 h-5"
                src={assets.arrow_icon}
                alt="arrow_right_icon_colored"
              />
              Continue Shopping
            </button>
          )}
        </div>
        <OrderSummary />
      </div>
    </div>
  );
};

export default Cart;
