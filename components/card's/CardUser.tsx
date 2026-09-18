import { View, Text, Image } from "react-native";
import TextGradient from "@/components/GradientP";

type DatosUser = {
  nombreUser: string;
  imageUser: any;
  ficha: number;
};
const CardUser = ({ nombreUser, imageUser, ficha }: DatosUser) => {
  return (
    <>
      <View className="mb-7">
        <TextGradient
          text="BIENVENIDO A SAIA"
          fontWeight="bold"
          fontSize={30}
        />
        <Text className="font-calibriBold text-xl">
          Sistema de Autogestión de ingreso para aprendices
        </Text>
      </View>

      <View className="rounded-2xl mr-4 flex-row items-center p-[6px] bg-[#F4FBFC] shadow shadow-black elevation-lg">
        <Image
          source={imageUser}
          style={{ width: 85, height: 85 }}
          className=" rounded-[50px] shadow elevation-lg bg-white ml-2"
        />
        <View className="ml-4 flex-1">
          <Text className="font-calibriBold text-[25px]">
            Hola, {nombreUser}
          </Text>
          <Text>Centro de Electricidad y Automatización Industrial</Text>
          <Text className="border border-[#D8F4E8]/100 w-28 p-1 rounded-md bg-[#D8F4E8] text-[green] mt-2">
            Ficha: <Text className="font-calibriBold">{ficha}</Text>
          </Text>
        </View>
      </View>
    </>
  );
};

export default CardUser;
