"use client";

import { FiSearch, FiShoppingCart, FiSmartphone, FiTablet, FiHeadphones, FiWatch } from 'react-icons/fi';
import { Toaster } from 'react-hot-toast';

const categories = [
  { name: 'Smartphones', icon: <FiSmartphone /> },
  { name: 'Tablets', icon: <FiTablet /> },
  { name: 'Headphones', icon: <FiHeadphones /> },
  { name: 'Wearables', icon: <FiWatch /> }
];

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
          }
        }}
      />
      
      <nav className="bg-white shadow-sm sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-16">
      <div className="flex items-center">
        <span className="text-xl font-bold text-indigo-600">GadgetHub</span>
      </div>
      <div className="hidden md:flex items-center space-x-8">
        <a href="#" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">Home</a>
        <a href="#" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">Shop</a>
        <a href="/orders" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">Orders</a>
        <a href="#" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">About</a>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-500 hover:text-gray-700">
          <FiSearch className="h-5 w-5" />
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700 relative">
          <FiShoppingCart className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
        </button>
        <button className="md:hidden p-2 text-gray-500 hover:text-gray-700">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</nav>
     
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Amazing Gadgets</h1>
          <p className="text-xl mb-8">Find the perfect tech for your lifestyle</p>
          
       
          <div className="max-w-2xl mx-auto flex">
            <input
              type="text"
              placeholder="Search for gadgets..."
              className="flex-1 px-6 py-3 rounded-l-lg text-gray-800 focus:outline-none"
            />
            <button 
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-r-lg flex items-center"
              onClick={() => toast.success('Search functionality coming soon!')}
            >
              <FiSearch className="mr-2" /> Search
            </button>
          </div>
        </div>
      </section>

    
    
<section className="py-16 bg-gradient-to-b from-white to-gray-50">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
        Shop by Category
      </h2>
      <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
        Explore our wide range of tech categories
      </p>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {categories.map((category, index) => (
        <div 
          key={index}
          className="group relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
          onClick={() => toast.success(`Browsing ${category.name}`)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 mb-4 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
              {category.icon}
            </div>
            <h3 className="text-center text-lg font-semibold text-gray-900 mb-2">
              {category.name}
            </h3>
            <p className="text-center text-sm text-gray-600">
              {category.name === 'Smartphones' ? '42' : 
               category.name === 'Tablets' ? '28' : 
               category.name === 'Headphones' ? '35' : '19'} products
            </p>
            <div className="mt-4 flex justify-center">
              <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-700 transition-colors duration-200">
                View all →
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
    </main>
  );
}