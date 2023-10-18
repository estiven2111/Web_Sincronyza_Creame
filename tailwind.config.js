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
    },
  },
  plugins: [twElementPlugin],
}

