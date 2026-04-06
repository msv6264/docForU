/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nova: ['"Nova Square"', "sans-serif"],
        archivo: ['"Archivo Black"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
