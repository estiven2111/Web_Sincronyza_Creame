import twElementPlugin from "tw-elements/dist/plugin.cjs"
/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'azulCreame': '#0C4279', 
      },
      width: {
        '3/5': '60%',
        '2/5': '40%',
        '1/10': '10%',
        '9/10': '90%',
      },
    },
  },
  plugins: [twElementPlugin],
}

