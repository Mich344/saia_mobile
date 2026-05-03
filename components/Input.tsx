import { useState } from "react";
import React from "react";
import { TextInput } from "react-native";
// import cssPerzonalizado from "@/styles/StylesComponent";

// Se crea una interfaz para heredar propiedades al momento de requerir una clase o otra interfaz con los mismos valores

export interface InputProps {
  placeholder: string;
  value?: string;
  inputMode?: "text" | "numeric" | "email" | "tel";
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

// Input prop visualiza el campo de escritura del usuario con validaciones especificas que retornaran un valor definido al momento de llamar el componente
const Input = ({placeholder,
  value,
  inputMode,
  keyboardType,}:InputProps) => {
  // const [alerta, setAlerta] = useState("outline-complement"); HOOKS
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      maxLength={10}
      inputMode={inputMode}
      keyboardType={keyboardType}
      className="rounded-[12px] text-black  p-16 font-calibri shadow-soft w-auto focus:outline-complement border border-sombreado_input"
    />
  );
};

export default Input;
