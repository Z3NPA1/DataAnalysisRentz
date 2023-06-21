
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    fontFamily:{
      Paytone:['Paytone One', 'sans-serif'],
      StickNo:['Stick No Bills','sans-serif'],
      Roboto:['Roboto Slab','serif'],
      Playfair:['Playfair Display','serif']
    },
    screens:{
      sm:'480px',
      md:'768px',
      lg:'976px',
      xl:'1440px'

    },
    extend: {
      colors:{
        dblue: "#004F98",
        Red: "#F8444F",
        cream: "#FBF3F2",
        darkBlue:'#161B40',
        lightBlue:'#43BEE5',
        pinkRed:'#F40058',
        musYellow:'#EFA500',
        goodGreen:'#41B853',
        blueP:'#9615DB',
        ggray:'#2D3032',
        lgray:'#D2D3D3',
        lgray2:'#7D7F80',
        gray3: '#dedede'
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}