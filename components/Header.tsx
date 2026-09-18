import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

// Colores del gradiente del header — consistentes con el diseño SAIA
const HEADER_COLORS: [string, string] = ["#52D8E8", "#3ADBB8"];

interface Props {
  title: string;
  subtitle?: string;
  onMenuPress?: () => void;
  // Radio de las esquinas inferiores
  bottomRadius?: number;
  // Padding inferior — controla la altura visible del header
  paddingBottom?: number;
  // Mostrar u ocultar el ícono de menú hamburguesa
  showMenu?: boolean;
}

export default function Header({
  title,
  subtitle,
  onMenuPress,
  bottomRadius = 55,
  paddingBottom = 80,
  showMenu = true,
}: Props) {
  return (
    <LinearGradient
      colors={HEADER_COLORS}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        paddingTop: 52,
        paddingBottom,
        paddingHorizontal: 20,
        borderBottomLeftRadius: bottomRadius,
        borderBottomRightRadius: bottomRadius,
      }}
    >
      <View className="flex-row items-center justify-between">

        {/* Botón volver */}
        <Pressable
          className="bg-white w-[46] h-[46] rounded-[14] items-center justify-center active:opacity-75"
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#3ADBB8" />
        </Pressable>

        {/* Títulos */}
        <View className="items-center">
          <Text className="text-white text-[22] font-bold">{title}</Text>
          {subtitle && (
            <Text className="text-white text-[13] mt-0.5">{subtitle}</Text>
          )}
        </View>

        {/* Menú — View vacío mantiene el centrado cuando está oculto */}
        {showMenu ? (
          <Pressable className="p-1 active:opacity-75" onPress={onMenuPress}>
            <Ionicons name="menu" size={30} color="white" />
          </Pressable>
        ) : (
          <View className="w-8" />
        )}

      </View>
    </LinearGradient>
  );
}
