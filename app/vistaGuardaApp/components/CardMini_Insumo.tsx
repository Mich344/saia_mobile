import { View, Text, Image, Pressable } from "react-native";
import { router } from "expo-router";
import ipconfig from "@/sql/ipconfig";

interface Props {
  insumo: {
    id_insumo: number;
    nom_insumo: string;
    marca: string;
    num_serie: string;
    imagen: string | null;
  };
}

export default function CardMiniInsumo({ insumo }: Props) {
  return (
    <View className="bg-white rounded-2xl px-3 py-2 mt-3 flex-row items-center shadow-sm">

      <Image
        source={
          insumo.imagen
            ? { uri: `${ipconfig}${insumo.imagen}` }
            : require("@/img/item-placeholder.png")
        }
        className="w-14 h-14 rounded-lg"
        resizeMode="cover"
      />

      <View className="flex-1 ml-3 justify-center">

        <Text
          numberOfLines={1}
          className="font-semibold text-[14px]"
        >
          {insumo.nom_insumo}
        </Text>

        <Text className="text-[11px] text-gray-500 mt-1">
          Marca: {insumo.marca}
        </Text>

        <Text className="text-[11px] text-gray-400">
          SN: {insumo.num_serie}
        </Text>

      </View>

      <Pressable
        className="justify-center"
        onPress={() =>
          router.push({
            pathname: "/vistaGuardaApp/consulta",
            params: {
              insumo: JSON.stringify(insumo),
            },
          })
        }
      >
        <Text className="text-teal-sena text-xs font-semibold">
          Ver detalle
        </Text>
      </Pressable>

    </View>
  );
}