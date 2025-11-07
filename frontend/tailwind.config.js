/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#f5c542",
        "gold-light": "#ffdb70",
        "dark-bg": "#0d0d0d",
        "dark-card": "#141414",
      },
    },
  },
  plugins: [],
};
