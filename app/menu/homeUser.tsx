

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
        <Text className="font-calibriBold text-[20px]">¡¡Hian Michel Osorio Andrade!! <Link href="/">Fuera</Link></Text>
        <Text className="font-calibri text-[15px]">Recuerda tener todos tus implementos registrados </Text>
      </View>
      <View className="flex-row flex-wrap justify-between px-4 mt-8">
       <Link href="./userQR"> <Card img={require("@/img/codigoQR.png")} text="Codigo QR" /></Link>
        <Card img={require("@/img/insumos.png")} text="Insumos" />
        <Card img={require("@/img/reportes.png")} text="Reportes" />
        <Card img={require("@/img/perfil.png")} text="Perfil Aprendiz" />

      </View>
    </Container>
  );
};

export default HomeUsuario;
