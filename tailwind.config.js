const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        primary: '#042354',
        secondary: '#d0ddf1',
        terciary: '#bdc1da',
        quaternary: '#d0d1dd',
        warning: '#d5b5c0',
        custom:{
          '2e9e96': '#2e9e96',
          '57aad9':'#57aad9',
          '7d2bc5':'#7d2bc5',
          '00e742': '#00e742'
        },
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
  plugins: [
    flowbite.plugin(),
  ],
}

