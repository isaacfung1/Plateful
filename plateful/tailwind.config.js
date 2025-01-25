module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}',
     './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'class'
  theme: {
    extend: {
      colors: {
        beige: {
          100: "#fefae0",
        },
        green: {
          600: "#6c9e5e",
          800: "#36543b",
        },
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
