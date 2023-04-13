// Define your custom colors
const colors = {
  primary: '#3E3F4E',
  secondary: '#E4EBFA',
  third: '#2B2C37',
  morado: '#635FC7',
  focus: '#9F7AEA', // set the color of the border when focused
}

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: colors,
      borderColor: colors,
      boxShadow: {
        focus: '0 0 0 2px rgba(159, 122, 234, 0.5)', // add a focus box shadow
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['focus'], // add focus style to borderWidth variants
    },
  },
  plugins: [
    function ({ addVariant }) {
        addVariant('child', '& > *');
        addVariant('child-hover', '& > *:hover');
    }
  ],
}
