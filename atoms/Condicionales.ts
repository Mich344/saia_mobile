interface FormularioRegistro {
  num_doc: string;
  nombres: string;
  p_ape: string;
  tel: string;
  email: string;
  password: string;
  fecha_nac: string;
  confirmarPassword: string;
}

const validarRegistro = (formulario: FormularioRegistro) => {


const edadRegistro = (fecha: string) => {
  const dia = new Date();
  const nacimiento = new Date(fecha);
  let edad = dia.getFullYear() - nacimiento.getFullYear();
  let mes = dia.getMonth() - nacimiento.getMonth();
  if (mes < 0 || (mes === 0 && dia.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad >= 16;
};

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const reglas = [
    {
      condicion: !/^\d{6,15}$/.test(formulario.num_doc),
      tipo: "documentoInvalido",
    },
    {
      condicion: !/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{5,}$/.test(formulario.nombres) ,
      tipo: "nombreInvalido",
    },
    {
      condicion: !/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{5,}$/.test(formulario.p_ape),
      tipo: "apellidoInvalido",
    },
    {
      condicion: !/^\d{10}$/.test(formulario.tel),
      tipo: "telefonoInvalido",
    },
    {
      condicion: !emailValido.test(formulario.email),
      tipo: "emailFalse",
    },
    {
      condicion: formulario.password.length < 8,
      tipo: "passwordInvalida",
    },
    {
      condicion: formulario.password !== formulario.confirmarPassword,
      tipo: "contraseñaIncorrecta",
    },
     {
      condicion: !edadRegistro(formulario.fecha_nac),
      tipo: "menorEdad",
    },
  ];

  return reglas.find((r) => r.condicion);
};

export default validarRegistro;