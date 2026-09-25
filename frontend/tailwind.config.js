/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#28402F",
          dark: "#1B2C20",
          light: "#3D5C44",
        },
        clay: {
          DEFAULT: "#B5622E",
          dark: "#94501F",
          light: "#D98C56",
        },
        sage: "#EEF1E6",
        paper: "#FBFAF6",
        ink: "#20261F",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}

