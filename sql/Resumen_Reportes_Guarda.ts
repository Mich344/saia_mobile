import AsyncStorage from "@react-native-async-storage/async-storage";
import ipconfig from "./ipconfig";

const consultarDashboardGuarda = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      return {
        ok: false,
        data: {
          mensaje: "No se encontró el token.",
        },
      };
    }

    const url = `${ipconfig}estadoMovimientoGuarda`;

    console.log("=================================");
    console.log("📊 CONSULTANDO DASHBOARD GUARDA");
    console.log("🌐 URL:", url);
    console.log("🔑 TOKEN:", !!token);
    console.log("=================================");

    const respuesta = await fetch(url, {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("STATUS DASHBOARD:", respuesta.status);

    const data = await respuesta.json();

    console.log("=================================");
    console.log("📊 RESPUESTA DASHBOARD GUARDA");
    console.log(JSON.stringify(data, null, 2));
    console.log("=================================");

    if (!respuesta.ok) {
      return {
        ok: false,
        data,
      };
    }

    return {
      ok: true,
      data,
    };
  } catch (error) {
    console.log("ERROR DASHBOARD GUARDA:", error);

    return {
      ok: false,
      data: {
        mensaje: "No fue posible consultar el dashboard.",
      },
    };
  }
};

export default consultarDashboardGuarda;