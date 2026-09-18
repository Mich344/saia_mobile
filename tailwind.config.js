/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  // Clases que siempre deben generarse aunque el scanner no las detecte
  safelist: [
    "text-teal-sena",    "bg-teal-sena",
    "text-teal-light",   "bg-teal-light",
    "text-complement",   "bg-complement",
    "text-card-select",  "bg-card-select",
    "bg-background",     "text-background",
    "bg-screen-bg",
    "bg-input-bg",       "bg-input-disabled",
    "text-grey-placeholder",
    "text-grey-text",
    "bg-teal-tint-100",  "border-teal-tint-200",
    "bg-teal-tint-300",  "bg-teal-tint-400",
    "border-sombreado-input",
    "bg-divider",
  ],
  theme: {
    extend: {
      colors: {
        // ── Colores principales SAIA ──
        "teal-sena":    "#3DE1B9",   // Color principal teal
        "teal-light":   "#47C5DE",   // Teal secundario (gradientes)
        complement:     "#71B030",   // Verde complementario SENA
        black:          "#000000",
        white:          "#FFFFFF",

        // ── Fondos ──
        background:     "#F5F5F6",   // Fondo general mobile
        "screen-bg":    "#E2EDED",   // Fondo de pantallas

        // ── Inputs ──
        "input-bg":       "#F0F0F0", // Fondo de inputs
        "input-disabled": "#D8D8D8", // Input deshabilitado
        "sombreado-input": "rgb(219 219 219)",

        // ── Textos y placeholders ──
        "grey-placeholder": "#ABABAB", // Placeholder e íconos
        "grey-text":        "#939393", // Texto secundario

        // ── Tints teal (banners, bordes) ──
        "teal-tint-100": "#E6FAF5",  // Fondo banner info
        "teal-tint-200": "#C2F0E4",  // Borde banner info
        "teal-tint-300": "#D0F5EC",  // Fondo ícono en banner
        "teal-tint-400": "#DFF8F1",  // Fondo ícono en campos

        // ── Utilidades ──
        "card-select":  "#FF0000",   // Alertas / errores
        divider:        "#E0E0E0",   // Líneas separadoras
      },
      fontFamily: {
        //TEXTOS
        calibri: ["Calibri_Regular"],
        calibriBold: ["Calibri_Bold"],
        calibriItalic: ["Calibri_Italic"],
        calibriBoldItalic: ["Calibri_BoldRegular"],
        //TITULOS
        WorkSansRegular: ["WorkSans_Regular"],
        WorkSansBold: ["WorkSans_Bold"],
        WorkSansExtraBold: ["WorkSans_ExtraBold"],
        WorkSansMedium: ["WorkSans_Medium"],
        WorkSansSemiBold: ["WorkSans_SemiBold"]
      },
      padding: {
        16: "16px", //Tamaños para los inputs
      },
      width: {
        auto: "auto", //Tamaños para los inputs
      },
      fontWeight: {
        font: "25px",
      },
    },
  },
  plugins: [],
};
