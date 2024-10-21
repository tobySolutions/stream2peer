/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["montserrat", "sans-serif"]
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(80px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
      animation: {
        slideUp: "slideUp 0.5s ease-out",
      },
    },
  },
  plugins: [],
};
