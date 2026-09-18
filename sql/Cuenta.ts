import ipconfig from "./ipconfig";

interface Cuenta {
  num_doc: string;
  password: string;
  id_rol: number;
}

const registrarCuenta = async (datos: Cuenta) => {
  try {
    const respuesta = await fetch(
      `${ipconfig}cuenta`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      }
    );

    const data = await respuesta.json();

    return {
      ok: respuesta.ok,
      status: respuesta.status,
      data,
    };

  } catch (error) {
    return {
      ok: false,
      status: 500,
      data: {
        mensaje: "No se pudo conectar al servidor"
      }
    };
  }
};

export default registrarCuenta;