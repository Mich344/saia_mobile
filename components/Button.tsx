import { Pressable, PressableProps, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import css from "@/styles/StylesComponent";

interface Props extends PressableProps {
  text?: string;
  color?: readonly [string, string];
  size?: "lg" | "sm";
  mode?: "default" | "circle";
  iconName?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  iconColor?: string;
}

const Button = ({
  text,
  color = ["#2EE7B3", "#32C7D3"],

  onPress,
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
        className="active:opacity-70"
      >
        <View
          className="items-center justify-center"

        >
          <Ionicons
            name={iconName}
            size={iconSize}
            color={iconColor}
          />
        </View>
      </Pressable>
    );
  }

  //boton normal
  return (
    <Pressable
      onPress={onPress}
      className="active:opacity-70"
    >
      <LinearGradient
        pointerEvents="none"

        colors={color}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}

        style={{
          borderRadius: customSize.borderRadius,
          width: customSize.width,
          height: customSize.height,
        }}

        className="mt-[35] justify-center active:opacity-70"

      >
        <Text
          className="text-background text-center font-bold"
          style={{
            fontSize: customSize.fontSize,
          }}
        >
          {text}
        </Text>
      </LinearGradient>
    </Pressable>
  );
};

export default Button;