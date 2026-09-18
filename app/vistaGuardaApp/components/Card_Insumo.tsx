import { View, Text, Image } from "react-native";
import ipconfig from "@/sql/ipconfig";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { router } from "expo-router";

interface CardInsumoProps {
  insumo: {
    id_insumo: number;
    nom_insumo: string;
    marca: string;
    num_serie: string;
    estado: number;
    imagen: string | null;
  };
}

export default function CardInsumo({ insumo }: CardInsumoProps) {
  return (
    <Pressable
    onPress={() =>
        router.push({
            pathname: "./vistaGuardaApp/consulta",
            params: {
                insumo: JSON.stringify(insumo),
            },
        })
    }
    className="bg-white rounded-2xl border border-gray-200 p-4 mb-3 flex-row items-center"
>

      <Image
        source={
          insumo.imagen
            ? { uri: `${ipconfig}${insumo.imagen}` }
            : require("@/img/item-placeholder.png")
        }
        className="w-16 h-16 rounded-xl"
      />

      <View className="flex-1 ml-4">
        <Text className="text-lg font-bold">
          {insumo.nom_insumo}
        </Text>

        <Text className="text-gray-500">
          {insumo.marca}
        </Text>

        <Text className="text-gray-400 text-sm">
          Serie: {insumo.num_serie}
        </Text>
      </View>

      <View className="items-center">

        <MaterialCommunityIcons
          name={
            insumo.estado === 1
              ? "check-circle"
              : "close-circle"
          }
          size={30}
          color={
            insumo.estado === 1
              ? "#22C55E"
              : "#EF4444"
          }
        />

        <Text
          className={`text-xs mt-1 ${
            insumo.estado === 1
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {insumo.estado === 1 ? "Activo" : "Inactivo"}
        </Text>

      </View>

    </Pressable>
  );
}