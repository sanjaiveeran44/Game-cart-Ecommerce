"use client";

import { FiSmartphone, FiTablet, FiHeadphones, FiWatch, FiSearch, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const carouselItems = [
  {
    id: 1,
    title: "Latest Smartphones",
    description: "Discover the newest smartphone technology",
    bgColor: "from-blue-500 to-cyan-400"
  },
  {
    id: 2,
    title: "Premium Headphones",
    description: "Experience crystal clear sound quality",
    bgColor: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    title: "Smart Watches",
    description: "Stay connected with the latest wearables",
    bgColor: "from-green-500 to-teal-400"
  }
];

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} hidden sm:block`}
      style={{ ...style, right: "10px", zIndex: 1 }}
      onClick={onClick}
    >
      <FiArrowRight className="text-white text-2xl" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} hidden sm:block`}
      style={{ ...style, left: "10px", zIndex: 1 }}
      onClick={onClick}
    >
      <FiArrowLeft className="text-white text-2xl" />
    </div>
  );
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  appendDots: dots => (
    <div className="absolute bottom-4 left-0 right-0">
      <ul className="flex justify-center space-x-2">{dots}</ul>
    </div>
  ),
  customPaging: i => (
    <div className="w-2 h-2 bg-white bg-opacity-50 rounded-full transition-all duration-300 hover:bg-opacity-100" />
  )
};

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
     
      <section className="relative overflow-hidden">
        <Slider {...settings}>
          {carouselItems.map((item) => (
            <div key={item.id} className={`h-96 flex items-center justify-center bg-gradient-to-r ${item.bgColor} text-white`}>
              <div className="text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{item.title}</h1>
                <p className="text-xl mb-8 max-w-2xl mx-auto">{item.description}</p>
                <div className="relative max-w-2xl mx-auto group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-white/30 to-white/10 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                  <div className="relative flex bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                    <input
                      type="text"
                      placeholder="Search for gadgets..."
                      className="flex-1 bg-transparent text-white placeholder-white/70 px-6 py-5 focus:outline-none focus:ring-0 border-0 text-lg"
                    />
                    <button 
                      className="bg-white/90 hover:bg-white text-gray-900 font-semibold px-8 py-4 flex items-center space-x-2 transition-all duration-300 hover:scale-105 transform"
                      onClick={() => toast.success('Search functionality coming soon!')}
                    >
                      <FiSearch className="h-5 w-5" />
                      <span className="hidden sm:inline">Search</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
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
                className="group relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 cursor-pointer"
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