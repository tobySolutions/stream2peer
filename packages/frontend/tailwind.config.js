/** @type {import('tailwindcss').Config} */

export const colors = {
  "ui-mid-white": "#313538",
  "yellow-dark-9": "#FFE629",
  "yellow-dark-1": "#14120B",
  "yellow-dark-2": "#1B180F",
  "yellow-dark-3": "#2D2305",
  "yellow-dark-4": "#362B00",
  "yellow-dark-5": "#433500",
  "yellow-dark-6": "#524202",
  "yellow-dark-7": "#665417",
  "yellow-dark-8": "#836A21",
  "yellow-dark-9": "#FFE629",
  "yellow-dark-10": "#FFFF57",
  "yellow-dark-11": "#F5E147",
  "yellow-dark-12": "#F6EEB4",
  "dark-gray": "#1e1e1e",
  "primary-white": "#fff6ff",
  "primary-border": "hsl(155,6%,42.5%)",
  primary: {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
  },
};

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["montserrat", "sans-serif"],
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(80px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
      colors,
      animation: {
        slideUp: "slideUp 0.5s ease-out",
      },
    },
  },
  plugins: [],
};
