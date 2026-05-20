// Librerias
import { View, Image, Text } from "react-native";
import { Link } from "expo-router";
import { router } from "expo-router";
import { useState } from "react";

// Componentes
import Input from "@/components/Input";
import ColorGrandient from "@/components/GradientP";
import Container from "@/components/Container";
import Button from "@/components/Button";
import InputPass from "@/components/InputPassword";
import InputOpcion from "@/components/InputOption";
export default function LandingPage() {
  // Variables & Estados de la interface //

  const [documento, setDocumento] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [disable, setDisable] = useState(true);

  let usuario = {
    documento: "1234567890",
    password: "patito123",
  };

  // Variables & Estados de la interface //

  const validacion = () => {
    if (documento === usuario.documento || password === usuario.password) {
      return router.replace("./menu/homeUser");
    } else if (!documento || !password) {
      setError(true);
      alert("Rellena todos los datos");
      setDisable(false);
    } else {
      alert("Crendenciales incorrectas");
      setError(true);

    }
  };
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
            error={error}
            keyboardType="numeric"
            onChangeText={(number) => {
              setDocumento(number);
              setError(false);
            }}
          />
          <InputPass
            placeholder="Contraseña *"
            onChangeText={setPassword}
            error={error}
          />
        </View>
        <View className="items-center m-auto">
          <Button text="Ingresar" onPress={validacion} disable={!documento || !password}  />
        </View>
        <View className="mt-auto items-center gap-4 pb-6">
          <Link href="/restablecerPass">
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
              href="/registrarCuenta"
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
