/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
    "./node_modules/flowbite.{js,ts}",
  ],
  theme: {
    extend: {
      height: {
        '100' : '29rem',
        '102' : '36rem',
        '104' : '45.5rem',
      },
      fontSize: {
        xss : '0.5rem'
      },
      backgroundImage: {
        'model_c': "url('/images/casino/bg-live.svg')",
        'model_m8': "url('https://www.m998877.info/~/static/images/home-page/upcoming-events/background/msports_EN.png')",
        'model_cf': "url('/images/cockft/sv388.webp')",
      },
      colors: {
        'lightwhite' :'#d1d7e5',
        'dark':'#222939',
        'darken':'#383e4d',
        'darklight' : '#2d3443',
        'coco':'#caab72',
        'drakligt' : '#4e5461',
        'lightco' : '#df944f',
        'darkco' : '#D7C095',
        'brownlight': '#af9972',
        'darkblue' : '#1a202c',
        'news' : '#D0DDE6',
        'greenlight' : '#3ccc87',
        'graylight' : '#1d222f',
        'yl' : '#ffd60e',
        'graydark' : '#b9c5e126',
        'slatelight' : '#b9c5e1',
        'lightgray' : '#353d5280',
        'darklgray' : '#353d52',
        'custom-color': 'rgba(225, 243, 247, 1)',
        'custom-gray' : '#1d222f',
        'custom-slate' : '#97a4c3',
      },
      opacity: {
        '30': '0.3',
      },
      boxShadow: {
        'autofill': 'inset 0 0 0px 1000px rgb(107,114,128)',
        'custom': [
          '0 17px 03px #0fba84, 0 0 4px 2px #11f7ad, inset 0 0 17px 3px #12b982, inset 0 0 4px 2px #0fba82'
        ],
      },
      keyframes: {
        'blinker' : {
          '0%': { opacity: '1'},
          '100%': { opacity: '0'},
        },
        'fadein' : {
          '0%' : {opacity: '0', transform : 'scale(0.95)'},
          '100%' : {opacity: '1', transform : 'scale(1)'},
        },
      },
      animation: {
        'ltr': 'play-rotate 5s linear infinite',
        'bl':'blink 1.5s infinite',
        'blinker' :'blinker'
      },
      maxHeight: {
        '69': '276px',
      },
      width: {
        '89/100': '89%',
      },
      maxWidth: {
        '1222': '1222px',
      },
      margin: {
        '4.5': '4.5%',
        '15': '60px',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}