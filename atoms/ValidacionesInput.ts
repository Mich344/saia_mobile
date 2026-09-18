// Estados de colores para los inputs

export const BorderInputState = (value: string) => {
  const validar = value.trim() === "";
  let borderColor = validar ? "border-red-500" : "border-green-500";

  return { validar, borderColor };
};
