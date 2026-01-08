import React from 'react'
import { assets } from '../../assets/assets'
import Image from 'next/image'
import { useAppContext } from '@/context/AppContext'

const Navbar = () => {

  const { router } = useAppContext()

  const handleLogout = () => {
    // Add logout logic here
    router.push('/')
  }

  return (
    <div className='flex items-center px-6 md:px-10 py-4 justify-between bg-white/95 backdrop-blur-sm shadow-md border-b border-gray-200/50'>
      <div className="flex items-center gap-3">
        <Image 
          onClick={() => router.push('/')} 
          className='w-32 md:w-36 cursor-pointer hover:opacity-80 transition-opacity duration-200' 
          src={assets.logo} 
          alt="QuickCart Logo" 
        />
        <div className="hidden md:block">
          <span className="text-sm text-gray-500">Seller Dashboard</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5-5v5zM4 19h8l-8-8v8z" />
          </svg>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        {/* User Profile */}
        <div className="hidden md:flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
            S
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-800">Seller</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
        
        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-md transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-2'
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar