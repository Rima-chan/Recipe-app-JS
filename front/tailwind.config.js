module.exports = {
  purge: ['*.html', './front/**/*.js', './front/**/.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        'like-btn': {
          '0%': {
            transform: 'scale(0)',
            opacity: 0,
          },
          '90%': {
            transform: 'scale(1.2)',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: 1,
          }
        },
      },
      animation: {
        'like-btn': 'like-btn 300ms cubic-bezier(.99,.01,.37,.97)'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
