"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// DỮ LIỆU NỘI DUNG 2 TAB: OUR LOCATION & CONTACT
const tabContent = {
  location: {
    title: "Our Location",
    desc: "1/85 Vulture St, West End QLD 4101, Australia. Drop by to experience our secret garden, great coffee, and warm community atmosphere.",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.483167425126!2d153.012574!3d-27.483167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b915a123456789%3A0x123456789abcdef!2s85%20Vulture%20St%2C%20West%20End%20QLD%204101!5e0!3m2!1sen!2sau!4v1650000000000!5m2!1sen!2sau",
    highlights: ["Heart of West End", "Garden Seating Available", "Easy Street Access"],
  },
  contact: {
    title: "Contact Us",
    desc: "We would love to hear from you. Reach out via phone, email, or connect with us on our social channels for any inquiries or feedback.",
    email: "admin@vulturestespresso.com",
    phone: "(07) 3844 3208",
    socials: [
      {
        name: "Instagram",
        url: "https://www.instagram.com/vulture_st_espresso/",
        icon: (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        ),
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/vulturestespresso2020",
        icon: (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.5 5 15.5 5H18V0h-3.808C10.59 0 9 1.581 9 4.75V8z"/>
          </svg>
        ),
      },
    ],
  },
};

export default function AboutUsPage() {
  const [activeTab, setActiveTab] = useState("location");

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
            {/* Cột Chữ bên Trái */}
            <div className="lg:w-1/2 text-left">
              <h3 className="font-serif text-4xl text-primary mb-6">
                {tabContent[activeTab].title}
              </h3>
              <p className="text-lg text-secondary font-light leading-loose mb-10">
                {tabContent[activeTab].desc}
              </p>

              {activeTab === "location" ? (
                <ul className="space-y-4 mb-10">
                  {tabContent.location.highlights.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm font-medium tracking-wider text-primary uppercase"
                    >
                      <span className="h-[1px] w-8 bg-accent"></span> {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="space-y-6 mb-10">
                  <div>
                    <p className="text-xs uppercase tracking-[2px] text-gray-400 mb-1 font-bold">Email Address</p>
                    <a href={`mailto:${tabContent.contact.email}`} className="text-lg text-primary font-medium hover:underline">
                      {tabContent.contact.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[2px] text-gray-400 mb-1 font-bold">Phone Number</p>
                    <a href={`tel:${tabContent.contact.phone}`} className="text-lg text-primary font-medium hover:underline">
                      {tabContent.contact.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[2px] text-gray-400 mb-3 font-bold">Follow Us</p>
                    <div className="flex items-center gap-4">
                      {tabContent.contact.socials.map((social, i) => (
                        <Link
                          key={i}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          // Đổi màu nền nút mạng xã hội thành màu accent (xanh lục) chuẩn của web
                          className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center hover:opacity-90 transition-all shadow-sm"
                          aria-label={social.name}
                        >
                          {social.icon}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Cột Phải: Google Map màu gốc hoặc Ảnh */}
            <div className="lg:w-1/2 h-[500px] relative w-full shadow-sm bg-gray-100 overflow-hidden">
              {activeTab === "location" ? (
                <iframe
                  title="Vulture St. Espresso Map"
                  src={tabContent.location.mapEmbedUrl}
                  className="w-full h-full border-0" // Đã xóa bỏ filter trắng đen để giữ nguyên màu gốc của Map
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              ) : (
                <Image
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop"
                  alt="Contact Us"
                  fill
                  className="object-cover transition-all duration-500"
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}