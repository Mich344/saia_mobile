import AsyncStorage from "@react-native-async-storage/async-storage";
import ipconfig from "./ipconfig";

interface Recordatorio {
  titulo: string;
  descripcion: string;
  fecha_limite: string | null;
  hora_limite?: string | null;
  prioridad: number;
  url?: string;
}

const Crear_Recordatorio = async (recordatorio: Recordatorio) => {
  try {
    const token = await AsyncStorage.getItem("token");

    const respuesta = await fetch(`${ipconfig}recordatorio`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(recordatorio),
    });
const texto = await respuesta.text();

console.log(texto);

return {
    ok: respuesta.ok,
    data: texto,
};
    // const data = await respuesta.json();

    // return {
    //   ok: respuesta.ok,
    //   status: respuesta.status,
    //   data,
    // };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      status: 500,
      data: {
        mensaje: "No se pudo conectar con el servidor.",
      },
    };
  }
};

export default Crear_Recordatorio;