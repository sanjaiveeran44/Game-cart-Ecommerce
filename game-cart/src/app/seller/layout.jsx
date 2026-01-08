'use client'
import Navbar from '@/components/seller/Navbar'
import Sidebar from '@/components/seller/Sidebar'
import Footer from '@/components/seller/Footer'
import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className="relative flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-slate-900">
      {/* Enhanced Background Effects */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/3 h-[420px] w-[420px] rounded-full bg-gradient-to-r from-indigo-200/30 to-purple-200/30 blur-3xl animate-pulse" />
        <div className="absolute top-[45vh] -right-44 h-[520px] w-[520px] rounded-full bg-gradient-to-r from-violet-200/30 to-pink-200/30 blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute bottom-0 left-1/4 h-[320px] w-[320px] rounded-full bg-gradient-to-r from-blue-200/20 to-cyan-200/20 blur-3xl animate-pulse animation-delay-4000" />
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex min-w-0 flex-col">
        <Navbar />
        <main className="flex-1 px-4 py-6 md:px-8 lg:px-10">
          <div className="mx-auto w-full max-w-7xl">
            {/* Page Header with Breadcrumb */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1>
                <p className="text-gray-600 mt-1">Manage your products and orders</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Home</span>
                <span>/</span>
                <span className="text-gray-700">Seller</span>
              </div>
            </div>
            
            {/* Content Wrapper with Enhanced Styling */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 p-6">
              {children}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout