import React from "react";
import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import css from "@/styles/StylesComponent";

export interface InputProps {
  placeholder: string;
  value?: string;
  error?: boolean;
  onChangeText?: (text: string) => void;
  disable?: boolean;
  inputMode?: any;
  keyboardType?: any;
  iconName?: any;
  maxLength?: number;
  autoCapitalize?: "none"
  color?: string;
}

const Input = ({
  placeholder,
  value,
  onChangeText,
  inputMode,
  disable,
  error,
  iconName,
  keyboardType,
  color,
  maxLength,
  autoCapitalize
}: InputProps) => {

  return (
    <View className="relative">
      <TextInput
        placeholder={placeholder}
        value={value}
        editable={!disable}
        placeholderTextColor="#ABABAB"
        inputMode={inputMode}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={maxLength}
        autoCapitalize={autoCapitalize}
        className={` text-black  font-calibri w-auto ${color} rounded-[12px]  p-16 border-[1px] ${error ? " border-red-600" : " border-[#ACA9A9]"}`}
      />
      <Ionicons
        name={iconName}
        size={22}
        color="#ABABAB"
        style={css.inputIconMargin}
        className="absolute right-[3px] top-[15px]"
      />
    </View>
  );
};

export default Input;
