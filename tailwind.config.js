module.exports = {
  content: [
    './resources/js/**/*.{js,ts,jsx,tsx}',
    './Modules/**/resources/js/**/*.{js,ts,jsx,tsx}',
    './resources/views/**/*.blade.php',
    './resources/views/**/*.php',
    './resources/js/components/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-rtl'),
  ],
};
