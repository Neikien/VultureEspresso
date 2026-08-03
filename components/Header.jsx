"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // Quản lý trạng thái mở/đóng menu mobile

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
    // Bạn có thể giảm py-4 thành py-2 hoặc py-3 ở thẻ header bên dưới nếu muốn thu gọn khoảng cách trên/dưới
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100 py-2 transition-all">
      <div className="max-w-[95%] mx-auto flex justify-between items-center px-5">
        
        {/* LOGO SECTION */}
        {/* THÊM VÀ TỰ ĐIỀU CHỈNH KHOẢNG CÁCH DỊCH SANG PHẢI Ở ĐÂY: 
            Ví dụ: ml-4, ml-6, hoặc ml-8 (hoặc chỉnh trực tiếp số pixel như ml-[20px]) */}
        <Link
          href="/"
          className="flex items-center ml-16" 
        >
          {/* Điều chỉnh kích thước w-14 h-14 hoặc w-12 h-12 nếu thấy vẫn to quá */}
          <div className="relative w-16 h-16">
            <Image
              src="/logo.jpg"
              alt="Vulture St. Espresso Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Navigation cho Desktop */}
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

          {/* Book Now Button Desktop */}
          <div className="flex items-center gap-6 border-l border-gray-200 pl-10 ml-2">
            <button
              onClick={handleBookNow}
              className="bg-accent text-white text-xs font-bold px-8 py-3 uppercase hover:bg-gray-800 transition-all shadow-md"
            >
              Book Now
            </button>
          </div>
        </nav>

        {/* Nút 3 gạch mở Menu trên Mobile */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-primary focus:outline-none p-1"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Phần danh sách trang trượt ra trên Mobile */}
      <div 
        className={`lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-md overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 py-6" : "max-h-0 opacity-0 py-0 border-b-0"
        }`}
      >
        <div className="max-w-[95%] mx-auto px-5 flex flex-col gap-6">
          <ul className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest text-primary">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 transition-colors ${
                    pathname === item.path ? "text-accent" : "hover:text-accent"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          
          <button
            onClick={(e) => {
              setIsOpen(false);
              handleBookNow(e);
            }}
            className="bg-accent text-white text-xs font-bold py-3 uppercase text-center w-full shadow-md"
          >
            Book Now
          </button>
        </div>
      </div>
    </header>
  );
}