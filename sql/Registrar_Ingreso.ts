import AsyncStorage from "@react-native-async-storage/async-storage";
import ipconfig from "./ipconfig";

interface RegistrarIngresoProps {
  num_doc: number;
  observacion?: string;
}

export default async function registrarIngreso({
  num_doc,
  observacion,
}: RegistrarIngresoProps) {
  try {
    const token = await AsyncStorage.getItem("token");

    const respuesta = await fetch(
      `${ipconfig}historial_ingreso`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          num_doc,
          observacion,
        }),
      }
    );

    const data = await respuesta.json();

    return {
      ok: respuesta.ok,
      data,
    };
  } catch (error) {
    console.log("ERROR REGISTRAR INGRESO:");
  console.log(error);

    return {
      ok: false,
      data: {
        mensaje: "No fue posible coneaaaaaactar con el servidor.",
      },
    };
  }
}