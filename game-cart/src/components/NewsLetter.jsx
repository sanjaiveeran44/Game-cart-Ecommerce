import React from "react";

const NewsLetter = () => {
  return (
    <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/20 bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-900 px-6 py-14 text-center shadow-[0_30px_80px_-48px_rgba(2,6,23,0.6)] md:px-10 md:py-16">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl" />
      </div>

      <h2 className="relative text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight">
        Subscribe now & get 20% off
      </h2>
      <p className="relative text-base md:text-lg text-indigo-100 max-w-2xl mx-auto mb-10 opacity-95 leading-relaxed">
        Stay updated with our latest products and exclusive offers. Join our newsletter today!
      </p>
      <div className="relative mx-auto flex flex-col sm:flex-row items-center justify-center max-w-xl w-full gap-3">
        <input
          className="w-full sm:flex-1 h-14 px-6 rounded-full border border-white/25 bg-white/95 text-slate-900 placeholder-slate-500 shadow-sm focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-200"
          type="email"
          placeholder="Enter your email address"
        />
        <button className="w-full sm:w-auto h-14 px-10 rounded-full font-semibold text-slate-900 bg-white shadow-sm hover:bg-slate-100 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-white/30">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;
