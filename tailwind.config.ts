import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        police: {
          50: "#F4F7FB",
          100: "#E6EDF6",
          200: "#CCE0F0",
          300: "#99BCE2",
          400: "#3E66A3",
          500: "#2B4C7E",
          600: "#1A365D",
          700: "#102344",
          800: "#0B1528",
          900: "#070D18",
          950: "#04070D",
        },
        khaki: {
          50: "#FDFBF7",
          100: "#F7F3E9",
          200: "#EADEBF",
          300: "#DAC392",
          400: "#C8A562",
          500: "#B88E3E",
          600: "#9E742A",
          700: "#7C581F",
        },
        gold: {
          400: "#FCD34D",
          500: "#F59E0B",
          600: "#D97706",
        },
        tricolor: {
          saffron: "#FF9933",
          white: "#FFFFFF",
          green: "#138808",
          navy: "#000080",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
