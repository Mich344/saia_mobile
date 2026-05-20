// Librerias

import React from "react";
import { Pressable, TextInput, Text, View } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import css from "@/styles/StylesComponent";



// Componentes

import { InputProps } from "./Input";

interface PassProp extends InputProps {
  seguridad?: boolean;
}

const InputPass = ({
  seguridad,
  placeholder,
  disable = false,
  value,
  onChangeText,
  error,
}: PassProp) => {
  const [visible, setVisible] = useState(false);

  return (
      <View
      className={`flex-row items-center rounded-2xl px-4 py-3 ${
        disable ? "bg-input-disabled" : "bg-input-bg"
      }`}
    >
       <Ionicons
        name="lock-closed-outline"
        size={22}
        color="#ABABAB"
        style={css.inputIconMargin}
      />
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={!visible}
        editable={!disable}
        placeholderTextColor="#ABABAB"


      className={`rounded-[12px] text-black  p-16 font-calibri shadow-soft w-auto focus:outline-complement border border-sombreado_input bg-white ${error ? "border-red-600" : " "}`}
    />
      <Pressable onPress={() => setVisible((v) => !v)} className="ml-2">
        <Ionicons
          name={visible ? "eye-outline" : "eye-off-outline"}
          size={22}
          color="#ABABAB"
        />
      </Pressable>
      </View>

  );
};

export default InputPass;
