import { View, Image } from "react-native";

// Componentes
import Input from "@/components/Inputs";
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
        </View>
      </View>

      <View className="gap-[50px]">
        <Input placeholder={"Numero de documento *"} />
      </View>
    </Container>
  );
}