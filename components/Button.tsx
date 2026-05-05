import { Pressable, PressableProps, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
//extiende PressableProps para que tu el boton herede TODAS las propiedades nativas
//onPress, disabled, style, etc.
interface Props extends PressableProps {
  text: string;
  color?: readonly [string, string];
}

const Button = ({ text, color = ["#2EE7B3", "#32C7D3"], onPress }: Props) => {
  return (
    <View>
      <Pressable className="rounded-[25px] overflow-hidden" onPress={onPress}>
        <LinearGradient
          colors={color}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ borderRadius: 24 }} //para que se visualice en dispositivos fisicos
          className=" w-[246px] h-[60px] justify-center active:opacity-80 padding"
        >
          <Text
            //text-center -> centra horizontalmente el texto
            className="text-background text-center font-bold text-[18px]"
          >
            {text}
          </Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

export default Button;
