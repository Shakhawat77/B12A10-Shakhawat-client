/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ← must be "class" for this toggle to work
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // ← include all folders with JSX/TSX
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
