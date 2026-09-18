import ipconfig from "./ipconfig";

interface DatosRecuperacion {
  tip_doc: string;
  num_doc: string;
}

const recuperarPassword = async (datos: DatosRecuperacion) => {
  try {
    const url = `${ipconfig}recuperarContrasena`;

    console.log("📡 URL RECUPERACIÓN:", url);
    console.log("📤 DATOS:", datos);

    const respuesta = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });

    console.log("📥 STATUS:", respuesta.status);
    console.log("📥 STATUS TEXT:", respuesta.statusText);

    const texto = await respuesta.text();

    console.log("📥 RESPUESTA SERVIDOR:", texto);

    let data;

    try {
      data = JSON.parse(texto);
    } catch (error) {
      console.log("❌ LA RESPUESTA NO ES JSON");

      return {
        ok: false,
        status: respuesta.status,
        data: {
          mensaje: `El servidor respondió con un formato inesperado. Código: ${respuesta.status}`,
        },
      };
    }

    return {
      ok: respuesta.ok,
      status: respuesta.status,
      data,
    };
  } catch (error) {
    console.log("❌ ERROR SERVICIO RECUPERACIÓN:", error);

    return {
      ok: false,
      status: 500,
      data: {
        mensaje: "No se pudo conectar con el servidor",
      },
    };
  }
};

export default recuperarPassword;
