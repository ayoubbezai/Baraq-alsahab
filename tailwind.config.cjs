const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        textColor: "hsl(var(--text-color))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "#0C005B",
          light: "#030081",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#F1B900",
          light: "#FFD301",
          foreground: "hsl(var(--secondary-foreground))",
        },
      },
      fontFamily: {
        english: ["Montserrat", ...fontFamily.sans],
        arabic: ["Tajawal", "sans-serif"],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tw-elements/dist/plugin.cjs"),
  ],
};
