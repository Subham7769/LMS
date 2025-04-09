/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class", // Ensure it's set to 'class' and not 'media'
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
        120: "120vh", // 120% of the viewport height
        150: "150vh", // 150% of the viewport height
        180: "180vh", // 180% of the viewport height
        200: "200vh", // 200% of the viewport height
      },
      colors: {
        blue: {
          primary: "#1c398e", // blue 900
          secondary: "#dbeafe", // blue 100
          tertiary: "#EFF6FF", // blue 50
        },
        green: {
          primary: "#0d542b", // green 900
          secondary: "#dcfce7", // green 100
          tertiary: "#f0fdf4", // green 50
        },
        violet: {
          primary: "#4d179a", // violet 900
          secondary: "#ede9fe", // violet 100
          tertiary: "#f5f3ff", // violet 50
        },
        orange: {
          primary: "#7e2a0c", // orange 900
          secondary: "#ffedd5", // orange 100
          tertiary: "#fff7ed", // orange 50
        },
        gray: {
          primary: "#d1d5db", // gray-500
          secondary: "#f1f5f9", // gray-400
          tertiary: "#d1d5db", // gray-300
        },
        border: {
          gray: {
            primary: "#d1d5db", // gray-300
            secondary: "#e5e7eb", // gray-200
            tertiary: "#f3f4f6", // gray-100
          },
        },
        background: {
          light: {
            white: "#FFFFFF",
            primary: "#e5e7eb", // gray-200
            secondary: "#f3f4f6", // gray-100
            tertiary: "#f9fafb", // gray-50
          },
          dark: {
            primary: "#111827",
            secondary: "#1F2937",
            tertiary: "#374151",
          },
        },
        text: {
          light: {
            heading: "#111827", // gray-900
            primary: "#1f2937", // gray-800
            secondary: "#364153", // gray-700
            tertiary: "#6b7280", //gray-500
          },
          dark: {
            primary: "#F9FAFB",
            secondary: "#D1D5DB",
            tertiary: "#9CA3AF",
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar"),
    require("tailwindcss-animate"),
  ],
};
