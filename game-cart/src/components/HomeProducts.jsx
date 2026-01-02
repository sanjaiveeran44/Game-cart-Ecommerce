import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";

const HomeProducts = () => {

  const { products, router } = useAppContext();
  
  return (
    <section className="relative z-10 left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen py-10 md:py-14">
      <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold tracking-widest text-indigo-700">POPULAR RIGHT NOW</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">Popular Products</h2>
            <p className="mt-2 max-w-2xl text-sm md:text-base text-slate-600">
              Curated best-sellers with fast delivery and premium quality.
            </p>
          </div>

          <button onClick={() => { router.push('/all-products') }} className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400/60">
            See more
          </button>
        </div>

        <div className="mt-8 grid w-full grid-cols-2 gap-5 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 2xl:grid-cols-5">
          {products && products.length > 0 ? (
            products.map((product, index) => (
              <ProductCard key={product._id || index} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-slate-600">No products available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeProducts;
