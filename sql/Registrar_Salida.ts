import AsyncStorage from "@react-native-async-storage/async-storage";
import ipconfig from "./ipconfig";

interface InsumoSalida {
  id_insumo: number;

  salida: boolean;

  observacion: string;
}

interface DatosSalida {
  num_doc: number;

  observacion: string;

  insumos: InsumoSalida[];
}

const registrarSalida = async (datos: DatosSalida) => {
  try {
    const token = await AsyncStorage.getItem("token");

    const respuesta = await fetch(
      `${ipconfig}guarda/registro_salida`,

      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(datos),
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

export default registrarSalida;
