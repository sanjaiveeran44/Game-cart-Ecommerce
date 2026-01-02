"use client";
import HeaderSlider from "@/components/HeaderSlider";
import HomeProducts from "@/components/HomeProducts";
import FeaturedProduct from "@/components/FeaturedProduct";
import Banner from "@/components/Banner";
import NewsLetter from "@/components/NewsLetter";

export default function Home() {
  return (
    <div className="relative">
      <div className="mx-auto max-w-7xl px-4 md:px-8 space-y-16 py-10 md:py-14">
        <section className="pt-2">
          <HeaderSlider />
        </section>

        <section className="py-2">
          <HomeProducts />
        </section>

        <section className="py-2">
          <FeaturedProduct />
        </section>

        <section className="py-2">
          <Banner />
        </section>
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8 pb-14 md:pb-20">
        <NewsLetter />
      </div>
    </div>
  );
}
