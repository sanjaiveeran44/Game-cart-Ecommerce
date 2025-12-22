"use client";

import * as FiIcons from 'react-icons/fi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const { FiSearch, FiShoppingCart } = FiIcons;

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center cursor-pointer" onClick={() => router.push('/')}>
              <Image
                src="/gamecart-logo.svg"
                alt="GameCart Logo"
                width={144}
                height={40}
                className="w-28 md:w-36 h-auto"
                priority
              />
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-gray-700 hover:text-indigo-600 px-4 py-2 text-sm font-medium relative after:content-[''] after:absolute after:bottom-1.5 after:left-1/2 after:w-0 after:h-0.5 after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-2/4 hover:after:left-1/4">Home</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 px-4 py-2 text-sm font-medium relative after:content-[''] after:absolute after:bottom-1.5 after:left-1/2 after:w-0 after:h-0.5 after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-2/4 hover:after:left-1/4">Shop</a>
            <a href="/orders" className="text-gray-700 hover:text-indigo-600 px-4 py-2 text-sm font-medium relative after:content-[''] after:absolute after:bottom-1.5 after:left-1/2 after:w-0 after:h-0.5 after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-2/4 hover:after:left-1/4">Orders</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 px-4 py-2 text-sm font-medium relative after:content-[''] after:absolute after:bottom-1.5 after:left-1/2 after:w-0 after:h-0.5 after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-2/4 hover:after:left-1/4">About</a>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors duration-200">
              <FiSearch className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full relative transition-colors duration-200">
              <FiShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center hover:bg-indigo-700 transition-colors duration-200">3</span>
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
  );
}