import AsyncStorage from "@react-native-async-storage/async-storage";
import ipconfig from "./ipconfig";

const consultarInsumo = async (id: string) => {
    const token = await AsyncStorage.getItem("token");

    const respuesta = await fetch(
        `${ipconfig}insumo/${id}`,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );

    const data = await respuesta.json();

    return {
        ok: respuesta.ok,
        data
    };
}

export default consultarInsumo;