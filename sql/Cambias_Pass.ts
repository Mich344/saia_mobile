import AsyncStorage from "@react-native-async-storage/async-storage";
import ipconfig from "./ipconfig";

interface CambiarPassword {
  passwordActual: string;
  passwordNueva: string;
}

const cambiarPassword = async ({
  passwordActual,
  passwordNueva,
}: CambiarPassword) => {
    
  try {
    
    const token = await AsyncStorage.getItem("token");
console.log("TOKEN:", token);
console.log("URL:", `${ipconfig}perfil/password`);
    const respuesta = await fetch(`${ipconfig}perfil/password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        passwordActual,
        passwordNueva,
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
        mensaje: "No se pudo conectar con el servidor.",
      },
    };
  }
};

export default cambiarPassword;