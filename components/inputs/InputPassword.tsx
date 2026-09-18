// Librerias

import React from "react";
import { Pressable, TextInput, Text, View } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";




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
      <View className="relative"
    >
 
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={!visible}
      editable={!disable}
      placeholderTextColor="#ABABAB"
        className={` text-black  font-calibri  w-auto bg-white ${error ? "rounded-[12px]  p-16 border-[1px] border-red-600" : "rounded-[12px]  p-16 border-[1px] border-[#ACA9A9]"}`}
    />
      <Pressable onPress={() => setVisible((v) => !v)} className="absolute right-4 top-[15px]">
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
