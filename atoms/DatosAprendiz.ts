import { useState } from "react";

export interface PerfilUsuario {
  nombre: string;
  rol: string;
  programa: string;
  tipoDocumento: string;
  numeroDocumento: string;
  tipoSangre: string;
  correo: string;
  centroFormacion: string;
  fechaIngreso: string;
  regional: string;
  sede: string;
  validoHasta: string;
}

export const perfilU: PerfilUsuario = {
  nombre: "Aprendiz_Prueba_Mobil",
  rol: "Aprendiz",
  programa: "Analisis y desarrollo de software",
  tipoDocumento: "Tipo de documento",
  numeroDocumento: "N° de documento",
  tipoSangre: "Tipo de sangre",
  correo: "Correo electrónico",
  centroFormacion: "Centro de formación",
  fechaIngreso: "Fecha de ingrejkjrso",
  regional: "Regional",
  sede: "Sede",
  validoHasta: "DD/MM/AAAA",
};

export const useEditarUsuario = () => {
  const [nombre, setNombre] = useState("");
  const [documento, setDocumento] = useState("");
  const [eps, setEps] = useState("");
  const [celular, setCelular] = useState("");
  const [correo, setCorreo] = useState("");
  const [sangre, setSangre] = useState("");
  const [numDoc, setNumDoc] = useState("");
  const [genero, setGenero] = useState("");

  return {
    numDoc,
    setNumDoc,
    nombre,
    setNombre,
    documento,
    setDocumento,
    eps,
    setEps,
    celular,
    setCelular,
    correo,
    setCorreo,
    sangre,
    setSangre,
    genero,
    setGenero,
  };
};
