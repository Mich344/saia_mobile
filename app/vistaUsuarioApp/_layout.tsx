import "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import CustomHeader from "../menuSaia";
import CustomDrawer from "@/app/menuLateral";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";

export default function DrawerLayout() {
  const [fontsLoaded] = useFonts({
    Calibri_BoldRegular: require("@/assets/fonts/calibri-bold-italic.ttf"),
    Calibri_Bold: require("@/assets/fonts/calibri-bold.ttf"),
    Calibri_Regular: require("@/assets/fonts/calibri-regular.ttf"),
    Calibri_Italic: require("@/assets/fonts/calibri-italic.ttf"),
    //
    WorkSans_Regular: require("@/assets/fonts/WorkSans-Regular.ttf"),
    WorkSans_Bold: require("@/assets/fonts/WorkSans-Bold.ttf"),
    WorkSans_ExtraBold: require("@/assets/fonts/WorkSans-ExtraBold.ttf"),
    WorkSans_Medium: require("@/assets/fonts/WorkSans-Medium.ttf"),
    WorkSans_SemiBold: require("@/assets/fonts/WorkSans-SemiBold.ttf"),
  });
  if (!fontsLoaded) return null;
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerPosition: "right",
        drawerType: "front",
        overlayColor: "rgba(0,0,0,0.3)",
        header: () => <CustomHeader />,
      }}
    >
      <Drawer.Screen
        name="homeUser"
        options={{
          drawerLabel: "Inicio",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="perfil"
        options={{
          drawerLabel: "Mi Perfil",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="userQR"
        options={{
          drawerLabel: "Mi Código QR",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="qr-code-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Insumo"
        options={{
          drawerLabel: "Mis Insumos",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="cube-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="reportes_Aprendiz"
        options={{
          drawerLabel: "Reportes",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="clipboard-outline" size={size} color={color} />
          ),
        }}
      />
       <Drawer.Screen
        name="recordatorio_View"
        options={{
          drawerLabel: "Recordatorios",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="duplicate-outline" size={size} color={color} />
          ),
        }}
      />

      {/* None */}

      <Drawer.Screen
        name="editarPerfil"
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />

      <Drawer.Screen
        name="cambiarPass"
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />

      <Drawer.Screen
        name="crearInsumo"
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />

      <Drawer.Screen
        name="editarInsumo"
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
      <Drawer.Screen
        name="recordatorio_Crear"
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
      <Drawer.Screen
        name="detalle_Recordatorio"
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
      <Drawer.Screen
        name="ayuda"
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
      <Drawer.Screen
        name="configuracion"
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
    </Drawer>
  );
}
