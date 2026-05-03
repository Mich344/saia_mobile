

// Librerias
import React from "react";
import { View } from "react-native";

// Componentes
import Container from "@/components/Container";
import Card from "@/components/Card";


const HomeUsuario = () => {
  return (
    <Container>
      <View className="flex-row flex-wrap justify-between px-4 mt-8">
        <Card img={require("../img/logo_SAIA.png")} text="Codigo QR" />
        <Card img={require("../img/logo_SAIA.png")} text="Insumos" />
        <Card img={require("../img/logo_SAIA.png")} text="Reportes" />
        <Card img={require("../img/logo_SAIA.png")} text="Perfil Aprendiz" />

      </View>
    </Container>
  );
};

export default HomeUsuario;
