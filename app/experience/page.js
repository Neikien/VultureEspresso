"use client";

import Image from "next/image";
import Link from "next/link";

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-white pb-20">
      {/* 1. HERO BANNER */}
      <div className="relative h-[60vh] w-full overflow-hidden bg-gray-900">
        <Image
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1920&auto=format&fit=crop"
          alt="Experience Hero"
          fill
          priority
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-5">
          <p className="text-sm font-bold tracking-[4px] uppercase mb-6 animate-fade-in-up">
            Unforgettable Moments
          </p>
          <h1 className="font-serif text-6xl md:text-8xl mb-6 animate-fade-in-up delay-100">
            Curated Experiences
          </h1>
        </div>
      </div>

      {/* 2. TIMELESS LUXURY */}
      <section className="py-20 px-5">
        <div className="max-w-[90%] mx-auto flex flex-col lg:flex-row h-auto lg:h-[600px]">
          <div className="lg:w-1/2 bg-[#f9f9f9] flex flex-col justify-center p-10 lg:p-20 text-left order-2 lg:order-1">
            <h2 className="font-serif text-4xl lg:text-5xl text-primary mb-6 leading-tight">
              A Hidden Green Oasis in West End
            </h2>
            <p className="text-lg text-secondary font-light leading-loose mb-8">
              Since 1946, Vulture St. Espresso has been welcoming locals and travelers into our secret garden sanctuary, serving up warmth, community, and soul.
            </p>
            <div className="border-t border-gray-200 pt-6 mt-4">
              <h3 className="font-serif text-2xl text-primary mb-2">
                Artisanal Craft
              </h3>
              <p className="text-sm text-secondary font-light">
                Discover exceptional flavors crafted with care by our passionate team.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 relative h-[400px] lg:h-full order-1 lg:order-2">
            <Image
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1200&auto=format&fit=crop"
              alt="Cafe Atmosphere"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. INTENTIONAL FLEXIBILITY */}
      <section className="py-24 bg-gray-50 px-5">
        <div className="max-w-[90%] mx-auto">
          <div className="text-left mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl text-primary mb-6">
              Thoughtfully Curated
            </h2>
            <p className="text-lg text-secondary font-light">
              Tailoring your daily ritual, your way, to ensure you feel refreshed and inspired.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Item 1 - Timeshifter -> Đổi thành Specialty Coffee */}
            <div className="group">
              <div className="relative h-[350px] w-full overflow-hidden mb-8 bg-gray-200">
                <Image
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop"
                  alt="Specialty Coffee"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-serif text-3xl text-primary mb-4 group-hover:text-accent transition-colors">
                Supreme Coffee
              </h3>
              <p className="text-base text-secondary font-light leading-loose mb-6">
                Expertly brewed coffee by Supreme Coffee Roaster, a proud Queensland-based business.
              </p>
            </div>

            {/* Item 2 - Restorative Design -> Không gian vườn */}
            <div className="group">
              <div className="relative h-[350px] w-full overflow-hidden mb-8 bg-gray-200">
                <Image
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop"
                  alt="Secret Garden"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-serif text-3xl text-primary mb-4 group-hover:text-accent transition-colors">
                The Secret Garden
              </h3>
              <p className="text-base text-secondary font-light leading-loose mb-6">
                Peaceful, green spaces designed to help you unwind, breathe, and enjoy nature in the city.
              </p>
            </div>

            {/* Item 3 - Flexible Dining -> Đồ ăn lành mạnh */}
            <div className="group">
              <div className="relative h-[350px] w-full overflow-hidden mb-8 bg-gray-200">
                <Image
                  src="https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop"
                  alt="Healthy Dishes"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-serif text-3xl text-primary mb-4 group-hover:text-accent transition-colors">
                Wholesome & Creative
              </h3>
              <p className="text-base text-secondary font-light leading-loose mb-6">
                Full mixture of healthy classics, GF, DF, Vegetarian, and Vegan options made fresh daily.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INCREDIBLE OCCASIONS */}
      <section className="py-20 px-5">
        <div className="max-w-[90%] mx-auto flex flex-col lg:flex-row h-auto lg:h-[600px]">
          <div className="lg:w-1/2 relative h-[400px] lg:h-full">
            <Image
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop"
              alt="Events & Gatherings"
              fill
              className="object-cover"
            />
          </div>
          <div className="lg:w-1/2 bg-[#f9f9f9] flex flex-col justify-center p-10 lg:p-20 text-left">
            <h2 className="font-serif text-4xl lg:text-5xl text-primary mb-8 leading-tight">
              Incredible Gatherings
            </h2>
            <p className="text-lg text-secondary font-light leading-loose mb-10">
              Whether it's a weekend brunch with close friends or a private garden celebration, our team is dedicated to making every milestone warm and memorable.
            </p>
          </div>
        </div>
      </section>

      {/* 5. RESTAURANTS AND BARS */}
      <section className="py-12 bg-white">
        <div className="max-w-[90%] mx-auto flex flex-col lg:flex-row h-auto lg:h-[600px]">
          <div className="lg:w-1/2 bg-[#f9f9f9] flex flex-col justify-center p-10 lg:p-20 text-left">
            <h2 className="font-serif text-4xl lg:text-5xl text-primary mb-8 leading-tight">
              All-Day Breakfast & Lunch
            </h2>
            <p className="text-lg text-secondary font-light leading-loose mb-10">
              At Vulture St. Espresso, every dish tells a story. We blend traditional breakfast favorites with modern, creative recipes using locally sourced ingredients.
            </p>
          </div>

          <div className="lg:w-1/2 relative h-[400px] lg:h-full">
            <Image
              src="https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1200&auto=format&fit=crop"
              alt="Brunch Dish"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 6. CLUB Vulture St. Espresso */}
      <section className="py-20 px-5">
        <div className="max-w-[90%] mx-auto flex flex-col lg:flex-row h-auto lg:h-[600px]">
          <div className="lg:w-1/2 relative h-[400px] lg:h-full">
            <Image
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop"
              alt="Cozy Corner"
              fill
              className="object-cover"
            />
          </div>
          <div className="lg:w-1/2 bg-[#f9f9f9] flex flex-col justify-center p-10 lg:p-20 text-left">
            <h2 className="font-serif text-4xl lg:text-5xl text-primary mb-6">
              The Vulture Community
            </h2>
            <p className="text-lg text-secondary font-light leading-loose mb-10">
              Elevate your mornings with our signature house blends, fresh juices, smoothies, and community warmth that keeps West End vibrant.
            </p>
          </div>
        </div>
      </section>

      {/* 7. PIONEERING */}
      <section className="py-24 bg-white">
        <div className="max-w-[96%] mx-auto relative lg:h-[700px] flex flex-col lg:block">
          <Image
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1920&auto=format&fit=crop"
            alt="Coffee Vibe"
            fill
            className="object-cover relative lg:absolute inset-0 h-[500px] lg:h-full w-full"
          />
          <div className="relative lg:absolute top-0 lg:top-1/2 right-0 lg:right-[8%] lg:transform lg:-translate-y-1/2 bg-white p-10 lg:p-16 max-w-xl shadow-none lg:shadow-xl mt-[-50px] lg:mt-0 mx-5 lg:mx-0">
            <h2 className="font-serif text-4xl lg:text-5xl text-primary mb-6 leading-tight">
              Pioneering the <br /> Green Lifestyle
            </h2>
            <p className="text-lg text-secondary font-light leading-loose mb-0">
              Founded in 1946 in the heart of West End, Vulture St. Espresso was born from a passion for honest food, great coffee, and a welcoming community spirit.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}