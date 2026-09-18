import ipconfig from "./ipconfig";

interface RegistroPersona {
  num_doc: string;
  tip_doc: string;
  password: string;
}

const loginUser = async (datos: RegistroPersona) => {
  try {
    console.log("================================");
    console.log("🔥 ENTRANDO A LOGIN.TS");
    console.log("🔥 URL:", `${ipconfig}login`);
    console.log("🔥 DATOS:", datos);
    console.log("================================");

    const respuesta = await fetch(`${ipconfig}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });

    console.log("🔥 FETCH RESPONDIÓ");
    console.log("🔥 STATUS:", respuesta.status);

    const data = await respuesta.json();

    console.log("🔥 DATA LOGIN:", data);

    return {
      ok: respuesta.ok,
      status: respuesta.status,
      data,
    };
  } catch (error) {
    console.log("🔥🔥 ERROR LOGIN.TS 🔥🔥");
    console.log(error);

    return {
      ok: false,
      status: 500,
      errorFetch: {
        mensaje: "No se pudo conectar el servidor",
      },
    };
  }
};

export default loginUser;