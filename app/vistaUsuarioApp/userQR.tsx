// LIBRERÍAS EXPO 
import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

// COMPONENTES
import QRCode from "react-native-qrcode-svg";
import ColorGradient from "@/components/GradientP";
import Container from "@/components/Container";
import Back from "@/components/molecules/Back"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const UserQR = () => {
  const [leido] = useState(false);
  const [documento, setDocumento] = useState<string | null>(null);

  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const usuario = await AsyncStorage.getItem("usuario");

        if (!usuario) return;

        const datos = JSON.parse(usuario);

        setDocumento(datos.num_doc.toString());
      } catch (error) {
        console.log(error);
      }
    };

    cargarUsuario();
  }, []);

  return (
    <Container>
      <Back className="mb-5" onPress={() => router.back()} title= "Codigo QR" subtitle="Codigo de acceso institucional"/>

      <LinearGradient
        colors={["#ECFDF5", "#ECFDF5"]}
        style={{ flex: 1, borderRadius: 15 }}
      >

        <View className="items-center mt-3">
          
          <ColorGradient
            text="ESCANEA TU CÓDIGO QR"
            fontWeight="bold"
            fontSize={24}
          />

          <Text className="text-gray-500 mt-2 text-center px-6 mb-2">
            Presenta este código al personal de seguridad para registrar tu
            ingreso.
          </Text>
        </View>

        <View className="flex-1 justify-center items-center">
          {!leido ? (
            documento ? (
              <View
                className="
                  bg-white
                  rounded-[30px]
                  px-8
                  py-8
                  items-center
                  border
                  border-[#EAEAEA]
                "
                style={{
                  elevation: 3, // Android
                  shadowColor: "aqua", // iOS
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.15,
                  shadowRadius: 8,
                }}
              >
                {/* Icono */}

                <View className="bg-[#EAFBF5] p-4 rounded-full mb-5">
                  <Ionicons name="qr-code" size={34} color="#10B981" />
                </View>

                {/* QR */}

                <View className="bg-[#F7F8FA] p-5 rounded-[22px]">
                  <QRCode
                    value={documento}
                    size={220}
                    color="#111827"
                    backgroundColor="white"
                  />
                </View>

                {/* Título */}

                <Text className="text-xl font-bold mt-6">Código de acceso</Text>

                <Text className="text-center text-gray-500 mt-2 leading-6">
                  Escanea este código para validar tu ingreso a las
                  instalaciones del SENA.
                </Text>

                {/* Estado */}

                <View className="flex-row items-center bg-[#EAFBF5] rounded-full px-5 py-3 mt-6">
                  <View className="w-3 h-3 rounded-full bg-green-500 mr-2" />

                  <Text className="text-[#10B981] font-bold">
                    SENA SALOMIA CEAI
                  </Text>
                </View>

                {/* Documento */}

                <View className="mt-6 border-t border-[#ECECEC] pt-4 w-full">
                  <Text className="text-center text-gray-400 text-xs">
                    Documento
                  </Text>

                  <Text className="text-center font-bold text-lg mt-1">
                    {documento}
                  </Text>
                </View>
              </View>
            ) : (
              <View className="items-center">
                <Ionicons name="sync" size={50} color="#10B981" />

                <Text className="text-gray-500 mt-4">
                  Generando código QR...
                </Text>
              </View>
            )
          ) : (
            <View className="items-center">
              <View className="bg-green-100 p-6 rounded-full">
                <Ionicons name="checkmark-circle" color="#16A34A" size={70} />
              </View>

              <Text className="text-3xl font-bold text-green-600 mt-8">
                INGRESO AUTORIZADO
              </Text>

              <Text className="text-center text-gray-500 mt-3 px-10">
                El código QR fue validado correctamente por el personal de
                seguridad.
              </Text>
            </View>
          )}
        </View>

        <View className="items-center mb-8">
          <Text className="text-xs text-gray-400 text-center px-8 mt-2">
            Este código es personal e intransferible. Su uso indebido puede
            generar sanciones institucionales.
          </Text>
        </View>
      </LinearGradient>
    </Container>
  );
};

export default UserQR;
