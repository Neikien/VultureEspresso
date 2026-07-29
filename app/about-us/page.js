"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// DỮ LIỆU NỘI DUNG TỪNG TAB
const tabContent = {
  recognition: {
    title: "Elevated Recognition",
    desc: "We believe your visits should be rewarded instantly. Enjoy priority seating, a dedicated support line, and exclusive access to our member-only private tasting events.",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop",
    benefits: ["Priority Seating", "Dedicated Support", "Welcome Treat"],
  },
  enhancements: {
    title: "Cafe Enhancements",
    desc: "Make every visit more comfortable with customized coffee blends, premium service, and personalized table setups tailored to your preferences.",
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop",
    benefits: ["Custom Brews", "Preferred Seating Area", "Special Requests"],
  },
  dining: {
    title: "Dining Provisions",
    desc: "Savor the moment with exclusive discounts across our all-day breakfast and lunch menus. Members enjoy special treats on every culinary journey.",
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1200&auto=format&fit=crop",
    benefits: [
      "Menu Discounts",
      "Priority Reservations",
      "Complimentary Side/Drink",
    ],
  },
  time: {
    title: "Luxury of Time",
    desc: "Relax without the rush. Take advantage of extended reservation holds and flexible timing to maximize your peaceful moments in our garden.",
    image:
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1200&auto=format&fit=crop",
    benefits: ["Extended Table Hold", "Flexible Booking", "Quiet Corner Access"],
  },
};

export default function AboutUsPage() {
  const [activeTab, setActiveTab] = useState("recognition");

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* 1. HERO BANNER */}
      <div className="relative h-[60vh] w-full overflow-hidden bg-gray-900">
        <Image
          src="https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=1920&auto=format&fit=crop"
          alt="About Us"
          fill
          priority
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-5">
          <p className="text-sm font-bold tracking-[4px] uppercase mb-6 animate-fade-in-up">
            Vulture St. Espresso
          </p>
          <h1 className="font-serif text-5xl md:text-7xl mb-8 animate-fade-in-up delay-100">
            About Our Story & Values
          </h1>
        </div>
      </div>

      {/* 2. INTRO TEXT */}
      <section className="pt-24 pb-12 px-5 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl lg:text-5xl text-primary mb-8 leading-tight">
            Exceptional experiences, <br /> exclusive benefits
          </h2>
          <p className="text-lg text-secondary font-light leading-loose max-w-3xl mx-auto">
            Placing you at the heart of every gathering. From quiet morning coffees
            to joyful weekend brunches, we curate your special moments and
            transform them into something incredible within our secret garden.
          </p>
        </div>
      </section>

      {/* 3. INTERACTIVE TABS */}
      <section className="py-12 px-5">
        <div className="max-w-[90%] mx-auto">
          {/* Thanh Tab Ngang */}
          <div className="flex flex-wrap justify-center gap-10 border-b border-gray-200 pb-4 mb-16">
            {Object.keys(tabContent).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`pb-4 text-sm font-bold uppercase tracking-[2px] transition-all ${
                  activeTab === key
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-400 hover:text-primary"
                }`}
              >
                {tabContent[key].title}
              </button>
            ))}
          </div>

          {/* Nội dung Tab */}
          <div className="flex flex-col lg:flex-row items-center gap-20 animate-fade-in-up">
            {/* Cột Chữ */}
            <div className="lg:w-1/2 text-left">
              <h3 className="font-serif text-4xl text-primary mb-6">
                {tabContent[activeTab].title}
              </h3>
              <p className="text-lg text-secondary font-light leading-loose mb-10">
                {tabContent[activeTab].desc}
              </p>
              <ul className="space-y-4 mb-10">
                {tabContent[activeTab].benefits.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm font-medium tracking-wider text-primary uppercase"
                  >
                    <span className="h-[1px] w-8 bg-accent"></span> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cột Ảnh */}
            <div className="lg:w-1/2 h-[500px] relative w-full shadow-sm">
              <Image
                src={tabContent[activeTab].image}
                alt={tabContent[activeTab].title}
                fill
                className="object-cover transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}