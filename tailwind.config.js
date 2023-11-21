/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'science-blue': {
            '50': '#f0f7ff',
            '100': '#e0eefe',
            '200': '#bbddfc',
            '300': '#7fc0fa',
            '400': '#3ba1f5',
            '500': '#1185e6',
            '600': '#0569c7',
            '700': '#05529f',
            '800': '#094683',
            '900': '#0d3c6d',
            '950': '#092648',
        },
      },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
        'heading': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
    require('flowbite-typography'),
  ],
  darkMode: "class",
}

