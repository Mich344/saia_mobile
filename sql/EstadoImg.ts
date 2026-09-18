import AsyncStorage from "@react-native-async-storage/async-storage";
import ipconfig from "./ipconfig";

const cambiarEstadoInsumo = async (id: number, estado: number) => {
  try {
    const token = await AsyncStorage.getItem("token");

    const respuesta = await fetch(`${ipconfig}insumo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        estado,
      }),
    });

    const data = await respuesta.json();

    return {
      ok: respuesta.ok,
      status: respuesta.status,
      data,
    };
  } catch (error) {
    console.log("ERROR CAMBIANDO ESTADO:", error);

    return {
      ok: false,
      status: 500,
      data: {
        mensaje: "No se pudo conectar con el servidor",
      },
    };
  }
};

export default cambiarEstadoInsumo;
