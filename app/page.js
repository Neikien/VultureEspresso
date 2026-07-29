"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=1920&auto=format&fit=crop",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Danh sách 5 món ăn / thức uống cho phần "Discover our recipes"
  const recipes = [
    {
      id: 1,
      name: "Signature Vulture Espresso",
      category: "Hot Drinks",
      image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=800&auto=format&fit=crop",
      desc: "Rich, bold double shot with notes of dark chocolate and toasted caramel.",
    },
    {
      id: 2,
      name: "Avocado Smash on Sourdough",
      category: "Brunch",
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=800&auto=format&fit=crop",
      desc: "Fresh smashed avocado, heirloom tomatoes, crumbled feta, and poached eggs.",
    },
    {
      id: 3,
      name: "Classic Eggs Benedict",
      category: "All Day",
      image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?q=80&w=800&auto=format&fit=crop",
      desc: "Poached free-range eggs, savory bacon, and house-made hollandaise sauce.",
    },
    {
      id: 4,
      name: "Iced Caramel Macchiato",
      category: "Cold Drinks",
      image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=800&auto=format&fit=crop",
      desc: "Fresh espresso poured over cold milk, ice, and sweet caramel drizzle.",
    },
    {
      id: 5,
      name: "Artisanal Brunch Bowl",
      category: "Lunch",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop",
      desc: "Wholesome grains, fresh greens, roasted veggies, and house dressing.",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* 1. HERO SECTION */}
      <div className="relative h-[85vh] w-full overflow-hidden bg-gray-900">
        <Image
          src={slides[currentSlide]}
          alt="Hero Background"
          fill
          priority
          className="object-cover transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-5 z-10 mt-[-40px]">
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-none mb-6">
             <br /> Vulture St. Espresso
          </h1>
          <p className="text-base md:text-xl font-light tracking-[3px] max-w-xl opacity-90 uppercase">
            Fresh & Pure
          </p>
        </div>
      </div>

      {/* 2. INTRO TEXT */}
      <section className="pt-20 pb-12 px-5">
        <div className="max-w-[90%] mx-auto text-left">
          <h1 className="font-serif text-4xl lg:text-5xl text-primary mb-6 leading-tight">
            Opening Doors to a <br /> Green Life
          </h1>
          <p className="text-lg text-secondary max-w-4xl mb-10 leading-relaxed font-light">
            We are proud to be a cafe located in the heart of West End that has a secret garden. All-day breakfast and lunch is a full mixture of healthy, classics and creative recipes (GF, DF, Vegetarian, Vegan options included). Coffee by Supreme Coffee Roaster, a Queensland-based business.
          </p>
          <h2 className="font-serif text-2xl text-primary border-b border-gray-200 pb-3 inline-block">
            Discover our recipes
          </h2>
        </div>
      </section>

      {/* 3. 5 RECIPES GRID SECTION */}
      <section className="pb-16 px-5">
        <div className="max-w-[90%] mx-auto">
          {/* Lưới hiển thị 5 ảnh món ăn */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {recipes.map((recipe) => (
              <div 
                key={recipe.id}
                className="group bg-gray-50 overflow-hidden rounded-sm shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={recipe.image}
                    alt={recipe.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-accent tracking-[2px] uppercase block mb-1">
                      {recipe.category}
                    </span>
                    <h3 className="font-serif text-lg text-primary mb-2 leading-snug">
                      {recipe.name}
                    </h3>
                    <p className="text-secondary text-xs font-light leading-relaxed mb-4">
                      {recipe.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Nút Discover More chuyển sang trang Menu */}
          <div className="mt-12 text-center">
            <Link
              href="/menu"
              className="inline-block bg-primary text-white px-8 py-4 text-xs font-bold tracking-[2px] uppercase hover:bg-accent transition-colors"
            >
              Discover More (View Full Menu)
            </Link>
          </div>
        </div>
      </section>

      {/* 4. BOTTOM SECTION */}
      <section className="py-8 bg-white">
        <div className="max-w-[96%] mx-auto relative lg:h-[700px] flex flex-col lg:block">
          <Image
            src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1920&auto=format&fit=crop"
            alt="Ambassador"
            fill
            className="object-cover relative lg:absolute inset-0 h-[500px] lg:h-full w-full"
          />
          <div className="relative lg:absolute top-0 lg:top-1/2 right-0 lg:right-[8%] lg:transform lg:-translate-y-1/2 bg-white p-10 lg:p-16 max-w-xl shadow-none lg:shadow-xl mt-[-50px] lg:mt-0 mx-5 lg:mx-0 border border-gray-100 lg:border-none">
            <h2 className="font-serif text-3xl lg:text-4xl text-primary mb-6 leading-tight">
              Vulture St. Espresso <br /> 
            </h2>
            <p className="text-base text-secondary font-light leading-loose mb-8">
              "Join us in our hidden garden to enjoy wholesome meals, expertly brewed coffee from Supreme Coffee Roaster, and peaceful moments in the heart of the city."
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}