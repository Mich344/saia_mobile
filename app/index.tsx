import { useState } from "react";
import { View, Image, Text } from "react-native";
import { Link, router } from "expo-router";

// Componentes
import Input from "@/components/Input";
import ColorGrandient from "@/components/GradientP";
import Container from "@/components/Container";
import Button from "@/components/Button";
import InputPass from "@/components/InputPassword";
import InputOpcion from "@/components/InputOption";

export default function LandingPage() {
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [contrasena, setContrasena] = useState("");
  return (

    <View className="flex-1 bg-[#E2EDED] mb-20">
      <Container>
        {/* Logo */}
        <View className="items-center pt-10">
          <Image
            className="w-[150px] h-[163px]"
            source={require("@/img/logo_SAIA.png")}
          />
          <ColorGrandient
            text="INICIAR SESIÓN"
            fontWeight="bold"
            fontSize={24}
          />
        </View>

        {/* Inputs */}
        <View className="gap-5 mt-10">
          <InputOpcion
            placeholder="Tipo de documento *"
            placeholderColor="#ABABAB"
            opciones={[
              "Cédula de ciudadanía",
              "Tarjeta de identidad",
              "Cédula de extranjería",
              "PPT",
            ]}
            onSelect={(val) => setTipoDocumento(val)}
          />
          <Input
            placeholder="Numero de documento *"
            inputMode="numeric"
            keyboardType="numeric"
            iconName="person-outline"
            value={numeroDocumento}
            onChangeText={setNumeroDocumento}
          />
          <InputPass
            placeholder="Contraseña *"
            value={contrasena}
            onChangeText={setContrasena}
          />
        </View>

        {/* Botón */}
        <View className="items-center">
          <Button text="Ingresar" onPress={() => router.push("/home")} />
        </View>

        {/* Links inferiores */}
        <View className="mt-20 items-center gap-2 pb-8">

          {/* ¿No recuerdas tu contraseña? */}
          <Text className="text-[13] text-gray-500 text-center">
            ¿No recuerdas tu contraseña?{" "}
            <Text className="text-[13] font-bold text-teal-sena" onPress={() => router.push("/restablecerPass")}>
              Restablecer
            </Text>
          </Text>

          {/* ¿Tu cuenta está inactiva? */}
          <Text className="text-[13] text-gray-500 text-center mt-2">
            ¿Tu cuenta está inactiva?{" "}
            <Text className="text-[13] font-bold text-teal-sena" onPress={() => router.push("/home")}>
              Más información
            </Text>
          </Text>

        </View>
      </Container>
    </View>
  );
}
