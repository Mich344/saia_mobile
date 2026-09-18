import "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import CustomHeader from "./menu_Saia";
import CustomDrawer from "./menuLateral_Guarda";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";

export default function DrawerLayout() {
  const [fontsLoaded] = useFonts({
    Calibri_BoldRegular: require("@/assets/fonts/calibri-bold-italic.ttf"),
    Calibri_Bold: require("@/assets/fonts/calibri-bold.ttf"),
    Calibri_Regular: require("@/assets/fonts/calibri-regular.ttf"),
    Calibri_Italic: require("@/assets/fonts/calibri-italic.ttf"),
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
        // 🔑 IMPORTANTE: Por defecto ocultamos los items no mapeados explícitamente
        drawerItemStyle: { display: "none" },
      }}
    >
      {/* ======================================================
          1. PANTALLAS VISIBLES EN EL MENÚ LATERAL
      ====================================================== */}
      <Drawer.Screen
        name="home"
        options={{
          drawerLabel: "Inicio",
          drawerItemStyle: { display: "flex" }, // Mostrar explícitamente
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="perfil_Guarda"
        options={{
          drawerLabel: "Mi Perfil",
          drawerItemStyle: { display: "flex" },
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="escaner_QR"
        options={{
          drawerLabel: "Escanear QR",
          drawerItemStyle: { display: "flex" },
          drawerIcon: ({ color, size }) => (
            <Ionicons name="qr-code-outline" size={size} color={color} />
          ),
        }}
      />


     
      {/* ======================================================
          2. PANTALLAS OCULTAS DEL MENÚ (Rutas navegables)
      ====================================================== */}
      <Drawer.Screen
        name="consulta"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />

      <Drawer.Screen
        name="info_Usuario"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />

      <Drawer.Screen
        name="Inic_Turn_Guarda"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />

      <Drawer.Screen
        name="detalle_Aprendiz"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />

      <Drawer.Screen
        name="solicitud_Salida"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
    </Drawer>
  );
}