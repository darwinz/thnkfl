/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.js","./src/**/*.{html,js,jsx,ts,tsx,vue}",'./src/pages/**/*.{html,js}','./src/components/**/*.{html,js}',],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

