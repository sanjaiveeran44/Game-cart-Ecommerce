import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      offer: "Limited Time Offer 30% Off",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: assets.header_headphone_image,
    },
    {
      id: 2,
      title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
      offer: "Hurry up only few lefts!",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc: assets.header_playstation_image,
    },
    {
      id: 3,
      title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      offer: "Exclusive Deal 40% Off",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: assets.header_macbook_image,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 4000); // Increased interval for smoother viewing
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-[42vh] md:h-[52vh] lg:h-[56vh] rounded-[28px] overflow-hidden border border-white/60 bg-white/40 shadow-[0_24px_60px_-32px_rgba(2,6,23,0.35)] transition-all duration-500 ease-in-out">
      <div
        className="flex h-full w-full transform-gpu will-change-transform transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="relative h-full w-full min-w-full flex-none bg-slate-100"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-900"></div>
            <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl"></div>
            <div className="absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl"></div>

            <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-4 py-8 md:px-8">
              <div className="grid w-full grid-cols-1 items-center gap-8 md:grid-cols-12">
                <div className="md:col-span-7">
                  <div className="w-full max-w-3xl rounded-[24px] border border-white/15 bg-white/10 p-5 text-white shadow-[0_20px_60px_-40px_rgba(0,0,0,0.6)] backdrop-blur-xl md:p-8">
                    <div className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-white/90">
                      {slide.offer}
                    </div>

                    <h1 className="text-2xl font-extrabold leading-tight tracking-tight md:text-4xl lg:text-5xl">
                      {slide.title}
                    </h1>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                      <button className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-100 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-white/30">
                        {slide.buttonText1}
                      </button>
                      <button className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/15 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-white/20">
                        {slide.buttonText2}
                        <Image
                          className="h-4 w-4 opacity-90 group-hover:translate-x-0.5 transition-transform duration-200"
                          src={assets.arrow_icon_white}
                          alt="arrow_icon_white"
                          width={16}
                          height={16}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5">
                  <div className="mx-auto w-full max-w-[440px] rounded-[28px] border border-white/15 bg-white/10 p-6 shadow-[0_24px_70px_-50px_rgba(0,0,0,0.75)] backdrop-blur-xl">
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        className="h-full w-full object-contain"
                        src={slide.imgSrc}
                        alt={`Slide ${index + 1}`}
                        width={800}
                        height={600}
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-2">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2.5 w-2.5 rounded-full cursor-pointer transition-all duration-300 ${
              currentSlide === index ? "bg-white scale-150 shadow" : "bg-white/40 hover:bg-white/70"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
