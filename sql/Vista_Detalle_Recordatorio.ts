import AsyncStorage from "@react-native-async-storage/async-storage";
import ipconfig from "./ipconfig";

export default async function Vista_Detalle_Recordatorio(id: number) {
  try {
    const token = await AsyncStorage.getItem("token");

    const respuesta = await fetch(`${ipconfig}recordatorio/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await respuesta.json();

    return {
      ok: respuesta.ok,
      data,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      data: {
        mensaje: "No fue posible conectar con el servidor.",
      },
    };
  }
}