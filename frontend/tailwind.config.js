/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    screens: {
      'xs': '360px',
      'sm': '480px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        festive: {
          dark: '#070010',
          wine: '#1a0022',
          maroon: '#2a0833',
          gold: '#ffd700',
          'gold-light': '#fff3b0',
          amber: '#ffb703',
          orange: '#fb8500',
          vermilion: '#e63946',
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Poppins"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
