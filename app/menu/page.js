"use client";

import { useState } from "react";
import Image from "next/image";

const categories = [
  "All",
  "All Day",
  "Brunch",
  "Lunch",
  "Hot Drinks",
  "Cold Drinks",
  "Juices & Smoothies",
  "Beer / Wine / Cocktails",
];

const menuItems = [
  {
    id: 1,
    name: "Classic Eggs Benedict",
    category: "All Day",
    price: "$18.50",
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?q=80&w=800&auto=format&fit=crop",
    desc: "Poached free-range eggs, crisp bacon, served on toasted sourdough with house-made hollandaise sauce.",
  },
  {
    id: 2,
    name: "Avocado Smash on Sourdough",
    category: "Brunch",
    price: "$16.00",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=800&auto=format&fit=crop",
    desc: "Fresh smashed avocado, heirloom cherry tomatoes, crumbled feta, and seeds on sourdough.",
  },
  {
    id: 3,
    name: "Artisanal Gourmet Salad Bowl",
    category: "Lunch",
    price: "$17.50",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop",
    desc: "Wholesome grains, roasted sweet potato, kale, avocado, chickpeas, and a lemon-tahini dressing.",
  },
  {
    id: 4,
    name: "Signature Espresso",
    category: "Hot Drinks",
    price: "$4.50",
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=800&auto=format&fit=crop",
    desc: "A rich, bold double shot with notes of dark chocolate and caramel, brewed with Supreme Coffee beans.",
  },
  {
    id: 5,
    name: "Flat White / Latte",
    category: "Hot Drinks",
    price: "$5.00",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=800&auto=format&fit=crop",
    desc: "Silky steamed milk poured over a rich espresso base.",
  },
  {
    id: 6,
    name: "Iced Caramel Macchiato",
    category: "Cold Drinks",
    price: "$6.50",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=800&auto=format&fit=crop",
    desc: "Cold milk and ice topped with espresso and a sweet caramel drizzle.",
  },
  {
    id: 7,
    name: "Green Vitality Smoothie",
    category: "Juices & Smoothies",
    price: "$8.50",
    image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?q=80&w=800&auto=format&fit=crop",
    desc: "Spinach, green apple, cucumber, mint, coconut water, and a touch of ginger.",
  },
  {
    id: 8,
    name: "Craft Espresso Martini",
    category: "Beer / Wine / Cocktails",
    price: "$15.00",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop",
    desc: "Fresh espresso, vodka, and coffee liqueur shaken with ice for a velvety finish.",
  },
];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* 1. HERO BANNER */}
      <div className="relative h-[60vh] w-full overflow-hidden bg-gray-900">
        <Image
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1920&auto=format&fit=crop"
          alt="Menu"
          fill
          priority
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-5">
          <p className="text-sm font-bold tracking-[4px] uppercase mb-6 animate-fade-in-up">
            Discover The New Flavors
          </p>
          <h1 className="font-serif text-6xl md:text-8xl mb-6 animate-fade-in-up delay-100">
            Our Menu
          </h1>
        </div>
      </div>

      {/* 2. MAIN CONTENT */}
      <div className="max-w-[90%] mx-auto py-20 px-5">
        {/* Intro & Filter */}
        <div className="mb-20">
          <h2 className="font-serif text-4xl lg:text-5xl text-primary mb-10 leading-tight">
            Take a look at our menu and choose your favorite items.
          </h2>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-8 border-b border-gray-100 pb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`pb-3 text-sm font-medium uppercase tracking-[2px] transition-all ${
                  selectedCategory === category
                    ? "text-primary border-b-2 border-accent"
                    : "text-gray-400 hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 3. GRID MENU ITEMS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-16 gap-y-16">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col md:flex-row gap-6 bg-gray-50 p-6 rounded-sm shadow-sm hover:shadow-md transition-all"
              >
                {/* Ảnh món */}
                <div className="relative h-60 md:h-48 md:w-48 w-full flex-shrink-0 overflow-hidden bg-gray-200">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-primary">
                    {item.category}
                  </div>
                </div>

                {/* Thông tin món */}
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex justify-between items-baseline mb-3">
                      <h3 className="font-serif text-2xl text-primary group-hover:text-accent transition-colors">
                        {item.name}
                      </h3>
                      <span className="font-serif text-xl text-accent font-semibold ml-4">
                        {item.price}
                      </span>
                    </div>

                    <p className="text-secondary text-sm font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-400 font-serif text-xl">
              No items found in {selectedCategory}.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}