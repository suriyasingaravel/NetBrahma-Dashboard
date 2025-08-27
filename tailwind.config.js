/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "nb-green": "#008A00",
        "nb-yellow": "#FFDD00",
        "nb-orange": "#F18200",
        "nb-red": "#E15825",
        "nb-blue": "#046899",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"], // ⬅️ Inter as default sans
        inter: ["Inter", "sans-serif"], // ⬅️ Utility: font-inter
      },
    },
  },
  plugins: [],
};
