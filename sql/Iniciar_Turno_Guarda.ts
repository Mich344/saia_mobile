import AsyncStorage from "@react-native-async-storage/async-storage";
import ipconfig from "./ipconfig";

const iniciarTurnoGuarda = async (turno: string) => {
  try {
    const token = await AsyncStorage.getItem("token");

    const respuesta = await fetch(`${ipconfig}guarda/turno/iniciarTurno`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        turno,
      }),
    });

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

export default iniciarTurnoGuarda;
