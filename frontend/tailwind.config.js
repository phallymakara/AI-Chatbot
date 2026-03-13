/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#1e3a8a", // Dark blue for Admin Sidebar
          primary: "#2563eb", // Blue for buttons and user bubbles
          light: "#f3f4f6", // Light gray background
        },
      },
    },
  },
  plugins: [],
};
