/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#042354'
      },
      fontFamily: {
        roboto: 'Roboto',
        montserrat: 'Montserrat'
      },
      gridColumn: {
        'span-13': 'span 13 / span 13',
        'span-14': 'span 14 / span 14',
        'span-15': 'span 15 / span 15',
        'span-16': 'span 16 / span 16',
      },
      gridColumnStart: {
        100: '100',
      },
      gridColumnEnd: {
        100: '100',
      },
      gridTemplateColumns: {
        100: 'repeat(100, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
}

