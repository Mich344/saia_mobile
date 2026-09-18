export interface FormularioState {
  num_doc: string;
  nombres: string;
  p_ape: string;
  tel: string;
  email: string;
  tip_doc: string;
  tip_sang: string;
  sexo: string;
  fecha_nac: string;
  password: string;
  confirmarPassword: string;
  fecha_creacion: string;
}

export type FormularioKey = keyof FormularioState;

export const validarPaso1 = (formulario: FormularioState) => {
  const errores = {
    tip_doc: formulario.tip_doc.trim() === "",
    num_doc: formulario.num_doc.trim() === "",
    nombres: formulario.nombres.trim() === "",
    p_ape: formulario.p_ape.trim() === "",
  };

  if (Object.values(errores).some((v) => v)) {
    return {
      valido: false,
      errores,
      modalMsg: {
        titulo: "Campos incompletos",
        descripcion: "Por favor rellenar todos los campos antes de continuar.",
        textButton: "Entendido",
      },
    };
  }

  if (formulario.num_doc.trim().length < 6) {
    return {
      valido: false,
      errores: { ...errores, num_doc: true },
      modalMsg: {
        titulo: "Documento incompleto",
        descripcion: "El número de documento debe tener al menos 6 dígitos.",
        textButton: "Corregir",
      },
    };
  }

  return { valido: true, errores: {} };
};

export const validarPaso2 = (formulario: FormularioState) => {
  const errores = {
    fecha_nac: formulario.fecha_nac.trim() === "",
    tip_sang: formulario.tip_sang.trim() === "",
    email: formulario.email.trim() === "",
    tel: formulario.tel.trim() === "",
  };

  if (Object.values(errores).some((v) => v)) {
    return {
      valido: false,
      errores,
      modalMsg: {
        titulo: "Campos incompletos",
        descripcion: "Debes rellenar todos los datos requeridos para avanzar.",
        textButton: "Entendido",
      },
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formulario.email.trim())) {
    return {
      valido: false,
      errores: { ...errores, email: true },
      modalMsg: {
        titulo: "Correo electrónico inválido",
        descripcion: "Por favor ingresa una dirección de correo válida (ejemplo@correo.com).",
        textButton: "Corregir",
      },
    };
  }

  if (formulario.tel.trim().length < 10) {
    return {
      valido: false,
      errores: { ...errores, tel: true },
      modalMsg: {
        titulo: "Número de teléfono inválido",
        descripcion: "El número de teléfono debe tener exactamente 10 dígitos.",
        textButton: "Corregir",
      },
    };
  }

  return { valido: true, errores: {} };
};