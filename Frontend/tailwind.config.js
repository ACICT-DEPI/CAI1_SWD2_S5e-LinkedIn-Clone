/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        linkedinBlue: "#0A66C2", //Primary LinkedIn color
        linkedinSecondBlue: "#0077B5",
        linkedinDarkBlue: "#004182",
        "linkedin-lighthover-blue": "#F0F7FE", //border button hover blue
        "linkedin-lighthover-gray": "#F5F5F5", //border button hover gray
        "linkedin-darkhover-gray": "#E0E0E0",
        LinkHoverBlue: "#005582",
        linkedinLightGray: "#F3F2EF", // Background color
        linkedinGray: "#86888A", // Text color light gray
        linkedinsecondGray: "#526A6E",
        linkedinDarkGray: "#404040",
        linkedinWhite: "#FFFFFF",
        linkedinGreen: "#01754f",
      },
    },
  },
  plugins: [],
};

