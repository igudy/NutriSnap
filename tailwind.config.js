/** @type {import('tailwindcss').Config} */
module.exports = {
 content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#024E44',
          main: '#90C841',
          light: '#98B80B',
        },
        background: {
          dark: '#024E44',
          light: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['GoogleSans-Regular'],
        'sans-medium': ['GoogleSans-Medium'],
        'sans-semibold': ['GoogleSans-SemiBold'],
        'sans-bold': ['GoogleSans-Bold'],
      },
    },
  },
  plugins: [],
};
