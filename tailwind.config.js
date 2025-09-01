/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af',
        secondary: '#16a34a',
        accent: '#f59e0b'
      }
    },
  },
  plugins: [],
}
