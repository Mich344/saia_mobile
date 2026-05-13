// Librerias
import { Link } from "expo-router";
import { View, Text, Image } from "react-native";
import React from "react";

// Componentes
import ColorGrandient from "@/components/GradientP";
import InputOpcion from "@/components/InputOption";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Container from "@/components/Container";
import { useFonts } from "expo-font";

const RestablecerPass = () => {
  const [] = useFonts({
    CalibriBoldItalic: require("../assets/fonts/calibri-bold-italic.ttf"),
  });
  return (
    <Container>
      <View className="flex-row justify-between items-center px-4 py-4">
        <Link href="/">
          <Image
            style={{ width: 25, height: 25 }}
            source={require("@/img/left_arrow.png")}
          />
        </Link>

        <View className="flex-row items-center">
          <Image
            style={{ width: 35, height: 35 }}
            source={require("@/img/logo_SAIA.png")}
          />

          <Text
            className="mx-10  font-calibriBoldItalic"
            style={{ fontSize: 25 }}
          >
            |
          </Text>

          <Text
            className="mt-1 font-calibri"
            style={{ fontSize: 25, fontFamily: "CalibriBoldItalic" }}
          >
            SAIA
          </Text>
        </View>
      </View>
      <View className="flex-1">
        <View className="mt-6 mx-2.5 pt-10 items-center">
          <ColorGrandient
            text="Restablece tu contraseña"
            fontWeight="bold"
            fontSize={25}
          />
          <Text className="mb-12 font-calibri text-center">
            Seleccione el tipo de documento y digite el numero de
            identificación.
          </Text>
        </View>
        <View className="gap-8 mt-10">
          <InputOpcion />
          <Input placeholder="Numero de cedular *" inputMode="numeric" />
          <View className="items-center">
            <Button text="Continuar" />
            <Text className="text-center mt-10">
              Te enviaremos a tu correo electronico un enlace para la
              recuperacion de tu cuenta.
            </Text>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default RestablecerPass;
