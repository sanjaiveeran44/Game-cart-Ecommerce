import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/60 bg-white/50 shadow-[0_24px_60px_-32px_rgba(2,6,23,0.35)]">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-900" />
        <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl" />
      </div>

      <div className="absolute inset-0 z-0 opacity-[0.08]">
        <Image
          className="w-full h-full object-cover object-right"
          src={assets.md_controller_image}
          alt="background_controller"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="relative z-10 grid grid-cols-1 items-center gap-10 px-6 py-10 md:px-10 md:py-14 lg:grid-cols-2">
        <Image
          className="mx-auto max-w-xs object-contain drop-shadow-[0_26px_60px_rgba(0,0,0,0.35)] md:max-w-sm lg:max-w-md"
          src={assets.jbl_soundbox_image}
          alt="jbl_soundbox_image"
          width={400}
          height={400}
        />

        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-white/90">
            LIMITED OFFER
          </div>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
            Level Up Your Gaming Experience
          </h2>

          <p className="mt-3 max-w-xl text-base font-medium leading-relaxed text-white/80 md:text-lg">
            From immersive sound to precise controls—everything you need to win
          </p>

          <button className="group mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-100 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-white/30">
            Buy now
            <Image className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" src={assets.arrow_right_icon_colored} alt="arrow_icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
