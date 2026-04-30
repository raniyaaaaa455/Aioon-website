export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Syne', 'system-ui', 'sans-serif'],
        arabic: ['Tajawal', 'sans-serif'],
      },
      colors: {
        navy: {
          800: '#0a2472',
          900: '#051a4a',
        },
      },
    },
  },
  plugins: [],
}