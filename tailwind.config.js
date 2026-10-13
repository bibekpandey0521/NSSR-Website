/** @type {import('tailwindcss').Config} */
module.exports = {
  // v4 reads this via the `@config` directive in assets/css/input.css.
  // These values must stay in sync with the design tokens in
  // assets/css/main.css (--nssr-blue, --nssr-dark) and the font stack used
  // by every page's <link> to the local font stylesheet.
  theme: {
    extend: {
      colors: {
        nssrBlue: '#004AAD',
        nssrDark: '#0f172a',
        nssrDark2: '#172554',
      },
      fontFamily: {
        sans: ['"Source Sans 3"', 'sans-serif'],
        serif: ['"Source Serif 4"', 'serif'],
        oswald: ['Oswald', 'sans-serif'],
      },
    },
  },
  plugins: [],
};