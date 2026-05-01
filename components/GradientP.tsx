// Librerias
import { View } from "react-native";
import Svg, { Text, Defs, LinearGradient, Stop } from "react-native-svg"; // Vector dibujado en texto

type ColorPrincipalProps = {
  text: string;
};

export default function ColorGrandient({ text }: ColorPrincipalProps) {
  return (
    <View className="">
      <Svg width="100" height="50">
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="#42EDB5" />
            <Stop offset="1" stopColor="#47C5DE" />
          </LinearGradient>
        </Defs>

        <Text
          fill="url(#grad)"
          fontSize="24"
          fontWeight="bold"
          x="50%"
          y="35"
          textAnchor="middle"
        >
          {text}
        </Text>
      </Svg>
    </View>
  );
}
