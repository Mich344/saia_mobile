import AsyncStorage from "@react-native-async-storage/async-storage";
import ipconfig from "./ipconfig";

const obtenerInsumos = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      return {
        ok: false,
        data: {
          mensaje: "No existe una sesión iniciada.",
        },
      };
    }

    const respuesta = await fetch(`${ipconfig}insumo`, {
      method: "GET",
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
        mensaje: "No se pudo conectar al servidor",
      },
    };
  }
};

export default obtenerInsumos;