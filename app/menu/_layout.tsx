import "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import CustomHeader from "../menuSaia";

export default function DrawerLayout() {
  return (
    <Drawer screenOptions={{drawerPosition:"right", header: () => <CustomHeader/>}}>
  <Drawer.Screen name="homeUser" options={{ title: "Inicio" }} />
  <Drawer.Screen name="perfil" options={{ title: "Perfil" }} />
  <Drawer.Screen name="configuracion" options={{ title: "Configuración" }} />
</Drawer>
  )
}