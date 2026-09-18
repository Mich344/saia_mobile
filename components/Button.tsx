import { Pressable, PressableProps, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import css from "@/styles/StylesComponent";

// Gradientes por defecto
const GRADIENT_DEFAULT: [string, string] = ["#2EE7B3", "#32C7D3"];
const GRADIENT_DISABLED: [string, string] = ["#B0B0B0", "#C8C8C8"];

interface Props extends PressableProps {
  text?: string;
  color?: readonly [string, string];
  disable?: boolean,
  size?: "lg" | "sm";
  mode?: "default" | "circle";
  iconName?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  iconColor?: string;
}

const Button = ({
  text,
  color = GRADIENT_DEFAULT,
  onPress,
  disabled = false,
  size = "lg",
  mode = "default",
  iconName = "add",
  iconSize = 40,
  iconColor = "#000",
}: Props) => {
  const customSize = css.sizeStylesButton[size];

  if (mode === "circle") {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled}
        className="active:opacity-70"
      >
        <View className="items-center justify-center">
          <Ionicons name={iconName} size={iconSize} color={iconColor} />
        </View>
      </Pressable>
    );
  }

  return (
    //pressable maneja la interaccion del boton
    <Pressable onPress={onPress} disabled={disabled}>
   
      <LinearGradient
        pointerEvents="none"
        colors={disabled ? GRADIENT_DISABLED : color}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          borderRadius: customSize.borderRadius,
          width: customSize.width,
          height: customSize.height,
        }}
        className="mt-[35] justify-center"
      >
        <Text
          className="text-white text-center font-bold"
          style={{ fontSize: customSize.fontSize }}
        >
          {text}
        </Text>
      </LinearGradient>
    </Pressable>
  );
};

export default Button;
