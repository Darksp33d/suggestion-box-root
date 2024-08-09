module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent': {
          DEFAULT: '#7289da',
          'light': '#8ea1e1',
        },
        'dark': {
          '600': '#36393f',
          '700': '#2f3136',
          '800': '#292b2f',
        },
        'light': {
          '300': '#dcddde',
          '400': '#b9bbbe',
        },
      },
    },
  },
  plugins: [],
}