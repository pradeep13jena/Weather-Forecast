/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['/doc/index.html'],
  theme: {
    extend: {
      fontFamily: {
        'khitan': ["Noto Serif Khitan Small Script", 'serif'],
        'gupter': ["Gupter", "serif"]
      }
    },
  },
  plugins: [],
}

