import { View, Image, Text } from "react-native";
import { Link } from "expo-router";

// Librerias

// Componentes
import Input from "@/components/Inputs";
import ColorGrandient from "@/components/GradientP";
import Button from "@/components/Button";
import Container from "@/components/Container";
export default function page() {
  return (
    <Container>
      <View className="flex-1">
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

        <View className="gap-8 mt-10">
          <Input
            placeholder="Numero de documento *"
            inputMode="numeric"
            keyboardType="numeric"
          />

          <Button text="INICIAR SESIÓN" />
        </View>

        <View className="mt-auto items-center gap-4 pb-6">
          <Link href="/">
            <ColorGrandient
              text="¿Olvidaste tu contraseña?"
              fontWeight="bold"
              fontSize={13}
            />
          </Link>

          <View className="flex-row items-center justify-center">
            <Text className="font-bold text-gray-500">
              ¿No tienes una cuenta?
            </Text>

            <Link href="/registrar_cuenta" className="ml-2 text-cyan-400 font-bold">
              Registra tu cuenta
            </Link>
          </View>
        </View>
      </View>
    </Container>
  );
}
