import React from "react";
import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type SearchBarProps = {
  placeholder?: string;

  // tamaño total de la barra
  width?: number | string;
  height?: number;

  // icono
  iconName?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  iconColor?: string;

  // bordes
  borderRadius?: number;

  // borde lineal
  borderWidth?: number;
  borderColor?: string;

  // colores
  backgroundColor?: string;
  textColor?: string;
  placeholderTextColor?: string;
};

export default function SearchBar({
  placeholder = "Buscar...",
  width = "100%",
  height = 50,

  iconName = "search-outline",
  iconSize = 22,
  iconColor = "#9CA3AF",

  borderRadius = 16,

  borderWidth = 1,
  borderColor = "#E5E7EB",

  backgroundColor = "#F3F4F6",
  textColor = "#111827",
  placeholderTextColor = "#9CA3AF",
}: SearchBarProps) {
  return (
    <View
      className="flex-row items-center px-4 mt-4"
      style={{
      //  width,
       // height,
        backgroundColor,
        borderRadius,

        borderWidth,
        borderColor,
      }}
    >
      {/*icono */}
      <Ionicons
        name={iconName}
        size={iconSize}
        color={iconColor}
      />

      {/*input */}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        className="flex-1 ml-2"
        style={{
          color: textColor,
          fontSize: 15,
        }}
      />
    </View>
  );
}