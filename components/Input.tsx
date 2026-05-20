import React from "react";
import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import css from "@/styles/StylesComponent";

export interface InputProps {
  placeholder: string;
  value?: string;
  error?: boolean
  onChangeText?: (text: string) => void;
  disable?: boolean;
  inputMode?: "text" | "numeric" | "email" | "tel";
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  iconName?: keyof typeof Ionicons.glyphMap;
  maxLength?: number;
}

const Input = ({
  placeholder,
  value,
  onChangeText,
  inputMode,
  disable,
  error,
  keyboardType,}:InputProps) => {
  // const [alerta, setAlerta] = useState("outline-complement"); HOOKS
  return (
    <View
      className={`flex-row items-center rounded-2xl px-4 py-3 ${
        disable ? "bg-input-disabled" : "bg-input-bg"
      }`}
    >
       <Ionicons
        // name={iconName}
        size={22}
        color="#ABABAB"
        style={css.inputIconMargin}
      />
    <TextInput
      placeholder={placeholder}
      value={value}
      editable={!disable}
      maxLength={10}
      placeholderTextColor="#ABABAB"
      inputMode={inputMode}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      className={`rounded-[12px] text-black  p-16 font-calibri shadow-soft w-auto focus:outline-complement border border-sombreado_input bg-white ${error ? "border-red-600" : "" }`}
    />
    </View>
  );
};

export default Input;
