
// Librerias

import React from "react"
import { Pressable, TextInput, Text } from "react-native"
import { useState } from "react"

// Componentes

import { InputProps } from "./Input"

interface PassProp extends InputProps {
seguridad?: boolean
}

const InputPass = ({seguridad, placeholder, value }: PassProp) => {
    const [mostrar, setMostrar] = useState();
return (
    <TextInput
      placeholder={placeholder}
      value={value}
      secureTextEntry = {seguridad = true}
      className="rounded-[12px] text-black  p-16 font-calibri shadow-soft w-auto focus:outline-complement border border-sombreado_input bg-white"
    />
     
    
  );
}

export default InputPass;