import AsyncStorage from "@react-native-async-storage/async-storage";
import ipconfig from "./ipconfig";

const consultarMovimientos = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log("======================================");
    console.log("🔥 VOY A CONSULTAR MOVIMIENTOS");
    console.log("URL:", `${ipconfig}movimientos`);
    console.log("======================================");
    const respuesta = await fetch(
      `${ipconfig}movimientos`,

      {
        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
console.log("🔥 RESPUESTA MOVIMIENTOS:", respuesta.status);
    const data = await respuesta.json();
 console.log("🔥 DATA MOVIMIENTOS:", data);
    return {
      ok: respuesta.ok,

      status: respuesta.status,

      movimientos: data.movimientos || [],

      data,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,

      status: 500,

      movimientos: [],

      data: null,
    };
  }
};

export default consultarMovimientos;
