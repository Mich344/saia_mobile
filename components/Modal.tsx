import React from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  Image,
  ImageSourcePropType,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface infomodal {
  visible: boolean;
  onClose: () => void;

  titulo: string;
  descripcion: string;

  // Propiedades para Imagen tradicional o Icono de Ionicons
  imagen?: ImageSourcePropType;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;

  // Botón principal
  textButton?: string;
  onPressButton?: () => void;

  // Botón secundario
  secondButton?: string;
  onPressSecondButton?: () => void;
}

const Modalcomponent = ({
  visible,
  onClose,
  titulo,
  descripcion,
  imagen,
  iconName,
  iconColor = "#EAB308", // Color por defecto (Amarillo advertencia)
  textButton,
  onPressButton,
  secondButton,
  onPressSecondButton,
}: infomodal) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50 px-6">
        <View className="bg-white rounded-3xl p-6 w-full items-center">
          {/* BOTÓN CERRAR (X) CON IONICONS */}
          <Pressable
            onPress={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 justify-center items-center active:bg-gray-200"
          >
            <Ionicons name="close" size={20} color="#4B5563" />
          </Pressable>

          {/* ICONO DE IONICONS (Prioridad 1) */}
          {iconName ? (
            <View
              className="w-16 h-16 rounded-full justify-center items-center mb-1"
              style={{ backgroundColor: `${iconColor}20` }} // Fondo suave con opacidad del color principal
            >
              <Ionicons name={iconName} size={38} color={iconColor} />
            </View>
          ) : (
            /* IMAGEN TRADICIONAL (Fallback si no hay iconName) */
            imagen && (
              <Image
                source={imagen}
                style={{
                  width: 60,
                  height: 60,
                }}
                resizeMode="contain"
              />
            )
          )}

          {/* TÍTULO */}
          <Text className="font-calibriBold text-[22px] text-black mt-2 text-center">
            {titulo}
          </Text>

          {/* DESCRIPCIÓN */}
          <Text className="font-calibri text-[14px] text-gray-500 text-center mt-2 leading-5">
            {descripcion}
          </Text>

          {/* BOTONES */}
          <View className="w-full mt-6">
            {/* BOTÓN PRINCIPAL */}
            {textButton && (
              <Pressable
                className="bg-[#007A4E] rounded-2xl py-4 items-center active:opacity-80"
                onPress={onPressButton ? onPressButton : onClose}
              >
                <Text className="text-white font-calibriBold text-[16px]">
                  {textButton}
                </Text>
              </Pressable>
            )}

            {/* BOTÓN SECUNDARIO */}
            {secondButton && (
              <Pressable
                className="bg-red-500 rounded-2xl py-4 items-center mt-3 active:opacity-80"
                onPress={onPressSecondButton ? onPressSecondButton : onClose}
              >
                <Text className="text-white font-calibriBold text-[16px]">
                  {secondButton}
                </Text>
              </Pressable>
            )}

            {/* BOTÓN CANCELAR */}
            <Pressable
              className="bg-gray-100 rounded-2xl py-4 items-center mt-3 active:opacity-80"
              onPress={onClose}
            >
              <Text className="font-calibriBold text-gray-700">
                Cancelar
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Modalcomponent;  