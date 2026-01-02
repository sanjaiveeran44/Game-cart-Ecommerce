"use client";

import React, { useState } from "react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="w-full">
      <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-[0_18px_50px_-35px_rgba(2,6,23,0.35)] md:p-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold tracking-widest text-indigo-700">STAY UPDATED</p>
            <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              Join the newsletter
            </h3>
            <p className="mt-2 max-w-2xl text-sm md:text-base text-slate-600">
              Get product drops, discounts, and curated picks straight to your inbox.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setEmail("");
            }}
            className="flex w-full max-w-xl flex-col gap-3 sm:flex-row"
          >
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="Enter your email"
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
            />
            <button
              type="submit"
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-xl bg-slate-900 px-6 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400/60"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
