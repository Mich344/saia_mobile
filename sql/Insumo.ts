import AsyncStorage from "@react-native-async-storage/async-storage";
import ipconfig from "./ipconfig";

const RegistrarInsumo = async (formData: FormData) => {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      return {
        ok: false,
        status: 401,
        data: {
          mensaje: "No existe una sesión iniciada.",
        },
      };
    }

    const respuesta = await fetch(`${ipconfig}insumo`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await respuesta.json();

    return {
      ok: respuesta.ok,
      status: respuesta.status,
      data,
    };
  }catch (error) {
  console.error("ERROR REGISTRAR INSUMO:", error);

  return {
    ok: false,
    status: 500,
    data: {
      mensaje: "No se pudo conectar al servidor",
    },
  };
}
};

export default RegistrarInsumo;