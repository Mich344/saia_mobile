import { Background } from "@react-navigation/elements";

const cssPersonalizado = {
  // Especialmente creado para crear CSS unico para algun componenten, solo usar en ocasiones que tengas problemas con tailwind o nativewind.
    colorPrincipal: {
    backgroundColor: "#42EDB5",
  },

  //Sombra difuminada suave porque no da mas esta porqueria
  sombraDifuminada: {
    backgroundColor: "#fff",

    //iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,

    //Android
    elevation: 8,
  },

  //sombra mas fuerte
  sombraFuerte: {
    backgroundColor: "#fff",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,

    elevation: 12,
  },

  //sombra negra centrada
  sombraNegra: {
    backgroundColor: "#fff",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,

    elevation: 15,
  },
};

export default cssPersonalizado;