import { View, Image, Text, TextInput } from "react-native";

// Librerias

// Componentes
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
    </Container>
  );
}
