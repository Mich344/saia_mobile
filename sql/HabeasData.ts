import AsyncStorage from "@react-native-async-storage/async-storage";
import ipconfig from "./ipconfig";

interface HabeasDataBody {
  num_doc: string;
  aceptado: boolean;
}

/**
 * Registrar o actualizar el estado de Habeas Data
 */
export const registrarHabeasData = async (datos: HabeasDataBody) => {
  try {
    // Normalizar la URL asegurando que exista la barra de separación '/'
    const baseUrl = ipconfig.endsWith("/") ? ipconfig : `${ipconfig}/`;
    const urlFinal = `${baseUrl}habeasdata`;

    console.log("Enviando petición Habeas Data a:", urlFinal, datos);

    const respuesta = await fetch(urlFinal, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });

    const data = await respuesta.json();
    console.log("Respuesta del servidor Habeas Data:", data);

    return {
      ok: respuesta.ok,
      status: respuesta.status,
      data,
    };
  } catch (error) {
    console.error("Error de red/fetch al registrar Habeas Data:", error);
    return {
      ok: false,
      status: 500,
      data: {
        mensaje: "No se pudo conectar con el servidor. Revisa la conexión de red.",
      },
    };
  }
};

/**
 * Consultar si un usuario ya aceptó el Habeas Data por su documento
 */
export const consultarHabeasData = async (num_doc: string) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const baseUrl = ipconfig.endsWith("/") ? ipconfig : `${ipconfig}/`;

    const respuesta = await fetch(`${baseUrl}habeasdata/${num_doc}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await respuesta.json();

    return {
      ok: respuesta.ok,
      status: respuesta.status,
      data,
    };
  } catch (error) {
    console.error("Error al consultar Habeas Data:", error);
    return {
      ok: false,
      status: 500,
      data: {
        mensaje: "No se pudo conectar con el servidor.",
      },
    };
  }
};