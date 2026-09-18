import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export const SeccionSeguridad = () => {
  return (
    <>
      <View className="w-full h-px bg-gray-200 my-6" />

      <View className="bg-[#F7FBFA] border border-[#DDF2EC] rounded-[18px] p-4">
        <View className="flex-row items-center">
          <View className="w-10 h-10 rounded-full bg-[#E5F9F4] items-center justify-center">
            <Ionicons name="shield-checkmark-outline" size={21} color="#20BFA8" />
          </View>

          <View className="flex-1 ml-3">
            <Text className="font-bold text-[15px] text-[#172033]">
              Seguridad de la cuenta
            </Text>

            <Text className="text-[11px] text-gray-500 mt-1">
              Mantén tu contraseña actualizada para proteger tu cuenta.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => router.push("./cambiarPass")}
          activeOpacity={0.8}
          className="bg-white border border-[#DCE5E2] rounded-[13px] h-[46px] mt-4 flex-row items-center justify-center"
        >
          <Ionicons name="lock-closed-outline" size={17} color="#20BFA8" />
          <Text className="text-[#172033] font-bold text-[13px] ml-2">
            Cambiar contraseña
          </Text>
          <Ionicons
            name="chevron-forward"
            size={17}
            color="#8A939A"
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};