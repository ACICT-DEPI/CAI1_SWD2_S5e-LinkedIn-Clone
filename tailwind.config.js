/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        'linkedinBlue': '#0077B5',   // Primary LinkedIn color
        'linkedinDarkBlue': '#004182',
        'linkedin-lighthover-blue': '#F0F7FE',  //border button hover
        'LinkHoverBlue':'#005582',
        'linkedinLightGray': '#F3F2EF', // Background color
        'linkedinGray': '#86888A',     // Text color
        'linkedinWhite': '#FFFFFF',
      },
    },
  },
  plugins: [],
}

