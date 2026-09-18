import AsyncStorage from "@react-native-async-storage/async-storage";
import ipconfig from "./ipconfig";

const finalizarTurnoGuarda = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    const respuesta = await fetch(
      `${ipconfig}guarda/turno/finalizarTurno`,

      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`,

          "Content-Type": "application/json",
        },
      },
    );

    const data = await respuesta.json();

    return {
      ok: respuesta.ok,

      status: respuesta.status,

      data,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,

      status: 500,

      data: {
        mensaje: "No fue posible conectar con el servidor.",
      },
    };
  }
};

export default finalizarTurnoGuarda;
