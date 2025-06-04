/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './resources/**/*.{js,ts,jsx,tsx}',
    './Modules/**/resources/**/*.{js,ts,jsx,tsx}',
    './app/**/*.php',
    './resources/**/*.php',
    './Modules/**/*.php',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    // RTL support plugin
    function({ addUtilities }) {
      const newUtilities = {
        '.rtl': {
          direction: 'rtl',
        },
        '.ltr': {
          direction: 'ltr',
        },
        '.rtl .text-left': {
          'text-align': 'right',
        },
        '.rtl .text-right': {
          'text-align': 'left',
        },
        '.rtl .ml-auto': {
          'margin-left': '0',
          'margin-right': 'auto',
        },
        '.rtl .mr-auto': {
          'margin-right': '0',
          'margin-left': 'auto',
        },
        '.rtl .pl-4': {
          'padding-left': '0',
          'padding-right': '1rem',
        },
        '.rtl .pr-4': {
          'padding-right': '0',
          'padding-left': '1rem',
        },
        '.rtl .border-l': {
          'border-left': '0',
          'border-right': '1px solid',
        },
        '.rtl .border-r': {
          'border-right': '0',
          'border-left': '1px solid',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
