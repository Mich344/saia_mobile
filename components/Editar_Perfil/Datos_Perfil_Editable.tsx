import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Input from "@/components/inputs/Input";
import InputOpcion from "@/components/inputs/InputOption";

interface Props {
  correo: string;
  setCorreo: (val: string) => void;
  celular: string;
  setCelular: (val: string) => void;
  genero: string;
  setGenero: (val: string) => void;
}

export const SeccionDatosEditables: React.FC<Props> = ({
  correo,
  setCorreo,
  celular,
  setCelular,
  genero,
  setGenero,
}) => {
  return (
    <>
      <View className="w-full h-px bg-gray-200 my-6" />

      <View className="flex-row items-center mb-4">
        <View className="w-9 h-9 rounded-full bg-[#E9FBF7] items-center justify-center">
          <Ionicons name="create-outline" size={19} color="#20BFA8" />
        </View>

        <View className="ml-3">
          <Text className="font-WorkSansExtraBold text-[18px] text-[#172033]">
            Información editable
          </Text>
          <Text className="text-[11px] text-gray-500">
            Puedes modificar estos datos
          </Text>
        </View>
      </View>

      {/* CORREO */}
      <View className="mb-4">
        <Text className="text-[11px] font-semibold text-gray-500 mb-2">
          Correo electrónico
        </Text>
        <Input
          placeholder="ejemplo@misena.edu.co"
          inputMode="email"
          keyboardType="email-address"
          value={correo}
          onChangeText={setCorreo}
          color="bg-white"
        />
      </View>

      {/* CELULAR */}
      <View className="mb-4">
        <Text className="text-[11px] font-semibold text-gray-500 mb-2">
          Número de celular
        </Text>
        <Input
          placeholder="3001234567"
          inputMode="tel"
          keyboardType="phone-pad"
          value={celular}
          maxLength={10}
          onChangeText={(texto) => setCelular(texto.replace(/\D/g, ""))}
          color="bg-white"
        />
      </View>

      {/* GÉNERO */}
      <View className="mb-2">
        <Text className="text-[11px] font-semibold text-gray-500 mb-2">
          Género
        </Text>
        <InputOpcion
          placeholder="Selecciona tu género"
          value={genero}
          onSelect={setGenero}
          placeholderColor="#ABABAB"
          opciones={["Masculino", "Femenino", "No binario", "Otro"]}
        />
      </View>
    </>
  );
};
