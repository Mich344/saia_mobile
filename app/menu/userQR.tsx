import { View, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
import ColorGradient from "@/components/GradientP";
import Container from "@/components/Container"
const UserQR = () => {
  const aprendiz = {
    nombre: "Michel Osorio",
    documento: "123456789",
    ficha: "2876543",
  };

  return (
    <Container>
      <View className="mt-10 items-center">
        <ColorGradient
          text="ESCANEA TU CODIGO QR"
          fontWeight="bold"
          fontSize={24}
        />
        <Text className="text-center font-calibri ">
          Muestra este código al personal de portería para ser escaneado y
          permitir tu ingreso.
        </Text>
      </View>
      <View className="flex-1  items-center">
        <Text className="text-xl mb-8">Mi Código QR</Text>

        <QRCode value={JSON.stringify(aprendiz)} size={250} />
      </View>
    </Container>
  );
};

export default UserQR;
