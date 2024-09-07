/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      'linkedin-blue': '#0073b1',
      'linkedin-light-blue': '#00a0dc',
      'linkedin-dark-blue': '#004182',
      'linkedin-dark-gray': '#333333',
      'linkedin-bg-gray': '#f3f6f8',
      'linkedin-border-gray': '#e1e9ee',
      'linkedin-white': '#ffffff',
      'linkedin-black': '#000000',
      'linkedin-hover-blue': '#005582',
      'linkedin-button-hover': '#006097',
      'linkedin-success-green': '#00bfa5',
      'linkedin-error-red': '#d93025',
      'linkedin-warning-orange': '#f39c12',
      'linkedin-highlight-yellow': '#ffeb3b',
    },
  },
  plugins: [],
}

