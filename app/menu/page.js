"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Papa from "papaparse";

const categories = [
  "All",
  "all day",
  "lunch",
  "Hot Drinks",
  "Cold Drinks",
  "Juices & Smoothies",
  "Beer / Wine / Cocktails",
];

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop";

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRxTrhMac3rFsYzkSozJDuEOwy2qcSIapkwDG1wpYt_U2pau4vdJgiqTXicnXsny-iHedj_UxBC3jQ1/pub?gid=176867812&single=true&output=csv';

    fetch(csvUrl)
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const formattedData = results.data
              .filter((item) => item["Tên món"] && item["Tên món"].trim() !== "")
              .map((item, index) => {
                const rawName = item["Tên món"].trim();
                const desc = item["giới thiệu chung"] ? item["giới thiệu chung"].trim() : "";
                const category = item["Phân loại"] ? item["Phân loại"].trim() : "all day";
                
                const isSide = 
                  rawName.toLowerCase().includes("side") || 
                  category.toLowerCase().includes("side");

                // Nếu là side, lấy nội dung cột "giới thiệu chung" làm tên chính để không bị lặp chữ "SIDES:"
                const name = isSide && desc !== "" ? desc : rawName;
                // Nếu đã lấy giới thiệu làm tên rồi thì phần desc phụ có thể để trống
                const finalDesc = isSide ? "" : desc;

                return {
                  id: item["STT"] || index + 1,
                  name: name,
                  desc: finalDesc,
                  price: item["giá"] || "Liên hệ",
                  category: category,
                  isSide: isSide,
                  image: (item["link ảnh"] && item["link ảnh"].trim() !== "") 
                    ? item["link ảnh"].trim() 
                    : DEFAULT_IMAGE,
                };
              });
            setMenuItems(formattedData);
            setLoading(false);
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching menu:", error);
        setLoading(false);
      });
  }, []);

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter(
          (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  const regularItems = filteredItems.filter((item) => !item.isSide);
  const sideItems = filteredItems.filter((item) => item.isSide);

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
          <p className="text-sm font-bold tracking-[4px] uppercase mb-6">
            Discover The New Flavors
          </p>
          <h1 className="font-serif text-6xl md:text-8xl mb-6">
            Our Menu
          </h1>
        </div>
      </div>

      {/* 2. MAIN CONTENT */}
      <div className="max-w-[90%] mx-auto py-20 px-5">
        <div className="mb-20">
          <h2 className="font-serif text-4xl lg:text-5xl text-primary mb-10 leading-tight">
            Take a look at our menu and choose your favorite items.
          </h2>

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

        {/* 3. GRID MENU ITEMS & SIDES LIST */}
        {loading ? (
          <div className="text-center py-20 text-gray-400 font-serif text-xl">
            Preparing delicious recipes for you...
          </div>
        ) : (
          <div className="flex flex-col gap-16">
            {/* Món chính */}
            {regularItems.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-16 gap-y-16">
                {regularItems.map((item) => (
                  <div
                    key={item.id}
                    className="group flex flex-col md:flex-row gap-6 bg-gray-50 p-6 rounded-sm shadow-sm hover:shadow-md transition-all"
                  >
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
                ))}
              </div>
            )}

            {/* Món phụ (Sides - Đã ẩn chữ SIDES lặp, lấy nội dung làm tiêu đề) */}
            {sideItems.length > 0 && (
              <div className="bg-gray-50 p-8 md:p-12 border-t-2 border-accent">
                <h3 className="font-serif text-3xl text-primary mb-8 pb-4 border-b border-gray-200 uppercase tracking-wide">
                  Sides & Extras
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  {sideItems.map((side) => (
                    <div key={side.id} className="flex flex-col border-b border-dashed border-gray-200 pb-4">
                      <div className="flex justify-between items-baseline">
                        <span className="font-serif text-xl text-primary font-medium">
                          {side.name}
                        </span>
                        <span className="font-serif text-lg text-accent font-semibold ml-4">
                          {side.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {filteredItems.length === 0 && (
              <div className="text-center py-20 text-gray-400 font-serif text-xl">
                No items found in the "{selectedCategory}" category.
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}