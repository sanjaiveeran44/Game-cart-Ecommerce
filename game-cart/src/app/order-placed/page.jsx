'use client'
import { assets, productsDummyData } from '@/assets/assets'
import { useAppContext } from '@/context/AppContext'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const OrderPlaced = () => {

  const { router } = useAppContext()
  const [suggestedProducts, setSuggestedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // Calculate expected delivery date (3-5 days from now)
  const getExpectedDelivery = () => {
    const today = new Date()
    const minDelivery = new Date(today)
    const maxDelivery = new Date(today)
    
    minDelivery.setDate(today.getDate() + 3)
    maxDelivery.setDate(today.getDate() + 5)
    
    return {
      min: minDelivery.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
      max: maxDelivery.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    }
  }

  const deliveryDates = getExpectedDelivery()

  useEffect(() => {
    // Get random suggested products
    const shuffled = [...productsDummyData].sort(() => 0.5 - Math.random())
    const suggested = shuffled.slice(0, 4)
    setSuggestedProducts(suggested)
    setLoading(false)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      router.push('/my-orders')
    }, 10000) // Extended to 10 seconds
  }, [])

  return (
    <>
      <Navbar />
      <div className='min-h-screen bg-slate-50 py-12 px-4'>
        <div className="max-w-6xl mx-auto">
          {/* Order Success Section */}
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg border border-gray-200 text-center mb-12">
            <div className="relative flex justify-center items-center mb-8">
              <Image className="absolute p-4 w-16 h-16" src={assets.checkmark} alt='Order Confirmed' />
              <div className="animate-spin rounded-full h-32 w-32 border-4 border-t-indigo-500 border-gray-200"></div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h1>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Thank you for your purchase. Your order details are being processed and will be shipped soon.
            </p>
            
            {/* Order Details */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">📦</span>
                    <span className="font-semibold text-gray-700">Order ID</span>
                  </div>
                  <p className="text-gray-900 font-mono">#ORD{Date.now()}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🚚</span>
                    <span className="font-semibold text-gray-700">Expected Delivery</span>
                  </div>
                  <p className="text-gray-900">{deliveryDates.min} - {deliveryDates.max}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">💳</span>
                    <span className="font-semibold text-gray-700">Payment</span>
                  </div>
                  <p className="text-gray-900">Cash on Delivery</p>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/my-orders')}
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 shadow-md"
              >
                View My Orders
              </button>
              <button
                onClick={() => router.push('/')}
                className="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-300"
              >
                Continue Shopping
              </button>
            </div>
          </div>

          {/* Suggested Products Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">You Might Also Like</h2>
              <p className="text-gray-600">Discover more products that complement your purchase</p>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 border-t-transparent border-r-transparent"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {suggestedProducts.map((product, index) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default OrderPlaced