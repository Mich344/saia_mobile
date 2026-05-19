import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import css from "@/styles/StylesComponent";

interface InputOpcionProps {
  placeholder: string;
  opciones: string[];
  value?: string;
  onSelect?: (item: string) => void;
  iconName?: keyof typeof Ionicons.glyphMap;
  placeholderColor?: string;
  optionsColor?: string;
}

const InputOpcion = ({
  placeholder,
  opciones,
  value,
  onSelect,
  iconName = "card-outline",
  placeholderColor = "#ABABAB",
  optionsColor = "#1A1A1A",
}: InputOpcionProps) => {
  const [abierto, setAbierto] = useState(false);
  const [seleccion, setSeleccion] = useState(value ?? "");

  const handleSelect = (item: string) => {
    setSeleccion(item);
    setAbierto(false);
    onSelect?.(item);
  };

  return (
    <View className="z-50">
      {/* Trigger */}
      <TouchableOpacity
        onPress={() => setAbierto(!abierto)}
        className="flex-row items-center bg-input-bg rounded-2xl px-4 py-3"
        activeOpacity={0.8}
      >
        <Ionicons
          name={iconName}
          size={22}
          color="#ABABAB"
          style={css.inputIconMargin}
        />
        <Text
          className="flex-1 text-[15] font-calibri"
          style={[
            css.inputOptionText,
            { color: seleccion ? "#000" : placeholderColor },
          ]}
        >
          {seleccion || placeholder}
        </Text>
        <Ionicons
          name={abierto ? "chevron-up" : "chevron-down"}
          size={20}
          color="#ABABAB"
        />
      </TouchableOpacity>

      {/* Lista desplegable */}
      {abierto && (
        <View
          className="absolute top-[54px] left-0 right-0 bg-white rounded-2xl border border-sombreado-input z-50 overflow-hidden"
          style={css.inputOptionDropdown}
        >
          {opciones.map((item, i) => (
            <TouchableOpacity
              key={item}
              onPress={() => handleSelect(item)}
              className={`px-4 py-3 ${
                i < opciones.length - 1 ? "border-b border-sombreado-input" : ""
              }`}
            >
              <Text
                className="text-[15] font-calibri"
                style={{ color: optionsColor }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default InputOpcion;
