import { useState } from "react";
import { validarPaso1, validarPaso2, FormularioState, FormularioKey } from "@/hooks/utils/validacion_Registro_SAIA";
import themeModal from "@/atoms/MensajeModal";
import condicional from "@/atoms/Condicionales";
import registrarUsuario from "@/sql/Registrar";

export const useRegistroForm = () => {
  const [paso, setPaso] = useState(1);
  const [error, setError] = useState<Record<string, boolean>>({});
  const [modalMsg, setModalMsg] = useState<any>(null);

  const [formulario, setFormulario] = useState<FormularioState>({
    num_doc: "",
    nombres: "",
    p_ape: "",
    tel: "",
    email: "",
    tip_doc: "",
    tip_sang: "",
    sexo: "",
    fecha_nac: "",
    password: "",
    confirmarPassword: "",
    fecha_creacion: "",
  });

  const password = formulario.password;
  const cumple8 = password.length >= 8;
  const cumpleMayuscula = /[A-Z]/.test(password);
  const cumpleNumero = /\d/.test(password);
  const cumpleEspecial = /[!@#$%^&*(),.?":{}|<>_\-+=/\\[\];'`~]/.test(password);
  const coincide =
    formulario.confirmarPassword.length > 0 &&
    formulario.password === formulario.confirmarPassword;

  const siguientePaso = () => {
    if (paso === 1) {
      const res = validarPaso1(formulario);
      if (!res.valido) {
        setError((prev) => ({ ...prev, ...res.errores }));
        setModalMsg(res.modalMsg);
        return;
      }
    }

    if (paso === 2) {
      const res = validarPaso2(formulario);
      if (!res.valido) {
        setError((prev) => ({ ...prev, ...res.errores }));
        setModalMsg(res.modalMsg);
        return;
      }
    }

    setPaso((prev) => prev + 1);
  };

  const anteriorPaso = () => setPaso((prev) => prev - 1);

  // AQUÍ: Se define exactamente como FormularioKey
  const actualizarFormulario = (campo: FormularioKey, valor: string) => {
    setError((prev) => ({ ...prev, [campo]: false }));
    setFormulario((prev) => ({ ...prev, [campo]: valor }));
  };

  const enviarRegistro = async () => {
    if (!cumple8 || !cumpleMayuscula || !cumpleNumero || !cumpleEspecial) {
      setModalMsg({
        titulo: "Contraseña poco segura",
        descripcion: "Tu contraseña no cumple con todos los requisitos mínimos de seguridad.",
        textButton: "Revisar",
      });
      return;
    }

    if (!coincide) {
      setModalMsg({
        titulo: "Contraseñas no coinciden",
        descripcion: "La confirmación de la contraseña no coincide con la contraseña ingresada.",
        textButton: "Corregir",
      });
      return;
    }

    const errorEncontrado = condicional(formulario);
    if (errorEncontrado) {
      setModalMsg(themeModal[errorEncontrado.tipo as keyof typeof themeModal]);
      return;
    }

    try {
      const registroUsuario = await registrarUsuario({
        ...formulario,
        fecha_creacion: new Date().toISOString(),
        id_rol: 1,
      });

      if (!registroUsuario.ok) {
        setModalMsg(themeModal.error);
        return;
      }

      setModalMsg(themeModal.usuarioExitoso);
    } catch {
      setModalMsg(themeModal.error);
    }
  };

  return {
    paso,
    formulario,
    error,
    modalMsg,
    setModalMsg,
    cumple8,
    cumpleMayuscula,
    cumpleNumero,
    cumpleEspecial,
    coincide,
    actualizarFormulario,
    siguientePaso,
    anteriorPaso,
    enviarRegistro,
  };
};