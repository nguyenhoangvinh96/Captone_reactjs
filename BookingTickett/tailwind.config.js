module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      height:{
        '100':480,
      },
      margin: {
        '720': 720,
      }
    },
  },
  plugins: [],
  // corePlugins:{
  //   preflight:false,
  //   },
   // dark mode
   darkMode:'class'
}