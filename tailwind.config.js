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
        primary: "#121c14", // Màu than chì
        secondary: "#3c5b37", // Màu xám chữ
        accent: "#04aa17", // Màu nâu đồng
        offwhite: "#93c395",
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
