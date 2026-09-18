import AsyncStorage from "@react-native-async-storage/async-storage";
import ipconfig from "./ipconfig";

interface ImagenPerfil {
  uri: string;
  name: string;
  type: string;
}

interface ActualizarPerfil {
  tel: string;
  email: string;
  sexo: string;
  tip_sang: string;
  imagen?: ImagenPerfil | null;
}

const actualizarPerfil = async ({
  tel,
  email,
  sexo,
  tip_sang,
  imagen,
}: ActualizarPerfil) => {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      return {
        ok: false,
        status: 401,
        data: {
          mensaje: "La sesión ha expirado.",
        },
      };
    }

    const formData = new FormData();

    formData.append("tel", tel);
    formData.append("email", email);
    formData.append("sexo", sexo);
    formData.append("tip_sang", tip_sang);

    // ==========================================
    // IMAGEN
    // ==========================================

    if (imagen) {
      console.log("🖼️ ENVIANDO IMAGEN:");
      console.log({
        uri: imagen.uri,
        name: imagen.name,
        type: imagen.type,
      });

      formData.append("imagen", {
        uri: imagen.uri,
        name: imagen.name,
        type: imagen.type,
      } as any);
    } else {
      console.log("🖼️ NO SE SELECCIONÓ UNA NUEVA IMAGEN");
    }

    // ==========================================
    // ACTUALIZAR PERFIL
    // ==========================================

    const respuesta = await fetch(`${ipconfig}perfil`, {
      method: "PUT",

      headers: {
        Authorization: `Bearer ${token}`,
      },

      body: formData,
    });

    const data = await respuesta.json();

    console.log("🔥 RESPUESTA ACTUALIZAR PERFIL:");
    console.log(data);

    return {
      ok: respuesta.ok,
      status: respuesta.status,
      data,
    };
  } catch (error) {
    console.log("🔥 ERROR ACTUALIZANDO PERFIL:");
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

export default actualizarPerfil;