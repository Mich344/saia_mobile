import ipconfig from "./ipconfig";

interface RegistroPersona {
  num_doc: string;
  tip_doc: string;
  nombres: string;
  p_ape: string;
  s_ape?: string;
  tel: string;
  tip_sang: string;
  sexo?: string;
  fecha_nac: string;
  email: string;
  password: string;
  fecha_creacion: string;
  id_rol: number;
}

const registrarUsuario = async (datos: RegistroPersona) => {
  try {
    const respuesta = await fetch( `${ipconfig}registrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });
    const errorFech = await respuesta.json();
    return {
      ok: respuesta.ok,
      status: respuesta.status,
      errorFech,
    };
  } catch (error) {
    console.error(error)
    return{
        ok: false,
        status: 500,
        errorFech: {
            mensaje: "No se pudo conectar el servidor"
        }
    }
  }
};

export default registrarUsuario;
