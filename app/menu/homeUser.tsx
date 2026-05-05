

// Librerias
import React from "react";
import { View, Text } from "react-native";
import { Link } from "expo-router";

// Componentes
import Container from "@/components/Container";
import Card from "@/components/Card";


const HomeUsuario = () => {
  return (
    <Container>
      <View className="items-center">
        <Text className="font-calibriBoldItalic">¡¡Hian Michel Osorio Andrade!! <Link href="/">Fuera</Link></Text>
        <Text>Recuerda tener todos tus implementos registrados </Text>
      </View>
      <View className="flex-row flex-wrap justify-between px-4 mt-8">
        <Card img={require("@/img/codigoQR.png")} text="Codigo QR" />
        <Card img={require("@/img/insumos.png")} text="Insumos" />
        <Card img={require("@/img/reportes.png")} text="Reportes" />
        <Card img={require("@/img/perfil.png")} text="Perfil Aprendiz" />

      </View>
    </Container>
  );
};

export default HomeUsuario;
