import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

import Container from "@/components/Container";
import GradientP from "@/components/GradientP";

import CardInsumo from "./Card_Insumo";

export default function TodosInsumos() {
  const { aprendiz } = useLocalSearchParams();

  const datos = JSON.parse(aprendiz as string);

  return (
    <Container>
      <View className="items-center mt-8">
        <GradientP text="Insumos registrados" fontWeight="bold" fontSize={24} />

        <Text className="text-gray-500 mt-2">{datos.nombre_completo}</Text>
      </View>

      <ScrollView className="mt-6" showsVerticalScrollIndicator={false}>
        {!datos.insumos || datos.insumos.length === 0 ? (
          <View className="items-center mt-10">
            <Text className="text-gray-400 text-base">
              Este aprendiz no tiene insumos registrados.
            </Text>
          </View>
        ) : (
          (datos.insumos ?? []).map((item: any) => (
            <CardInsumo key={item.id_insumo} insumo={item} />
          ))
        )}
      </ScrollView>
    </Container>
  );
}
