"use client";
import HeaderSlider from "@/components/HeaderSlider";
import HomeProducts from "@/components/HomeProducts";

export default function Home() {
  return (
    <>
      <HeaderSlider />

      <div className="mx-auto max-w-7xl px-4 md:px-8 space-y-16 py-10 md:py-14">
       <section className="py-2">
          <HomeProducts />
        </section>
      </div>
    </>
  );
}
