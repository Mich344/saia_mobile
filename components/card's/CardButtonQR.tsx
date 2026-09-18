import { router } from "expo-router";
import { View, Text, Pressable, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

const CardQR = () => {
  const [nombre, setNombre] = useState("")
  const [documento, setDocumento] = useState("")
  useEffect(() => {
  const cargarUsuario = async () => {
    try {
      const usuario = await AsyncStorage.getItem("usuario");

      if (!usuario) return;

      const datos = JSON.parse(usuario);

      setDocumento(datos.num_doc.toString());

      setNombre(
        `${datos.nombres} ${datos.p_ape} ${datos.s_ape ?? ""}`.trim()
      );

    } catch (error) {
      console.log(error);
    }
  };

  cargarUsuario();
}, []);
  return (
    <View className="bg-white rounded-[28px] p-5 mt-6 mb-10 shadow shadow-gray-300 elevation-lg border border-[#E9F5EF]">
      {/* Encabezado */}
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-gray-400 text-[12px] font-bold">
            CÓDIGO DE ACCESO
          </Text>

          <View className="flex-row items-center mt-1">
            <View className="w-3 h-3 bg-green-500 rounded-full mr-2" />

            <Text className="text-[#18A85A] font-bold">{nombre}</Text>
          </View>
        </View>

        <View className="bg-[#E7F3EC] px-3 py-1 rounded-full">
          <Text className="font-bold text-[#6E8C79]">PORTERÍA 2</Text>
        </View>
      </View>

      {/* Contenedor QR */}

      <View className="items-center mt-8">
        <View className="bg-white rounded-[20px] p-8 border border-[#ECECEC] shadow shadow-gray-200 elevation-md">
          <Image
            source={require("@/img/qr.png")}
            style={{
              width: 150,
              height: 150,
            }}
          />
        </View>
      </View>

      {/* Texto */}

      <Text className="text-center text-gray-500 mt-8 text-[15px]">
        Ingresa a <Text className="font-bold">Mi codigo QR</Text> y presentalo
        en el punto de ingreso{"\n"}
        para validar tu acceso.
      </Text>

      {/* Botón */}

      <Pressable
        onPress={() => router.push("/vistaUsuarioApp/userQR")}
        className="bg-[#007A4E] rounded-2xl mt-8 py-4 flex-row justify-center items-center"
      >
        <Text className="text-white font-bold text-lg ml-2">Mi Codigo QR</Text>
      </Pressable>
    </View>
  );
};

export default CardQR;
