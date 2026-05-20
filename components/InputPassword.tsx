// Librerias

import React from "react";
import { Pressable, TextInput, Text } from "react-native";
import { useState } from "react";

// Componentes

import { InputProps } from "./Input";

interface PassProp extends InputProps {
  seguridad?: boolean;
}

const InputPass = ({
  seguridad,
  placeholder,
  value,
  onChangeText,
  error,
}: PassProp) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={(seguridad = true)}
      className={`rounded-[12px] text-black  p-16 font-calibri shadow-soft w-auto focus:outline-complement border border-sombreado_input bg-white ${error ? "border-red-600" : " "}`}
    />
  );
};

export default InputPass;
