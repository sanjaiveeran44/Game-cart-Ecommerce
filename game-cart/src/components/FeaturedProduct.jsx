import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const products = [
  {
    id: 1,
    image: assets.girl_with_headphone_image,
    title: "Unparalleled Sound",
    description: "Experience crystal-clear audio with premium headphones.",
  },
  {
    id: 2,
    image: assets.girl_with_earphone_image,
    title: "Stay Connected",
    description: "Compact and stylish earphones for every occasion.",
  },
  {
    id: 3,
    image: assets.boy_with_laptop_image,
    title: "Power in Every Pixel",
    description: "Shop the latest laptops for work, gaming, and more.",
  },
];

const FeaturedProduct = () => {
  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen py-10 md:py-14">
      <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold tracking-widest text-indigo-700">EDITOR'S CHOICE</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">Featured Products</h2>
            <p className="mt-2 max-w-2xl text-sm md:text-base text-slate-600">
              Explore our hand-picked selection of top-rated products designed to enhance your lifestyle.
            </p>
          </div>
        </div>

        <div className="mt-8 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map(({ id, image, title, description }) => (
            <div key={id} className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_18px_40px_-28px_rgba(2,6,23,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:ring-2 hover:ring-indigo-300/25 hover:shadow-[0_28px_70px_-40px_rgba(2,6,23,0.45)] focus-within:border-indigo-300 cursor-pointer">
              <div className="relative h-[32rem] w-full overflow-hidden">
                <Image
                  src={image}
                  alt={title}
                  className="h-full w-full object-cover"
                  width={600}
                  height={520}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/65 via-slate-950/25 to-transparent"></div>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-5 text-white shadow-[0_20px_60px_-40px_rgba(0,0,0,0.55)] backdrop-blur-xl">
                  <p className="text-xl font-bold tracking-tight md:text-2xl">{title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">
                    {description}
                  </p>
                  <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-100 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-white/30">
                    Buy now <Image className="h-4 w-4" src={assets.arrow_icon_white} alt="Redirect Icon" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
