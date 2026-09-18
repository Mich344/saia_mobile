import { View, Text, Pressable, TextInput, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";

type DrawerNav = DrawerNavigationProp<any>;

export default function CustomHeader() {
  const navigation = useNavigation<DrawerNav>();

  return (
    <LinearGradient
      colors={["#32C7D3", "#2EE7B3"]}
      style={{ borderBottomEndRadius: 10 }}
      className="h-auto px-4 py-5  "
    >
      <View className="flex-row justify-between mt-5">
        <Text className="text-5xl">
          <Pressable
            onPress={() => router.replace("/vistaUsuarioApp/homeUser")}
          >
            <Image
              source={require("@/img/Logo_SAIA_Blanco.png")}
              style={{ width: 53, height: 53 }}
            />
          </Pressable>
        </Text>

        <Pressable onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={40} className="mt-[0.4rem]" />
        </Pressable>
      </View>

      {/* <View className=" bg-white rounded-[20px] flex-row items-center px-5 ">
        <Ionicons name="search-outline" size={24} color="gray" />

        <TextInput
          placeholder="Buscar Insumo, reportes etc.."
          className="flex-1 ml-3 text-[18px]"
          placeholderTextColor="gray"
        />
      </View> */}
    </LinearGradient>
  );
}
