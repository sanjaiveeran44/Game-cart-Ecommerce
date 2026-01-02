"use client";

import React from "react";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

const FeaturedProduct = () => {
  const { products, currency, router } = useAppContext();
  const featured = products?.[0];

  if (!featured) return null;

  const imageSrc = Array.isArray(featured.image) ? featured.image[0] : featured.image;

  return (
    <section className="w-full">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 shadow-[0_18px_50px_-35px_rgba(2,6,23,0.35)]">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-200/50 blur-3xl" />
          <div className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-sky-200/50 blur-3xl" />
        </div>

        <div className="relative grid grid-cols-1 items-center gap-10 p-6 md:grid-cols-12 md:p-10">
          <div className="md:col-span-7">
            <p className="text-xs font-semibold tracking-widest text-indigo-700">FEATURED PICK</p>
            <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              {featured.name}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
              {featured.description}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                onClick={() => router.push(`/product/${featured._id}`)}
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400/60"
              >
                View Product
              </button>
              <div className="text-sm text-slate-600">
                <span className="font-semibold text-slate-900">
                  {currency}{featured.offerPrice}
                </span>
                {featured.price > featured.offerPrice ? (
                  <span className="ml-2 text-slate-500 line-through">
                    {currency}{featured.price}
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="mx-auto w-full max-w-[460px] rounded-3xl border border-slate-200/60 bg-white p-6 shadow-[0_24px_70px_-55px_rgba(2,6,23,0.45)]">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={imageSrc}
                  alt={featured.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 460px"
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

export default FeaturedProduct;
