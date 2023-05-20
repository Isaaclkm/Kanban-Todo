// Define your custom colors
const colors = {
  primary: '#3E3F4E',
  secondary: '#E4EBFA',
  third: '#2B2C37',
  darker: '#20212C',
  morado: '#635FC7',
  focus: '#9F7AEA', // set the color of the border when focused
};

// Define your light theme colors
const lightColors = {
  primary: '#FFFFFF', // Updated color for light theme
  secondary: '#F2F4F8', // Updated color for light theme
  third: '#D1D5DB', // Updated color for light theme
  darker: '#C4C4C4', // Updated color for light theme
  morado: '#A78BFA', // Updated color for light theme
  focus: '#9F7AEA', // set the color of the border when focused
};

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors, // Keep the existing color palette
        light: lightColors, // Add the light theme color palette
      },
      borderColor: {
        ...colors, // Use the same border colors as the main color palette
        light: lightColors, // Add the light theme border colors
      },
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
      require('tailwind-scrollbar-hide');
    },
  ],
};