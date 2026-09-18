import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Componentes
import ColorGrandient from "@/components/GradientP";
import InputOpcion from "@/components/inputs/InputOption";
import Input from "@/components/inputs/Input";
import Button from "@/components/Button";
import Container from "@/components/Container";

// Servicio importado de tu carpeta de servicios
import recuperarPassword from "@/sql/Recuperar_Pass";

const RestablecerPass = () => {
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [numDocumento, setNumDocumento] = useState("");
  const [cargando, setCargando] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState("");

  const handleContinuar = async () => {
    if (!tipoDocumento) {
      setErrorMensaje("Por favor, selecciona el tipo de documento.");
      return;
    }

    if (!numDocumento.trim()) {
      setErrorMensaje("Por favor, digita tu número de documento.");
      return;
    }

    setErrorMensaje("");
    setCargando(true);

    // Llamado al servicio
    const respuesta = await recuperarPassword({
      tip_doc: tipoDocumento,
      num_doc: numDocumento.trim(),
    });

    setCargando(false);

    if (respuesta.ok && respuesta.data?.ok) {
      Alert.alert(
        "Solicitud exitosa",
        "Hemos enviado las instrucciones a tu correo electrónico registrado.",
        [
          {
            text: "Entendido",
            onPress: () => router.replace("/"),
          },
        ],
      );
    } else {
      setErrorMensaje(
        respuesta.data?.mensaje ||
          "No se encontró un usuario registrado con los datos ingresados.",
      );
    }
  };

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-row justify-between items-center px-4 py-4 mt-2">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center active:bg-slate-200"
          >
            <Ionicons name="arrow-back" size={24} color="#1E293B" />
          </Pressable>

          <View className="flex-row items-center">
            <Image
              style={{ width: 32, height: 32, resizeMode: "contain" }}
              source={require("@/img/logo_SAIA.png")}
            />
            <Text className="mx-2 text-slate-300 text-2xl font-light">|</Text>
            <Text
              className="text-slate-800 text-xl"
              style={{ fontFamily: "WorkSans_Bold" }}
            >
              SAIA
            </Text>
          </View>
        </View>

        <View className="flex-1 px-5 pt-4">
          <View className="items-center mt-2">
            <ColorGrandient
              text="Restablece tu contraseña"
              fontWeight="bold"
              fontSize={24}
            />
            <Text
              className="mt-3 text-slate-500 text-center leading-5 text-[14px]"
              style={{ fontFamily: "WorkSans_Regular" }}
            >
              Selecciona tu tipo de documento e ingresa tu número de
              identificación.
            </Text>
          </View>

          {errorMensaje ? (
            <View className="bg-red-50 border border-red-200 rounded-2xl p-3.5 mt-5 flex-row items-center">
              <Ionicons name="alert-circle" size={20} color="#EF4444" />
              <Text className="text-red-600 text-xs ml-2 flex-1 font-medium">
                {errorMensaje}
              </Text>
            </View>
          ) : null}

          <View className="gap-5 mt-6">
            <InputOpcion
              placeholder="Tipo de documento *"
              opciones={[
                "Cédula de ciudadanía",
                "Tarjeta de identidad",
                "Cédula de extranjería",
                "PPT",
              ]}
              onSelect={(val: string) => {
                setTipoDocumento(val);
                if (errorMensaje) setErrorMensaje("");
              }}
            />

            <Input
              placeholder="Número de cédula o documento *"
              inputMode="numeric"
              value={numDocumento}
              onChangeText={(val: string) => {
                setNumDocumento(val);
                if (errorMensaje) setErrorMensaje("");
              }}
            />

            <View className="items-center mt-4">
              <Pressable
                onPress={() => {
                  console.log("🔥🔥🔥 TOCÓ CONTINUAR 🔥🔥🔥");
                  handleContinuar();
                }}
                disabled={cargando}
                className="w-full"
              >
                <View className="bg-[#48B88E] py-4 rounded-full items-center">
                  <Text className="text-white font-bold">Continuar</Text>
                </View>
              </Pressable>

              <View className="flex-row items-start mt-8 px-4 py-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-100">
                <Ionicons
                  name="mail-unread-outline"
                  size={20}
                  color="#059669"
                  style={{ marginTop: 2, marginRight: 8 }}
                />
                <Text
                  className="text-slate-600 text-[12px] flex-1 leading-4"
                  style={{ fontFamily: "WorkSans_Regular" }}
                >
                  Te enviaremos a tu correo electrónico registrado un enlace
                  seguro para realizar la recuperación de tu cuenta.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default RestablecerPass;
