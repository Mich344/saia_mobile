/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        complement: "#71B030", // Color complementario del SENA (Verde)
        black: "#000000", // Color Negro textual
        card_select: "#FF0000", // Color de alertas
        background: "#F5F5F6", // Color de fondo mobile
        white: "#FFFFFF", // Color Blanco Texual
        // selection_card: "", // Seleccion de tarjeta
      },
      fontFamily: {
        calibri: ["Calibri_Regular"],
        calibriBold: ["Calibri_Bold"],
        calibriItalic: ["Calibri_Italic"],
        calibriBoldItalic: ["Calibri_BoldRegular"],
      },
    },
  },
  plugins: [],
};
