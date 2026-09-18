import { ScrollView, View, Text, Image } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import Container from "@/components/Container";
import GradientP from "@/components/GradientP";
import Button from "@/components/Button";

import ipconfig from "@/sql/ipconfig";

export default function ConsultaInsumo() {
  const { insumo, aprendiz, tieneFoto } = useLocalSearchParams();
  const router = useRouter();
  const datos = JSON.parse(insumo as string);

  const handleVolver = () => {
    router.navigate({
      pathname: "/vistaGuardaApp/info_Usuario",
      params: { aprendiz, tieneFoto },
    });
  };
  return (
    <Container>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 35,
        }}
      >
        {/* TÍTULO */}

        <View className="items-center mt-6">
          <GradientP
            text="Detalle del Insumo"
            fontWeight="bold"
            fontSize={25}
          />

          <Text className="text-gray-400 mt-2">
            Información completa del elemento registrado
          </Text>
        </View>

        {/* CARD */}

        <View
          className="bg-white rounded-[28px] mt-7 mx-1 p-6 border border-[#E8F5EF]"
          style={{
            elevation: 4,
            shadowColor: "#3ADBB8",
            shadowOpacity: 0.12,
            shadowRadius: 10,
          }}
        >
          {/* Imagen */}

          <View className="items-center">
            <View className="bg-[#F8FAFC] p-4 rounded-[24px] border border-gray-200">
              <Image
                source={
                  datos.imagen
                    ? {
                        uri: `${ipconfig}${datos.imagen}`,
                      }
                    : require("@/img/item-placeholder.png")
                }
                className="w-44 h-44 rounded-2xl"
                resizeMode="cover"
              />
            </View>
          </View>

          {/* Nombre */}

          <Text className="text-center text-2xl font-bold text-gray-800 mt-6">
            {datos.nom_insumo}
          </Text>

          {/* Estado */}

          <View className="items-center mt-4">
            <View
              className={`px-5 py-2 rounded-full ${
                datos.estado ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <Text
                className={`font-bold ${
                  datos.estado ? "text-green-700" : "text-red-700"
                }`}
              >
                {datos.estado ? "ACTIVO" : "INACTIVO"}
              </Text>
            </View>
          </View>

          {/* TARJETAS */}

          <View className="mt-8">
            <View className="bg-[#F8FAFC] rounded-2xl p-4 flex-row items-center mb-4">
              <View className="bg-[#DFF8F1] p-3 rounded-xl">
                <Ionicons name="pricetag-outline" size={22} color="#007A4E" />
              </View>

              <View className="ml-4 flex-1">
                <Text className="text-gray-400 text-xs">Marca</Text>

                <Text className="font-bold text-base text-gray-800 mt-1">
                  {datos.marca}
                </Text>
              </View>
            </View>
            <View className="bg-[#F8FAFC] rounded-2xl p-4 flex-row items-center mb-4">
              <View className="bg-[#DFF8F1] p-3 rounded-xl">
                <MaterialCommunityIcons
                  name="barcode"
                  size={22}
                  color="#007A4E"
                />
              </View>

              <View className="ml-4 flex-1">
                <Text className="text-gray-400 text-xs">Número de serie</Text>

                <Text className="font-bold text-base text-gray-800 mt-1">
                  {datos.num_serie}
                </Text>
              </View>
            </View>
            <View className="bg-[#F8FAFC] rounded-2xl p-4 flex-row items-center mb-4">
              <View className="bg-[#DFF8F1] p-3 rounded-xl">
                <Ionicons name="cube-outline" size={22} color="#007A4E" />
              </View>

              <View className="ml-4 flex-1">
                <Text className="text-gray-400 text-xs">Código interno</Text>

                <Text className="font-bold text-base text-gray-800 mt-1">
                  #{datos.id_insumo}
                </Text>
              </View>
            </View>
            {/* DESCRIPCIÓN */}
            <View className="bg-[#F8FAFC] rounded-2xl p-5 mt-2">
              <View className="flex-row items-center mb-3">
                <Ionicons
                  name="document-text-outline"
                  size={22}
                  color="#007A4E"
                />

                <Text className="font-bold text-lg text-gray-800 ml-3">
                  Descripción
                </Text>
              </View>

              <Text className="text-gray-600 leading-6">
                {datos.desc_insumo && datos.desc_insumo.trim() !== ""
                  ? datos.desc_insumo
                  : "Este insumo no posee una descripción registrada."}
              </Text>
            </View>
            {/* OBSERVACIÓN */}
            <View className="bg-[#ECFDF5] rounded-2xl p-4 mt-5 border border-[#C6F6E5]">
              <View className="flex-row items-center">
                <Ionicons name="shield-checkmark" size={22} color="#059669" />

                <Text className="font-bold text-[#047857] ml-3">
                  Estado del registro
                </Text>
              </View>

              <Text className="text-[#065F46] mt-3 leading-6">
                {datos.estado
                  ? "Este insumo se encuentra habilitado para ingresar y salir de las instalaciones del SENA."
                  : "Este insumo se encuentra inactivo y no podrá ser utilizado hasta ser habilitado nuevamente."}
              </Text>
            </View>
          </View>
        </View>

        {/* BOTÓN */}

        <View className="items-center mt-8">
         <Button text="Volver" onPress={handleVolver} />
        </View>
      </ScrollView>
    </Container>
  );
}
