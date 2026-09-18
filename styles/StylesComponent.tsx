// StylesComponent.tsx
// Solo contiene estilos que Tailwind/NativeWind no puede expresar:
// sombras, overflow+borderRadius combinados, posición absoluta, valores dinámicos.
// Para colores usa siempre los tokens de tailwind.config.js

const cssPersonalizado = {

  // ── Tamaños del botón ──────────────────────────────────────────────────
  sizeStylesButton: {
    lg: { width: 246, height: 60, fontSize: 18, borderRadius: 25 },
    sm: { width: 130, height: 45, fontSize: 15, borderRadius: 25 },
  },

  // ── Sombras reutilizables ──────────────────────────────────────────────

  // Sombra suave para tarjetas
  cardShadow: {
    // backgroundColor: "#fff",
    // shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },

  // Sombra pronunciada (avatar, imagen circular)
  sombraNegra: {
    // backgroundColor: "#fff",
    // shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },

  // Sombra difuminada suave (imagen dentro del anillo)
  sombraDifuminada: {
    padding: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 1,
  },

  // ── Inputs ────────────────────────────────────────────────────────────

  // Margen del ícono izquierdo en todos los inputs
  inputIconMargin: {
    marginRight: 10,
  },

  // Sombra del dropdown de InputOption
  inputOptionDropdown: {
    marginTop: 3,
    elevation: 6,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 7 },
  },

  // Texto del trigger de InputOption (lineHeight para igualar altura con TextInput)
  inputOptionText: {
    lineHeight: 24,
    paddingVertical: 2,
  },

  // ── Ícono de cámara (ImagenSelector modo default) ─────────────────────
  iconoShadowStyle: {
    backgroundColor: "#F5F5F6",
    borderRadius: 999,
    padding: 6,
    bottom: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  // ── ImagenSelector modo upload ────────────────────────────────────────
  imagenSelectorUpload: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    alignItems: "center" as const,
    justifyContent: "flex-start" as const,
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 8,
    overflow: "hidden" as const,
  },

  // ── Banner informativo (cambiarPass) ──────────────────────────────────
  infoBanner: {
    borderWidth: 1,
    borderColor: "#C2F0E4",
    borderRadius: 16,
  },

  // ── Perfil — carnet ───────────────────────────────────────────────────

  perfil: {
    // Tarjeta exterior: sombra (overflow:hidden en cardInner)
    cardShadow: {
      borderRadius: 25,
      backgroundColor: "white",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.13,
      shadowRadius: 14,
      elevation: 3,
      marginBottom: 4,
    },

    // Tarjeta interior: clip de contenido
    cardInner: {
      borderRadius: 24,
      overflow: "hidden" as const,
      backgroundColor: "white",
    },

    // Zona blanca superior (logo SENA)
    cardHeaderGradient: {
      backgroundColor: "white",
    },

    // Zona teal rectangular debajo del logo
    cardWaveZone: {
      height: 100,
      justifyContent: "flex-start" as const,
    },

    // Logo SENA
    senaLogo: {
      width: 52,
      height: 52,
    },

    // Contenedor del avatar (sobresale sobre la zona teal)
    avatarWrapper: {
      alignItems: "center" as const,
      marginTop: 10,
      zIndex: 10,
    },

    // Anillo exterior teal claro
    avatarRingOuter: {
      borderRadius: 999,
      padding: 2,
      backgroundColor: "green",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 2,
    },

    // Anillo interior blanco
    avatarRingInner: {
      borderRadius: 999,
      padding: 2,
      backgroundColor: "white",
    },

    // Imagen del avatar
    avatar: {
      width: 104,
      height: 104,
      borderRadius: 999,
    },

    // Contenedor del SVG del rol
    rolSvg: {
      marginTop: 2,
    },

    // Ícono de campo: círculo verde claro
    iconCircle: {
      width: 42,
      height: 42,
      borderRadius: 999,
      backgroundColor: "#DFF8F1",
      alignItems: "center" as const,
      justifyContent: "center" as const,
      marginRight: 12,
      flexShrink: 0 as const,
    },

    // Tarjeta QR
    qrCard: {
      borderRadius: 18,
      padding: 14,
      flexDirection: "row" as const,
      alignItems: "center" as const,
    },

    // Imagen QR
    qrImage: {
      width: 76,
      height: 76,
      borderRadius: 6,
    },
  },
};

export default cssPersonalizado;
