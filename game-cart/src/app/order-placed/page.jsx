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
  const [hideBubbles, setHideBubbles] = useState(false)

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
  
    const shuffled = [...productsDummyData].sort(() => 0.5 - Math.random())
    const suggested = shuffled.slice(0, 4)
    setSuggestedProducts(suggested)
    setLoading(false)
    
    setTimeout(() => {
      setHideBubbles(true)
    }, 3000)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      router.push('/my-orders')
    }, 10000) 
  }, [])

  return (
    <>
      <style jsx>{`
        @keyframes bounce-in {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes scale-in {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes slide-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes float-up {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 1; }
        }
        
        @keyframes checkmark {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out 0.3s both;
        }
        
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
        
        .animate-slide-up-delay-1 {
          animation: slide-up 0.5s ease-out 0.2s both;
        }
        
        .animate-float-up {
          animation: float-up 2s ease-out forwards;
        }
        
        .animate-float-up-delay-1 {
          animation: float-up 2s ease-out 0.2s forwards;
        }
        
        .animate-float-up-delay-2 {
          animation: float-up 2s ease-out 0.4s forwards;
        }
        
        .animate-float-up-delay-3 {
          animation: float-up 2s ease-out 0.6s forwards;
        }
        
        .animate-float-up-delay-4 {
          animation: float-up 2s ease-out 0.8s forwards;
        }
        
        .animate-float-up-delay-5 {
          animation: float-up 2s ease-out 1s forwards;
        }
        
        .animate-checkmark {
          stroke-dasharray: 100;
          animation: checkmark 0.5s ease-out 0.6s both;
        }
        
        .confetti-piece-1 {
          position: absolute;
          width: 8px;
          height: 8px;
          background: linear-gradient(45deg, #10b981, #3b82f6);
          border-radius: 50%;
          top: 20%;
          left: 10%;
        }
        
        .confetti-piece-2 {
          position: absolute;
          width: 6px;
          height: 6px;
          background: linear-gradient(45deg, #f59e0b, #ef4444);
          border-radius: 50%;
          top: 30%;
          left: 80%;
        }
        
        .confetti-piece-3 {
          position: absolute;
          width: 10px;
          height: 10px;
          background: linear-gradient(45deg, #8b5cf6, #6366f1);
          border-radius: 50%;
          top: 60%;
          left: 20%;
        }
        
        .confetti-piece-4 {
          position: absolute;
          width: 7px;
          height: 7px;
          background: linear-gradient(45deg, #ec4899, #db2777);
          border-radius: 50%;
          top: 40%;
          left: 70%;
        }
        
        .confetti-piece-5 {
          position: absolute;
          width: 9px;
          height: 9px;
          background: linear-gradient(45deg, #14b8a6, #059669);
          border-radius: 50%;
          top: 70%;
          left: 50%;
        }
        
        .confetti-piece-6 {
          position: absolute;
          width: 5px;
          height: 5px;
          background: linear-gradient(45deg, #fbbf24, #f59e0b);
          border-radius: 50%;
          top: 25%;
          left: 85%;
        }
      `}</style>
      
      <Navbar />
      <div className='min-h-screen bg-slate-50 py-12 px-4'>
        <div className="max-w-6xl mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg border border-gray-200 text-center mb-12 relative overflow-hidden">
            {/* Background Animation */}
            <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${hideBubbles ? 'opacity-0' : 'opacity-100'}`}>
              <div className="absolute top-0 left-1/4 w-32 h-32 bg-green-400 rounded-full opacity-20 animate-ping"></div>
              <div className="absolute top-0 right-1/4 w-24 h-24 bg-blue-400 rounded-full opacity-20 animate-ping animation-delay-200"></div>
              <div className="absolute bottom-0 left-1/3 w-28 h-28 bg-purple-400 rounded-full opacity-20 animate-ping animation-delay-400"></div>
              <div className="absolute bottom-0 right-1/3 w-20 h-20 bg-indigo-400 rounded-full opacity-20 animate-ping animation-delay-600"></div>
            </div>
            
            {/* Main Success Animation */}
            <div className="relative flex justify-center items-center mb-8">
              <div className="relative">
                {/* Checkmark Circle */}
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center shadow-2xl animate-bounce-in">
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center animate-scale-in">
                      <svg className="w-8 h-8 text-white animate-checkmark" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Confetti Animation */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="confetti-piece-1 animate-float-up"></div>
                  <div className="confetti-piece-2 animate-float-up-delay-1"></div>
                  <div className="confetti-piece-3 animate-float-up-delay-2"></div>
                  <div className="confetti-piece-4 animate-float-up-delay-3"></div>
                  <div className="confetti-piece-5 animate-float-up-delay-4"></div>
                  <div className="confetti-piece-6 animate-float-up-delay-5"></div>
                </div>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 animate-slide-up">Order Placed Successfully!</h1>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto animate-slide-up-delay-1">
              Thank you for your purchase. Your order details are being processed and will be shipped soon.
            </p>
            
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