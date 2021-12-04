module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'cycleOrange': '#f8644c', 
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
