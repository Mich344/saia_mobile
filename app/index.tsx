import { View, Image, Text } from "react-native";
import { Link } from "expo-router";

// Librerias

// Componentes
import Input from "@/components/Input";
import ColorGrandient from "@/components/GradientP";
import Container from "@/components/Container";
import Button from "@/components/Button";
import InputPass from "@/components/InputPassword";
import InputOpcion from "@/components/InputOption";


export default function LandingPage() {
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
          <InputOpcion />
          <Input
            placeholder="Numero de documento *"
            inputMode="numeric"
            keyboardType="numeric"
          />
          <InputPass 
          placeholder="Contraseña *"
          />
        </View>
        <View className="items-center">
          <Button text="Ingresar" />
        </View>
        <View className="mt-auto items-center gap-4 pb-6">
          <Link href="/home">
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

            <Link
              href="/editarPerfil"//cambiar a registrarCuenta
              className="ml-2 text-cyan-400 font-bold"
            >
              Registra tu cuenta
            </Link>
          </View>
        </View>
      </View>
    </Container>
  );
}
