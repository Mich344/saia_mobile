import AsyncStorage from "@react-native-async-storage/async-storage";
import ipconfig from "./ipconfig";

export default async function Vista_Recordatorio() {

  try {

    const token = await AsyncStorage.getItem("token");

    const respuesta = await fetch(`${ipconfig}recordatorio`, {

      headers: {
        Authorization: `Bearer ${token}`,
      },

    });

    const data = await respuesta.json();

    console.log(data);

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