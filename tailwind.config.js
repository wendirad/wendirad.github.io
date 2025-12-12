/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'text-light': 'rgb(68, 68, 68)',
        'text-dark': 'rgb(230, 230, 230)',
        'bg-light': '#DBDBDB',
        'bg-dark': '#525252',
        'primary-light': '#C4C4C4',
        'primary-dark': '#696969',
        'secondary-light': '#9E9E9E',
        'secondary-dark': '#808080',
        'tertiary-light': '#71797E',
        'tertiary-dark': '#E5E4E2',
      },
      fontFamily: {
        sans: ['Signika', 'Gilroy', 'sans-serif'],
        display: ['Gilroy', 'Signika', 'sans-serif'],
        body: ['Signika', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

