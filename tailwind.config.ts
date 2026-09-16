import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#ED1C24",
          redDark: "#C8151C",
          black: "#171717",
          dark: "#1C1C1C",
          cream: "#F6F2EE",
          pink: "#F7E3DF",
          grey: "#767676",
          border: "#ECECEC",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "Poppins", "sans-serif"],
        poppins: ["var(--font-poppins)", "Poppins", "sans-serif"],
        heading: ["var(--font-outfit)", "Outfit", "var(--font-poppins)", "sans-serif"],
        outfit: ["var(--font-outfit)", "Outfit", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "6px",
      },
      maxWidth: {
        container: "1200px",
      },
    },
  },
  plugins: [],
};
export default config;
