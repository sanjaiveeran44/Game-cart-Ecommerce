"use client";

import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FiShoppingCart, FiSearch, FiSmartphone, FiTablet, FiHeadphones, FiWatch } from 'react-icons/fi';

export default function Home() {
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#4F46E5',
            color: '#fff',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
            padding: '12px 20px',
          },
          success: {
            iconTheme: {
              primary: '#fff',
              secondary: '#4F46E5',
            },
          },
        }}
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Amazing Gadgets</h1>
          <p className="text-xl mb-8">Find the perfect tech for your lifestyle</p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto flex">
            <input
              type="text"
              placeholder="Search for gadgets..."
              className="flex-1 px-6 py-3 rounded-l-lg text-gray-800 focus:outline-none"
            />
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-r-lg flex items-center">
              <FiSearch className="mr-2" /> Search
            </button>
          </div>
        </div>
      </section>
      <section className="py-12 container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center"
            >
              <div className="text-3xl text-indigo-600 mb-3">{category.icon}</div>
              <h3 className="font-medium">{category.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}