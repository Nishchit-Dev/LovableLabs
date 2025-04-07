// tailwind.config.js
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
        font: {
          blue: "rgb(120, 170, 255)",
          gray: "rgba(230, 230, 230, 0.8)",
          white: "rgba(255, 255, 255, 0.85)",
        },
        bg: {
          blue: "rgb(0, 85, 255)",
          gray: "rgb(43, 43, 43)",
          dark: "rgb(17, 17, 17)",
          offwhite: "rgba(255, 255, 255, 0.9)",
        },
      },
    },
  },
  plugins: [],
};
