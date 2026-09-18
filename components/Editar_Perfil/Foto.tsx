import React from "react";
import { View, Text } from "react-native";
import ImagenSelector from "@/components/ImagenSelector";
import { ArchivoImagen } from "@/hooks/editar_Perfil";

interface Props {
  imagen: ArchivoImagen | null;
  imagenActual: string | null;
  nombre: string;
  obtenerUrlImagen: (ruta: string | null) => string | null;
  onImageSelected: (archivo: ArchivoImagen) => void;
}

export const SeccionFoto: React.FC<Props> = ({
  imagen,
  imagenActual,
  nombre,
  obtenerUrlImagen,
  onImageSelected,
}) => {
  return (
    <View className="items-center mt-5">
      <View
        className="w-[124px] h-[124px] rounded-full items-center justify-center"
      >
        <ImagenSelector
          size={110}
          form="circle"
          cameraSize={24}
          showCameraIcon={true}
          showShadow={false}
          image={imagen ? imagen.uri : obtenerUrlImagen(imagenActual)}
          onImageSelected={onImageSelected}
        />
      </View>

      <Text className="text-[17px] font-WorkSansExtraBold text-[#172033] mt-3">
        {nombre || "Aprendiz"}
      </Text>

      <View className="flex-row items-center mt-1">
        <View className="w-2 h-2 rounded-full bg-[#3ADBB8] mr-2" />
        <Text className="text-[12px] text-gray-500">
          Información personal
        </Text>
      </View>
    </View>
  );
};