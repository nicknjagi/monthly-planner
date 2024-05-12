/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'montserrat':["Montserrat", "sans-serif"],
        'lato':["Lato", "sans-serif"]
      },
      colors:{
        'forrest-green':"#074440",
        'lines':'rgb(168 162 158)',
        'beige':'#F6F5F1'
      },
      backgroundImage: {
        'lines': "url('/public/assets/images/lines.svg')",
      }
    },
  },
  plugins: [],
}

