import AsyncStorage from "@react-native-async-storage/async-storage";
import ipconfig from "./ipconfig";

const consultarEstadoMovimiento = async (num_doc: string) => {
  try {
    const token = await AsyncStorage.getItem("token");

    const respuesta = await fetch(
      `${ipconfig}guarda/estadoMovimiento/${num_doc}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await respuesta.json();

    return {
      ok: respuesta.ok,
      status: respuesta.status,
      tieneIngreso: data.tieneIngreso,
      data,
    };

  } catch (error) {
    console.log(error);

    return {
      ok: false,
      status: 500,
      tieneIngreso: false,
      data: {
        mensaje: "No se pudo conectar con el servidor.",
      },
    };
  }
};

export default consultarEstadoMovimiento;