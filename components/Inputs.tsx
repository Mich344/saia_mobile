import { useState } from "react";
import { TextInput } from "react-native";

// Version 1.0 cambio pendiente (Gestionar si el type es necesario pasarlo a interface para heredar datos a otros componentes TAREA PENDIENTE HIAN.)
type InputProps = {
  placeholder: string;
  value?: string;
};

export default function Input({ placeholder, value }: InputProps) {
  const [alerta, setAlerta] = useState("outline-complement");
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      maxLength={10}
      inputMode="numeric"
      keyboardType="numeric"
      className="rounded-[12px] text-black  p-16 font-calibri shadow-shadow w-auto"
    />
  );
}
