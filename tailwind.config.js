/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'inter': ['Inter', 'Arial', 'sans-serif']
      },
      colors: {
        "primary": '#127FFF'
      },
      backgroundImage: {
        'form': "url('/public/images/form-background.png')"
      }
    },
  },
  plugins: [],
}
