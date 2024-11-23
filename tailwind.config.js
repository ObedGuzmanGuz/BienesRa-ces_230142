/** @type {import('tailwindcss').config} */
export default {
  content: ['./views/**/*.pug'], //no importa cuales son mientras tengan el punto pug
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        black: '#000000',
        cerulean: '#006992',
        mint:'#62A87C',
        orange: '#F3A712',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};

