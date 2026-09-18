const modales = {
  documentoInvalido: {
    titulo: "Documento inválido",
    descripcion: "El documento debe contener entre 6 y 15 números.",
    textButton: "Continuar",
    imagen: require("@/img/exclamacion.png"),
  },
  nombreInvalido: {
    titulo: "Nombre inválido",
    descripcion: "El nombre debe tener mínimo 3 letras.",
    textButton: "Continuar",
    imagen: require("@/img/exclamacion.png"),
  },
  apellidoInvalido: {
    titulo: "Apellido inválido",
    descripcion: "El apellido debe tener mínimo 3 letras.",
    textButton: "Continuar",
    imagen: require("@/img/exclamacion.png"),
  },
  telefonoInvalido: {
    titulo: "Teléfono inválido",
    descripcion: "Debe contener exactamente 10 dígitos.",
    textButton: "Continuar",
    imagen: require("@/img/telefono.png"),
  },

  passwordInvalida: {
    titulo: "Contraseña insegura",
    descripcion: "Debe contener al menos 8 caracteres.",
    textButton: "Continuar",
    imagen: require("@/img/alerta.png"),
  },
  vacios: {
    titulo: "Campos Imcompletos",
    descripcion:
      "Ups! parece que dejaste campos sin rellenar, llena los campos que tienen (*) son obligatorias para el registro ",
    textButton: "Completar Registro",
    imagen: require("@/img/caution.png"),
  },
  error: {
    titulo: "Error al Crear Cuenta",
    descripcion:
      "Reintenta de nuevo el registro ha sucedio un fallo en la acción.",
    textButton: "Continuar",
    imagen: require("@/img/caution.png"),
  },
  usuarioExistente: {
    titulo: "Ya existe una cuenta",
    descripcion: "Los datos ingresados ya tienen una cuenta creada",
    textButton: "Continuar",
    imagen: require("@/img/left_arrow.png"),
  },
  contraseñaIncorrecta: {
    titulo: "Contraseña Incorrecta",
    descripcion: "la contraseña no coincide por favor intenta nuevamente.",
    textButton: "Continuar ",
    imagen: require("@/img/alerta.png"),
  },
  usuarioExitoso: {
    titulo: "Usuario Creado Exitosamente",
    descripcion:
      "Vuelve al inicio e ingresa tus datos para el inicio de sesión",
    textButton: "inicio",
    imagen: require("@/img/true_correct.png"),
  },
  emailFalse: {
    titulo: "Correo identificable",
    descripcion: "Parece que tu dato ingresado no es un correo valido.",
    textButton: "Corregir Campo",
    imagen: require("@/img/falso.png"),
  },
  menorEdad: {
    titulo: "No es Posible Crear el Registro",
    descripcion: "No cumples con la edad necesaria para poder crear un registro en SAIA.",
    textButton: "Entendido",
    imagen: require("@/img/caution.png"),
  },
};

export default modales;
