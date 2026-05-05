import "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer screenOptions={{drawerPosition:"right"}}>
  <Drawer.Screen name="homeUser" options={{ title: "Inicio" }} />
  <Drawer.Screen name="perfil" options={{ title: "Perfil" }} />
  <Drawer.Screen name="configuracion" options={{ title: "Configuración" }} />
</Drawer>
  )
}