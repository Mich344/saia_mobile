import AsyncStorage from "@react-native-async-storage/async-storage";
import ipconfig from "./ipconfig";

export interface RechazarIngresoProps {
  num_doc?: number | string | null;
  nombre_persona?: string;
  motivo: string;
}

export default async function rechazarIngreso({
  num_doc,
  nombre_persona,
  motivo,
}: RechazarIngresoProps) {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      return {
        ok: false,
        data: {
          mensaje: "No se encontró el token.",
        },
      };
    }

    const url = `${ipconfig}rechazoIngreso`;

    console.log("=================================");
    console.log("🚨 RECHAZO INGRESO");
    console.log("URL:", url);
    console.log("TOKEN EXISTE:", !!token);
    console.log("NUM_DOC:", num_doc);
    console.log("NOMBRE_PERSONA:", nombre_persona);
    console.log("MOTIVO:", motivo);
    console.log("=================================");

    const respuesta = await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        num_doc,
        nombre_persona,
        motivo,
      }),
    });

    console.log("STATUS:", respuesta.status);
    console.log("OK:", respuesta.ok);

    const texto = await respuesta.text();

    console.log("RESPUESTA RAW:");
    console.log(texto);

    let data;

    try {
      data = JSON.parse(texto);
    } catch (error) {
      console.log("❌ LA RESPUESTA DEL SERVIDOR NO ES JSON");

      return {
        ok: false,
        status: respuesta.status,
        data: {
          mensaje:
            `El servidor respondió algo inesperado. ` +
            `Status: ${respuesta.status}`,
        },
      };
    }

    return {
      ok: respuesta.ok,
      status: respuesta.status,
      data,
    };
  } catch (error) {
    console.log("ERROR RECHAZAR INGRESO:", error);

    return {
      ok: false,
      data: {
        mensaje: "No fue posible conectar con el servidor.",
      },
    };
  }
}