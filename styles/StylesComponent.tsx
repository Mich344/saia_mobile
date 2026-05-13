import { Background } from "@react-navigation/elements";


const cssPersonalizado = {
  // Especialmente creado para crear CSS unico para algun componenten, solo usar en ocasiones que tengas problemas con tailwind o nativewind.
  colorPrincipal: {
    backgroundColor: "#42EDB5",
  },

  //estilos segun tamaño del boton
  sizeStylesButton: {
    lg: {
      width: 246,
      height: 60,
      fontSize: 18,
      borderRadius: 25,
    },
    sm: {
      width: 174,
      height: 36,
      fontSize: 15,
      borderRadius: 25,
    },
  },


  //icono personalizado para la camara en editar perfil
  iconoShadowStyle: {
    backgroundColor: "#F5F5F6",
    borderRadius: 999,
    padding: 6,
    bottom: 35,

    //IOS sombra icono
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    //Android
    elevation: 5,
  },

  //Sombra difuminada suave porque no da mas esta porqueria
  sombraDifuminada: {
    padding: 6,
    right: 0,

    // sombra icono
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
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