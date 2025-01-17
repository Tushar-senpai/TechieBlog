/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  important: '#root',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Source Sans 3"', 'system-ui', '-apple-system', 'sans-serif'],
        'heading': ['Montserrat', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        primary: '#0A84FF',
        secondary: '#e68e37',
        dark: '#4B4B4B',
        light: '#FAF9F6'
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}