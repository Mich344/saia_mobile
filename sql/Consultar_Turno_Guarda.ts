import AsyncStorage from "@react-native-async-storage/async-storage";
import ipconfig from "./ipconfig";

const consultarTurnoGuarda = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    const respuesta = await fetch(`${ipconfig}guarda/turno/activo`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await respuesta.json();

    return {
      ok: respuesta.ok,
      status: respuesta.status,
      tieneTurno: data.tieneTurno,
      turno: data.turno,
      data,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      status: 500,
      tieneTurno: false,
      data: {
        mensaje: "No fue posible conectar con el servidor.",
      },
    };
  }
};

export default consultarTurnoGuarda;
