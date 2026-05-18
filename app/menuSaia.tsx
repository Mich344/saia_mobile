import { View, Text, Pressable, TextInput, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

type DrawerNav = DrawerNavigationProp<any>;

export default function CustomHeader() {
  const navigation = useNavigation<DrawerNav>();

  return (
    <LinearGradient
      colors={["#32C7D3", "#2EE7B3"]}
      className="h-[220px] rounded-b-[30px] px-4 py-10 "
    >
      <View className="flex-row justify-between">
        <Text className="text-5xl">
          <Link href="/menu/homeUser"><Image source={require("@/img/Logo_SAIA_Blanco.png")} style={{width: 53, height: 53}} /></Link>
        </Text>

        <Pressable onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={40} className="mt-[0.4rem]" />
        </Pressable>
      </View>

      <View className="mt-8">
        <Text className="text-white font-WorkSansBold text-[20px]">BIENVENIDO A SAIA</Text>

        <Text className="text-white font-WorkSansMedium text-[12px]">Sistema de autogestion de ingreso para aprendices</Text>
      </View>
      <View className=" bg-white rounded-[20px] flex-row items-center px-5 ">
        <Ionicons name="search-outline" size={24} color="gray" />

        <TextInput
          placeholder="Buscar Insumo, reportes etc.."
          className="flex-1 ml-3 text-[18px]"
          placeholderTextColor="gray"
        />
      </View>
    </LinearGradient>
  );
}
