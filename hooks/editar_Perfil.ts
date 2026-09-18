import { useState, useEffect } from "react";
import { router } from "expo-router";
import ipconfig from "@/sql/ipconfig";
import { useEditarUsuario } from "@/atoms/DatosAprendiz";
import actualizarPerfil from "@/sql/Editar_Perfil";
import consultarPerfil from "@/sql/Consultar_Datos_Perfil_Aprendiz";

export interface ArchivoImagen {
  uri: string;
  name: string;
  type: string;
}

export interface ModalAlertaState {
  visible: boolean;
  titulo: string;
  mensaje: string;
  tipo: "exito" | "error" | "advertencia" | "info";
  onAceptar?: () => void;
}

export const useEditarPerfilState = () => {
  const [imagen, setImagen] = useState<ArchivoImagen | null>(null);
  const [imagenActual, setImagenActual] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  // Estado unificado para el Modal de Alerta
  const [modalAlerta, setModalAlerta] = useState<ModalAlertaState>({
    visible: false,
    titulo: "",
    mensaje: "",
    tipo: "info",
  });

  const {
    numDoc,
    setNumDoc,
    nombre,
    setNombre,
    documento,
    setDocumento,
    celular,
    setCelular,
    correo,
    setCorreo,
    sangre,
    setSangre,
    genero,
    setGenero,
  } = useEditarUsuario();

  const cerrarAlerta = () => {
    const callback = modalAlerta.onAceptar;
    setModalAlerta((prev) => ({ ...prev, visible: false }));
    if (callback) callback();
  };

  const mostrarAlerta = (
    titulo: string,
    mensaje: string,
    tipo: "exito" | "error" | "advertencia" | "info" = "info",
    onAceptar?: () => void
  ) => {
    setModalAlerta({
      visible: true,
      titulo,
      mensaje,
      tipo,
      onAceptar,
    });
  };

  const obtenerUrlImagen = (ruta: string | null) => {
    if (!ruta) return null;
    if (ruta.startsWith("http://") || ruta.startsWith("https://")) return ruta;

    const base = ipconfig.endsWith("/") ? ipconfig.slice(0, -1) : ipconfig;
    const path = ruta.startsWith("/") ? ruta : `/${ruta}`;
    return `${base}${path}`;
  };

  const cargarPerfil = async () => {
    try {
      const respuesta = await consultarPerfil();

      if (!respuesta.ok) {
        mostrarAlerta(
          "Error de carga",
          respuesta.data?.mensaje || "No se pudo cargar la información del perfil.",
          "error"
        );
        return;
      }

      const usuario = respuesta.data?.persona ?? respuesta.data?.usuario;

      if (!usuario) {
        mostrarAlerta("Sin datos", "No se encontraron los datos del usuario.", "advertencia");
        return;
      }

      const rutaImagen = usuario.imagen ?? null;
      setImagenActual(rutaImagen);

      setNombre(
        `${usuario.nombres ?? ""} ${usuario.p_ape ?? ""} ${
          usuario.s_ape ?? ""
        }`.trim()
      );
      setDocumento(usuario.tip_doc ?? "");
      setNumDoc(usuario.num_doc ? usuario.num_doc.toString() : "");
      setCelular(usuario.tel ?? "");
      setCorreo(usuario.email ?? "");
      setSangre(usuario.tip_sang ?? "");
      setGenero(usuario.sexo ?? "");
    } catch (error) {
      console.log("Error cargando perfil:", error);
      mostrarAlerta("Error", "No se pudo conectar con el servidor.", "error");
    }
  };

  useEffect(() => {
    cargarPerfil();
  }, []);

  const editar = async () => {
    setCargando(true);
    try {
      const respuesta = await actualizarPerfil({
        tel: celular,
        email: correo,
        sexo: genero,
        tip_sang: sangre,
        imagen,
      });

      if (!respuesta.ok) {
        mostrarAlerta(
          "Error al actualizar",
          respuesta.data?.mensaje || "No se pudo actualizar el perfil.",
          "error"
        );
        return;
      }

      if (respuesta.data?.imagen) {
        setImagenActual(respuesta.data.imagen);
      }

      setImagen(null);
      mostrarAlerta(
        "¡Actualización Exitosa!",
        respuesta.data?.mensaje || "Tu información de perfil se ha guardado correctamente.",
        "exito",
        () => router.replace("/vistaUsuarioApp/perfil")
      );
    } catch (error) {
      console.log("Error actualizando perfil:", error);
      mostrarAlerta("Error", "Ocurrió un error al actualizar el perfil.", "error");
    } finally {
      setCargando(false);
    }
  };

  return {
    imagen,
    setImagen,
    imagenActual,
    nombre,
    documento,
    numDoc,
    sangre,
    correo,
    setCorreo,
    celular,
    setCelular,
    genero,
    setGenero,
    cargando,
    modalAlerta,
    cerrarAlerta,
    obtenerUrlImagen,
    editar,
  };
};