/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    input: {
      focus: {
        boxShadow: "none",
      },
    },
    extend: {
      container: {
        center: true,
        padding: "15px",
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      height: {
        '120': '120vh', // 120% of the viewport height
        '150': '150vh', // 150% of the viewport height
        '180': '180vh', // 180% of the viewport height
        '200': '200vh', // 200% of the viewport height
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar"), require("tailwindcss-animate")],
};
