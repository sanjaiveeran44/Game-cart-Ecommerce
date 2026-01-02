"use client";

import React from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";

const Banner = () => {
  return (
    <section className="w-full">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-slate-900 text-white shadow-[0_18px_50px_-35px_rgba(2,6,23,0.55)]">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/25 blur-3xl" />
          <div className="absolute -right-32 -bottom-24 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
        </div>

        <div className="relative grid grid-cols-1 items-center gap-10 p-6 md:grid-cols-12 md:p-10">
          <div className="md:col-span-7">
            <p className="text-xs font-semibold tracking-widest text-white/70">LIMITED OFFER</p>
            <h3 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
              Upgrade your setup today.
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
              Premium picks, smooth delivery, and deals that won’t last long.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/40">
                Shop Now
              </button>
              <button className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-white/15 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/30">
                Explore Deals
              </button>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="mx-auto w-full max-w-[520px] rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={assets.girl_with_headphone_image}
                  alt="Banner"
                  fill
                  sizes="(max-width: 768px) 100vw, 520px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
