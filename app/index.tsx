import { View, Image, Text, TextInput } from "react-native";

// Librerias

// Componentes
import Input from "@/components/Inputs";
import ColorGrandient from "@/components/GradientP";

import Container from "@/components/Container";

export default function page() {
  return (
<<<<<<< HEAD
    <View className="flex-1 justify-center items-center bg-red-500">
      <Text className="text-red text-xl color-complement">Welcome to SAIA xd xd!</Text>
    </View>
=======
    <Container>
      <View className="items-center pt-10">
        <View>
          <Image
            className="w-[150px] h-[163px]"
            source={require("@/img/logo_SAIA.png")}
          />
          {/* <ColorGrandient text="INICIAR SESIÓN" /> */}
        </View>
      </View>
      <View className="gap-[50px]">
        <Input placeholder={"Numero de documento *"} />
      </View>
    </Container>
>>>>>>> d27aed4a7f85c31b67c3bca4e4d283bb94135f1f
  );
}
