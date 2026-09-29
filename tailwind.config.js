import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#094CB2",
          navy: "#0A1C24",
          teal: "#0F766E",
          emerald: "#10B981",
          dark: "#0F2830",
          cardDark: "#132D37",
        }
      },
      fontFamily: {
        serif: ['"Noto Serif"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
        script: ['"Caveat"', 'cursive'],
        display: ['"Public Sans"', 'sans-serif']
      }
    },
  },
  plugins: [
    daisyui
  ],
  daisyui: {
    themes: [
      {
        wanderly: {
          "primary": "#0F766E",
          "primary-focus": "#0D9488",
          "primary-content": "#ffffff",
          "secondary": "#094CB2",
          "accent": "#10B981",
          "neutral": "#0A1C24",
          "base-100": "#ffffff",
          "base-200": "#F8FAFC",
          "base-300": "#F1F5F9",
          "base-content": "#0F172A",
        },
      },
      "light",
    ],
  },
}
