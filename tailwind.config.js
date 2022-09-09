/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/index.js"],
  theme: {
    extend: {
      colors:{
        'primary': {
          'red': 'hsl(10, 79%, 65%)',
          'cyan': 'hsl(186, 34%, 60%)',
        },
        'neutral': {
          'dark-brown': 'hsl(25, 47%, 15%)',
          'medium-brown' : 'hsl(28, 10%, 53%)',
          'cream' : 'hsl(27, 66%, 92%)',
          'pale-orange' : 'hsl(33, 100%, 98%)'
        }
      },
      fontFamily: {
        'dmsans': ['DM Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}