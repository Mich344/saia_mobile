import AsyncStorage from "@react-native-async-storage/async-storage";
import ipconfig from "./ipconfig";

const editarInsumo = async (id: string, datos: any) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const formData = new FormData();

    formData.append("nom_insumo", datos.nom_insumo);
    formData.append("marca", datos.marca);
    formData.append("estado", String(datos.estado));
    formData.append("num_serie", datos.num_serie);
    formData.append("desc_insumo", datos.desc_insumo);

    if (datos.imagen) {
      formData.append("imagen", {
        uri: datos.imagen.uri,
        name: datos.imagen.name,
        type: datos.imagen.type,
      } as any);
    }
    const respuesta = await fetch(`${ipconfig}insumo/${id}`, {
      method: "PUT",
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
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      status: 500,
      data: {
        mensaje: "No se pudo conectar con el servidor",
      },
    };
  }
};

export default editarInsumo;
