/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px", // @media (min-width: 480px)
      md: "991px", // @media (min-width: 768px)
      lg: "1024px", //  @media (min-width: 1024px)
      xl: "1280px", //  @media (min-width: 1280px)
      "2xl": "1440px" // @media (min-width: 1536px)
    },

    colors: {
      white: "#FFFFFF",
      black: "#000000",
      glow: "#59ACFF",
      blog: {
        100: "#114477",
        200: "#113366",
        300: "#112255",
        400: "#111144",
        500: "#110033",
        600: "#",
        700: "#",
      },

      //background
      bg_primary: "#2A3239",
      bg_secondary: "#191E22",
      bg_tertiary: "#114477",
      bg_additional: "#CBE4FF40",

      //text
      tx_primary: "#FFFFFF",
      tx_secondary: "#59ACFF",
      tx_tertiary: "#FFFFFF80",
      tx_additional: "#",
      tx_link: "#59ACFF",
      tx_error: "#D44A47",

      //border
      br_primary: "#59ACFF",
      br_secondary: "#114477",
      br_tertiary: "#DB0000",

      //button
      bt_primary: "#FFFFFF",
      bt_secondary: "#",
      bt_tertiary: "#FF0000",
      bt_additional: "#00FF38"
    },
    extend : {
      fontFamily: {
        primary: ["Lobster", "sans-serif"],
        secondary: ["Open Sans", "sans-serfi"]
      },
      fontSize: {
        heading_1: "35px",
        heading_2: "20px",
        base: "16px",
        small: "14px"
      },
      fontWeight: {
        light: 100,
        regular: 400,
        medium: 500,
        bold: 700
      },
      // space
      spacing: {
        base: "1rem",
        small: "0.5rem",
        large: "2rem"
      },
      // border radius
      borderRadius: {
        small: "0.25rem",
        medium: "0.5rem",
        large: "0.8rem"
      },
      backgroundImage: {
        'five-color-gradient': 'linear-gradient(to bottom, #114477, #113366, #112255, #111144, #110033)',
      },
      boxShadow: {
        glow: "0 0 10px 5px #59ACFF",
        header_shadow: "0 0 50px 2px #114477",
      },
    },
  },
  plugins: [],
}
