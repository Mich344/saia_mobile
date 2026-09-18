    import AsyncStorage from "@react-native-async-storage/async-storage";
    import ipconfig from "./ipconfig";

    const consultarPerfil = async () => {
    try {
        const token = await AsyncStorage.getItem("token");

        const respuesta = await fetch(`${ipconfig}consultarPerfil`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
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

    export default consultarPerfil;