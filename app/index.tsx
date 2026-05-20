// Librerias
import { View, Image, Text } from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";

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

  //////

  const [tipoDocumento, setTipoDocumento] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [contrasena, setContrasena] = useState("");

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
}
