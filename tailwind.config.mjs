/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Añade esta línea
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        white: {
          DEFAULT: "#F2F2F2",
          100: "#F2F2F2",
        },
        black: {
          DEFAULT: "#020202",
          100: "#020202",
        },
        primary: {
          DEFAULT: "#4635B1",
          light: "#5F4BC2",
          dark: "#2A1E80",
        },
        secondary: {
          DEFAULT: "#B771E5",
          light: "#C18BFF",
          dark: "#7A4BAA",
        },
        tertiary: {
          DEFAULT: "#AEEA94",
          light: "#C4F5B7",
          dark: "#6B9E4D",
        },
        quaternary: {
          DEFAULT: "#FFFBCA",
          light: "#FFFFE0",
          dark: "#B3B27A",
        },
      },
      fontFamily: {
        sans: ["Geist", "sans-serif"],
        mono: ["Geist", "monospace"],
      },
      boxShadow: {
        card: "7px 7px #000000",
        hover: "11px 11px #000000",
        cardD: "7px 7px #ffffff",
        hoverD: "11px 11px #ffffff",
        primary: "7px 7px #4635B1",
        secondary: "7px 7px #B771E5",
        tertiary: "7px 7px #AEEA94",
        quaternary: "7px 7px #FFFBCA",
        primaryHover: "11px 11px #4635B1",
        secondaryHover: "11px 11px #B771E5",
        tertiaryHover: "11px 11px #AEEA94",
        quaternaryHover: "11px 11px #FFFBCA",
      },

      maxWidth: {
        "1/12": "8.333333%",
        "2/12": "16.666667%",
        "3/12": "25%",
        "4/12": "33.333333%",
        "5/12": "41.666667%",
        "6/12": "50%",
        "7/12": "58.333333%",
        "8/12": "66.666667%",
        "9/12": "75%",
        "10/12": "83.333333%",
        "11/12": "91.666667%",
        "12/12": "100%",
      },
      maxHeight: {
        "1/10": "10vh",
        "2/10": "20vh",
        "3/10": "30vh",
        "4/10": "40vh",
        "5/10": "50vh",
        "6/10": "60vh",
        "7/10": "70vh",
        "8/10": "80vh",
      },
      borderWidth: {
        1: "1px",
        3: "3px",
        6: "2rem",
        7: "1rem",
      },
      borderColor: {
        black: "#000",
        blackRad: "rgba(0,0,0,0.8)",
        whiteRad: "rgba(242, 242, 242, 0.8)",
      },
      fontSize: {
        "2xs": ".5rem",
        "3xs": ".375rem",
      },
    },
  },
  plugins: [ require("tailwind-scrollbar")],
};
