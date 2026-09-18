import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";

const Footer = () => {
  return (
    <View
      className="mt-10 bg-[#F1F3F5] pt-8 pb-7 px-6"
      style={{
        marginHorizontal: -24,
      }}
    >
      {/* Identidad SAIA */}
      <View className="items-center">
        <View className="flex-row items-center">
          <View className="w-11 h-11 rounded-2xl bg-white items-center justify-center mr-3">
            <MaterialCommunityIcons
              name="shield-check-outline"
              size={25}
              color="#007A4E"
            />
          </View>

          <View>
            <Text className="text-[23px] font-WorkSansBold text-[#007A4E]">
              SAIA
            </Text>

            <Text className="text-[9px] text-gray-400 tracking-widest">
              ACCESO INTELIGENTE
            </Text>
          </View>
        </View>

        {/* Descripción */}
        <Text className="text-center text-gray-500 text-[13px] mt-4 leading-5">
          Sistema de Autogestión de Ingresos{"\n"}
          y Accesos
        </Text>

        {/* Separador */}
        <View className="flex-row items-center w-full mt-6 mb-5">
          <View className="flex-1 h-px bg-gray-300" />

          <View className="mx-3 w-2 h-2 rounded-full bg-[#3ADBB8]" />

          <View className="flex-1 h-px bg-gray-300" />
        </View>

        {/* Versión */}
        <View className="mt-1 px-4 py-1.5 rounded-full bg-white border border-gray-200">
          <Text className="text-[10px] text-gray-400">
            SAIA • Versión 1.0.0
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Footer;