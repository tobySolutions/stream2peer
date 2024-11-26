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
  "border": "hsl(var(--border))",
  "input": "hsl(var(--input))",
  "ring": "hsl(var(--ring))",
  "background": "hsl(var(--background))",
  "foreground": "hsl(var(--foreground))",
  "primary": {
    "DEFAULT": "hsl(var(--primary))",
    "foreground": "hsl(var(--primary-foreground))",
  },
  "secondary": {
    "DEFAULT": "hsl(var(--secondary))",
    "foreground": "hsl(var(--secondary-foreground))",
  },
  "destructive": {
    "DEFAULT": "hsl(var(--destructive))",
    "foreground": "hsl(var(--destructive-foreground))",
  },
  "muted": {
    "DEFAULT": "hsl(var(--muted))",
    "foreground": "hsl(var(--muted-foreground))",
  },
  "accent": {
    "DEFAULT": "hsl(var(--accent))",
    "foreground": "hsl(var(--accent-foreground))",
  },
  "popover": {
    "DEFAULT": "hsl(var(--popover))",
    "foreground": "hsl(var(--popover-foreground))",
  },
  "card": {
    "DEFAULT": "hsl(var(--card))",
    "foreground": "hsl(var(--card-foreground))",
  },
};

export default {
  darkMode: ["class"],
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
