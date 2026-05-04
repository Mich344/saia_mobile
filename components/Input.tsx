import { useState } from "react";
import React from "react";
import { TextInput } from "react-native";
// import cssPerzonalizado from "@/styles/StylesComponent";

// Se crea una interfaz para heredar propiedades al momento de requerir una clase o otra interfaz con los mismos valores

export interface InputProps {
  placeholder: string;
  value?: string;
  disable?: boolean;
  inputMode?: "text" | "numeric" | "email" | "tel";
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

// Input prop visualiza el campo de escritura del usuario con validaciones especificas que retornaran un valor definido al momento de llamar el componente
const Input = ({ placeholder,
  value,
  inputMode,
  keyboardType,
  disable = false }: InputProps) => {
  // const [alerta, setAlerta] = useState("outline-complement"); HOOKS
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      maxLength={10}
      inputMode={inputMode}
      keyboardType={keyboardType}
      editable={!disable}

      
      className={`
        rounded-[12px] p-16 font-calibri w-auto border
        ${disable
          ? "bg-[#C2C2C2] text-gray-400 border-gray-300"
          : "focus:outline-complement shadow-soft w-auto bg-white text-black border-sombreado_input"}
      `}
    />
  );
};

export default Input;
