import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  nombre: string;
  documento: string;
  numDoc: string;
  sangre: string;
}

export const SeccionDatosFijos: React.FC<Props> = ({
  nombre,
  documento,
  numDoc,
  sangre,
}) => {
  return (
    <View className="mt-6">
      <View className="flex-row items-center mb-4">
        <View className="w-9 h-9 rounded-full bg-[#E9FBF7] items-center justify-center">
          <Ionicons name="lock-closed-outline" size={18} color="#20BFA8" />
        </View>

        <View className="ml-3">
          <Text className="font-WorkSansExtraBold text-[18px] text-[#172033]">
            Datos personales
          </Text>
          <Text className="text-[11px] text-gray-500">
            Estos datos no pueden modificarse
          </Text>
        </View>
      </View>

      {/* NOMBRE */}
      <View className="mb-4">
        <Text className="text-[11px] font-semibold text-gray-500 mb-2">
          Nombre completo
        </Text>
        <View className="flex-row items-center bg-[#F3F5F7] border border-[#E5E8EB] rounded-[14px] px-4 h-[52px]">
          <Ionicons name="person-outline" size={19} color="#9AA1A8" />
          <Text className="flex-1 ml-3 text-[14px] font-semibold text-[#6B7280]" numberOfLines={1}>
            {nombre}
          </Text>
          <Ionicons name="lock-closed-outline" size={16} color="#A5AAB0" />
        </View>
      </View>

      {/* DOCUMENTO Y NUMERO */}
      <View className="flex-row mb-4">
        <View className="flex-1 mr-2">
          <Text className="text-[11px] font-semibold text-gray-500 mb-2">
            Tipo de documento
          </Text>
          <View className="flex-row items-center bg-[#F3F5F7] border border-[#E5E8EB] rounded-[14px] px-3 h-[52px]">
            <Ionicons name="card-outline" size={18} color="#9AA1A8" />
            <Text className="flex-1 ml-2 text-[12px] font-semibold text-[#6B7280]" numberOfLines={1}>
              {documento}
            </Text>
          </View>
        </View>

        <View className="flex-1 ml-2">
          <Text className="text-[11px] font-semibold text-gray-500 mb-2">
            Número
          </Text>
          <View className="flex-row items-center bg-[#F3F5F7] border border-[#E5E8EB] rounded-[14px] px-3 h-[52px]">
            <Ionicons name="keypad-outline" size={18} color="#9AA1A8" />
            <Text className="flex-1 ml-2 text-[13px] font-semibold text-[#6B7280]">
              {numDoc}
            </Text>
          </View>
        </View>
      </View>

      {/* TIPO DE SANGRE */}
      <View>
        <Text className="text-[11px] font-semibold text-gray-500 mb-2">
          Tipo de sangre
        </Text>
        <View className="flex-row items-center bg-[#F3F5F7] border border-[#E5E8EB] rounded-[14px] px-4 h-[52px]">
          <View className="w-8 h-8 rounded-full bg-[#FFECEC] items-center justify-center">
            <Ionicons name="water-outline" size={17} color="#EF4444" />
          </View>
          <Text className="ml-3 text-[14px] font-bold text-[#6B7280]">
            {sangre || "No registrado"}
          </Text>
          <View className="flex-1" />
          <Ionicons name="lock-closed-outline" size={16} color="#A5AAB0" />
        </View>
      </View>
    </View>
  );
};