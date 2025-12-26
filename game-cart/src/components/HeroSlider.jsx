'use client';

import { FiSearch, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { toast } from 'react-hot-toast';

const carouselItems = [
  {
    id: 1,
    title: "Latest Smartphones",
    description: "Discover the newest smartphone technology",
    bgColor: "from-blue-800 to-blue-600"
  },
  {
    id: 2,
    title: "Premium Headphones",
    description: "Experience crystal clear sound quality",
    bgColor: "from-blue-900 to-blue-700"
  },
  {
    id: 3,
    title: "Smart Watches",
    description: "Stay connected with the latest wearables",
    bgColor: "from-blue-700 to-blue-500"
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

export default function HeroSlider() {
  return (
    <section className="relative overflow-hidden max-w-4xl mx-auto px-2">
      <Slider {...settings}>
        {carouselItems.map((item) => (
          <div key={item.id} className={`h-96 flex items-center justify-center bg-gradient-to-r ${item.bgColor} text-white`}>
            <div className="text-center w-full max-w-2xl mx-auto px-2">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{item.title}</h1>
              <p className="text-lg mb-6 max-w-xl mx-auto">{item.description}</p>
              <div className="relative max-w-lg mx-auto group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-white/30 to-white/10 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <div className="relative flex bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 shadow-xl">
                  <input
                    type="text"
                    placeholder="Search gadgets..."
                    className="flex-1 bg-transparent text-white placeholder-white/70 px-4 py-3 focus:outline-none focus:ring-0 border-0 text-base"
                  />
                  <button 
                    className="bg-white/90 hover:bg-white text-gray-900 font-semibold px-4 sm:px-6 py-3 flex items-center space-x-2 transition-all duration-300 hover:scale-105 transform text-sm sm:text-base"
                    onClick={() => toast.success('Search functionality coming soon!')}
                  >
                    <FiSearch className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="hidden sm:inline">Search</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
