import { View, Image, Text, TextInput } from "react-native";

// Librerias

// Componentes
import Input from "@/components/Inputs";
import ColorGrandient from "@/components/GradientP";

import Container from "@/components/Container";

export default function page() {
  return (
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
  );
}
