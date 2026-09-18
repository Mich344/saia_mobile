import AsyncStorage from "@react-native-async-storage/async-storage";
import ipconfig from "./ipconfig";

const consultarDetalleMovimiento = async (
  id: number,
  tipo: "INGRESO" | "SALIDA" = "INGRESO"
) => {

  try {

    const token = await AsyncStorage.getItem("token");

    console.log("======================================");
    console.log("🔥 CONSULTANDO DETALLE");
    console.log("ID:", id);
    console.log("TIPO:", tipo);
    console.log(
      "URL:",
      `${ipconfig}movimientos/${id}?tipo=${tipo}`
    );
    console.log("======================================");


    const respuesta = await fetch(
      `${ipconfig}movimientos/${id}?tipo=${tipo}`,
      {
        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );


    console.log("🔥 STATUS DETALLE:", respuesta.status);


    const data = await respuesta.json();


    console.log("🔥 DATA DETALLE:", data);


    return {

      ok: respuesta.ok,

      status: respuesta.status,

      movimiento: data.movimiento || null,

      insumos: data.insumos || [],

      aprendiz: data.aprendiz,

      guarda: data.guarda,

      data,

    };


  } catch (error) {

    console.log("🔥 ERROR CONSULTANDO DETALLE:", error);


    return {

      ok: false,

      status: 500,

      movimiento: null,

      insumos: [],

      aprendiz: null,

      guarda: null,

      data: null,

    };

  }

};


export default consultarDetalleMovimiento;