/** @type {import('tailwindcss').Config} */
module.exports = {
 prefix: 'tw-',
 content: [
   './src/**/*.{html,ts}',
   './projects/water/src/**/*.{html,ts}'

],
  mode: 'jit',
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,ts}',
    './projects/water/src/**/*.{html,ts}']
  },

  theme: {
    extend: {},
  }
}

