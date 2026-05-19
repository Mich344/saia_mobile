import React from "react";
import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import css from "@/styles/StylesComponent";

export interface InputProps {
  placeholder: string;
  value?: string;
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
  keyboardType,
  disable = false,
  iconName = "person-outline",
  maxLength,
}: InputProps) => {
  return (
    <View
      className={`flex-row items-center rounded-2xl px-4 py-3 ${
        disable ? "bg-input-disabled" : "bg-input-bg"
      }`}
    >
      <Ionicons
        name={iconName}
        size={22}
        color="#ABABAB"
        style={css.inputIconMargin}
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#ABABAB"
        value={value}
        onChangeText={onChangeText}
        inputMode={inputMode}
        keyboardType={keyboardType}
        editable={!disable}
        maxLength={maxLength}
        className="flex-1 text-[15] text-black font-calibri"
      />
    </View>
  );
};

export default Input;
