module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      'xs': '.6rem',
      'sm': '.85rem',
      'xl': '1.2rem',
    },
    maxWidth: {
      'img': '12rem',
    },
    extend: {
      backgroundColor: {
        'primary': '#253341',
        'disabled': 'rgb(255 255 255 / 36%)',
      },
      margin: {
        'center': '0 auto',
      },
      height: {
        'box': '210px',
      },
      cursor: {
        'disabled': 'not-allowed',
      }
    },
  },
  variants: {
    extend: {
      backgroundColor:['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [],
}
