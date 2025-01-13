module.exports = {
  enable : true,
  content: ["./src/*.js","./src/**/*.{html,js,jsx,ts,tsx,vue}",'./pages/**/*.{html,js}',
  './components/**/*.{html,js}',],
  options : {
    safelist: [/^w-/]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Avenir', 'Helvetica', 'Arial', 'sans-serif']
    }
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
