/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1b4d3e", // Màu than chì
        secondary: "#555555", // Màu xám chữ
        accent: "#51d961", // Màu nâu đồng
        offwhite: "#f9f9f9",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      maxWidth: {
        standard: "1320px",
      },
    },
  },
  plugins: [],
};
