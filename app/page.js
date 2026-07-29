"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Papa from "papaparse";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=1920&auto=format&fit=crop",
  ];

  // State lưu danh sách món ăn tải từ Google Sheets
  const [recipes, setRecipes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. Banner Slider background
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // 2. Fetch dữ liệu từ Google Sheets để làm vòng xoay món ăn
  useEffect(() => {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRxTrhMac3rFsYzkSozJDuEOwy2qcSIapkwDG1wpYt_U2pau4vdJgiqTXicnXsny-iHedj_UxBC3jQ1/pub?gid=176867812&single=true&output=csv';

    fetch(csvUrl)
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const formattedData = results.data.map((item, index) => ({
              id: item["STT"] || index + 1,
              name: item["Tên món"] || "Món chưa có tên",
              desc: item["giới thiệu chung"] || "",
              category: item["Phân loại"] ? item["Phân loại"].trim() : "all day",
              image: (item["link ảnh"] && item["link ảnh"].trim() !== "") 
                ? item["link ảnh"].trim() 
                : DEFAULT_IMAGE,
            }));
            setRecipes(formattedData);
          },
        });
      })
      .catch((error) => console.error("Lỗi tải menu trang chủ:", error));
  }, []);

  // 3. Hiệu ứng tự động chuyển đổi 5 món sau mỗi 6 giây để chạy vòng tròn hết menu
  useEffect(() => {
    if (recipes.length === 0) return;

    const recipeInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 5) % recipes.length);
    }, 6000);

    return () => clearInterval(recipeInterval);
  }, [recipes]);

  // Lấy ra đúng 5 món ăn để hiển thị tại thời điểm hiện tại
  const displayedRecipes = recipes.length > 0 
    ? Array.from({ length: 5 }, (_, i) => recipes[(currentIndex + i) % recipes.length])
    : [];

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

      {/* 3. 5 RECIPES GRID SECTION (Lăn qua lăn lại tự động) */}
      <section className="pb-16 px-5">
        <div className="max-w-[90%] mx-auto">
          {/* Lưới hiển thị 5 ảnh món ăn có hiệu ứng mờ dần (fade) khi đổi batch */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 transition-all duration-700 ease-in-out">
            {displayedRecipes.length > 0 ? (
              displayedRecipes.map((recipe, idx) => (
                <div 
                  key={`${recipe.id}-${idx}`}
                  className="group bg-gray-50 overflow-hidden rounded-sm shadow-sm hover:shadow-md transition-all flex flex-col justify-between animate-fade-in"
                >
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={recipe.image}
                      alt={recipe.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-primary">
                      {recipe.category}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="font-serif text-lg text-primary mb-2 leading-snug">
                        {recipe.name}
                      </h3>
                      <p className="text-secondary text-xs font-light leading-relaxed mb-4 line-clamp-3">
                        {recipe.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-400">
                Đang tải thực đơn vòng xoay...
              </div>
            )}
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