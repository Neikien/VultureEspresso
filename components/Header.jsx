"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Menu", path: "/menu" },
    { name: "Experience", path: "/experience" },
    { name: "About us", path: "/about-us" },
  ];

  // Xử lý nút Book Now chuyển hướng sang Obeeapp
  const handleBookNow = (e) => {
    e.preventDefault();
    window.location.href = "https://bookings.obeeapp.com/vulturestespresso";
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100 py-4 transition-all">
      <div className="max-w-[95%] mx-auto flex justify-between items-center px-5">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-xl font-semibold uppercase tracking-widest text-primary"
        >
          Vulture St. Espresso
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-12">
          <ul className="flex gap-10 items-center text-xs font-medium uppercase tracking-widest text-primary">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`relative pb-1 hover:text-accent transition-colors group ${
                    pathname === item.path ? "text-accent" : ""
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute left-0 bottom-0 h-[1px] bg-accent transition-all ${
                      pathname === item.path
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Book Now Button */}
          <div className="flex items-center gap-6 border-l border-gray-200 pl-10 ml-2">
            <button
              onClick={handleBookNow}
              className="bg-accent text-white text-xs font-bold px-8 py-3 uppercase hover:bg-gray-800 transition-all shadow-md"
            >
              Book Now
            </button>
          </div>
        </nav>

        {/* Mobile menu button */}
        <button className="lg:hidden text-primary">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}