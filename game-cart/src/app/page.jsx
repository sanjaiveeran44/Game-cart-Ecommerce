"use client";

import { FiSmartphone, FiTablet, FiHeadphones, FiWatch, FiSearch } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';

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
      
      <Navbar />
     
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Amazing Gadgets</h1>
          <p className="text-xl mb-8">Find the perfect tech for your lifestyle</p>
          
       
          <div className="max-w-2xl mx-auto flex shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <input
              type="text"
              placeholder="Search for gadgets..."
              className="flex-1 px-6 py-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
            />
            <button 
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-semibold px-8 py-4 flex items-center space-x-2 transition-all duration-300 hover:shadow-inner"
              onClick={() => toast.success('Search functionality coming soon!')}
            >
              <FiSearch className="h-5 w-5" />
              <span>Search</span>
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