"use client";
import HeaderSlider from "@/components/HeaderSlider";

export default function Home() {
  return (
    <div className="relative">
      <div className="mx-auto max-w-7xl px-4 md:px-8 space-y-16 py-10 md:py-14">
        <section className="pt-2">
          <HeaderSlider />
        </section>
      </div>
    </div>
  );
}
