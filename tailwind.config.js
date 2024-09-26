/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#202020",
        red: "#ED0000",
        c989898: "#989898",
        bgwhite: "#F6F6F6",
        mgmain: "#FAFAFA",
        blacktext: "#010101",
        black05: "#050B20",
        border: "#EBEBEB",
        price: "#405FF2",
        top: "#07D133",
        border8: "#E8E8E8",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "20px",
          md: "0",
        },
        screens: {
          sm: "100%",
          md: "728px",
          lg: "1024px",
          xl: "1296px",
        },
      },
    },
  },
  plugins: [],
};
