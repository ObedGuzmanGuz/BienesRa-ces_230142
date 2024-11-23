/** @type {import('tailwindcss').config} */
export default {
  content: ['./views/**/*.pug'], //no importa cuales son mientras tengan el punto pug
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        black: '#000000',
        mint: '#62A87C',
        cerulean: '#006992',
        orange: '#F3A712',
      },
    },
  },
  plugins: [],
};

