import React, { useCallback, useState, useEffect } from "react";
import { View, Text, Image, Pressable, DeviceEventEmitter } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Svg, Path } from "react-native-svg";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import consultarPerfil from "@/sql/Consultar_Datos_Perfil_Aprendiz";
import ipconfig from "@/sql/ipconfig";
import { NOTIFICAR_CAMBIO_FOTO } from "@/hooks/utils/eventos";

export default function CustomDrawer(props: any) {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [nombre, setNombre] = useState("");
  const [imagenPerfil, setImagenPerfil] = useState<string | null>(null);

  /* ============================================================
     CARGAR DATOS DEL USUARIO DESDE ASYNCSTORAGE
  ============================================================ */
  const cargarDatosUsuario = async () => {
    try {
      const datos = await AsyncStorage.getItem("usuario");
      if (datos) {
        const usuario = JSON.parse(datos);
        const nombre = [usuario.nombres, usuario.p_ape, usuario.s_ape]
          .filter(Boolean)
          .join(" ");
        setNombreCompleto(nombre);
      }
    } catch (error) {
      console.log("Error cargando datos del usuario:", error);
    }
  };

  /* ============================================================
     CARGAR PERFIL ACTUALIZADO DESDE LA API
  ============================================================ */
  const cargarPerfil = useCallback(async () => {
    try {
      console.log("🔥 CUSTOM DRAWER: REFRESCANDO PERFIL EN VIVO");
      const respuesta = await consultarPerfil();

      if (!respuesta.ok) return;

      const usuario = respuesta.data?.usuario;
      if (!usuario) return;

      if (usuario.nombre) {
        setNombre(usuario.nombre);
      }

      if (usuario.imagen) {
        const imagen = usuario.imagen;
        // Agregamos un timestamp `?t=` para romper el caché de la imagen en React Native
        const urlBase = imagen.startsWith("http")
          ? imagen
          : `${ipconfig}${imagen.replace(/^\/+/, "")}`;
        
        const imagenURL = `${urlBase}?timestamp=${new Date().getTime()}`;
        setImagenPerfil(imagenURL);
      } else {
        setImagenPerfil(null);
      }
    } catch (error) {
      console.log("❌ ERROR CARGANDO PERFIL EN DRAWER:", error);
    }
  }, []);

  /* ============================================================
     ESCUCHAR EVENTO DE CAMBIO DE FOTO EN TIEMPO REAL
  ============================================================ */
  useEffect(() => {
    cargarDatosUsuario();
    cargarPerfil();

    // Escuchar el evento emitido desde la pantalla de edición de perfil
    const subscripcion = DeviceEventEmitter.addListener(
      NOTIFICAR_CAMBIO_FOTO,
      () => {
        cargarPerfil();
      }
    );

    return () => {
      subscripcion.remove();
    };
  }, [cargarPerfil]);

  /* ============================================================
     REFRESCAR PERFIL CADA VEZ QUE SE ABRE O ENFOCA EL DRAWER
  ============================================================ */
  useFocusEffect(
    useCallback(() => {
      cargarPerfil();
    }, [cargarPerfil])
  );

  const imagenMostrar = imagenPerfil
    ? { uri: imagenPerfil }
    : require("@/img/avatar-placeholder.png");

  return (
    <View className="flex-1 bg-[#F7F9FC]">
      {/* =========================
            HEADER
      ========================== */}
      <LinearGradient
        colors={["#3DDBB8", "#32C7D3"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          paddingTop: 55,
          paddingBottom: 0,
          alignItems: "center",
        }}
      >
        {/* CERRAR */}
        <Pressable
          onPress={() => props.navigation.closeDrawer()}
          style={{
            position: "absolute",
            right: 20,
            top: 55,
          }}
        >
          <Ionicons name="close" size={30} color="#111" />
        </Pressable>

        {/* FOTO CON BUSTER DE CACHÉ */}
        <View
          style={{
            width: 110,
            height: 110,
            borderRadius: 60,
            justifyContent: "center",
            alignItems: "center",
            elevation: 7,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 8,
            overflow: "hidden",
            backgroundColor: "#FFFFFF",
          }}
        >
          <Image
            source={imagenMostrar}
            style={{
              width: 110,
              height: 110,
              borderRadius: 55,
            }}
            resizeMode="cover"
          />
        </View>

        {/* NOMBRE */}
        <Text
          style={{
            marginTop: 18,
            color: "#FFF",
            fontSize: 22,
            fontFamily: "WorkSans_Bold",
          }}
        >
          {nombreCompleto || "Aprendiz"}
        </Text>

        {/* ROL */}
        <Text className="text-white mt-1 text-[20px] font-calibriBold">
          S.A.I.A
        </Text>

        {/* OLA DECORATIVA */}
        <View
          style={{
            marginTop: 18,
            width: "100%",
            height: 90,
          }}
        >
          <Svg
            viewBox="0 0 390 80"
            width="100%"
            height={90}
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            <Path
              d="M-50,70 C80,-5 110,0 195,30 C250,50 260,75 395,12 L395,80 L-5 80 Z"
              fill="#FFFFFF"
              fillOpacity={0.75}
            />
            <Path
              d="M-50,90 C110,5 130,10 200,40 C240,60 260,85 395,10 L395,80 L-5,80 Z"
              fill="#F7F9FC"
            />
          </Svg>
        </View>
      </LinearGradient>

      {/* =========================
            MENU ITEMS
      ========================== */}
      <DrawerContentScrollView
        {...props}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 0,
        }}
      >
        <Text
          style={{
            marginLeft: 24,
            marginBottom: 12,
            color: "#A3A3A3",
            fontWeight: "700",
            letterSpacing: 1,
          }}
        >
          PRINCIPAL
        </Text>

        <View
          style={{
            backgroundColor: "#FFFFFF",
            marginHorizontal: 14,
            borderRadius: 20,
            paddingVertical: 8,
            elevation: 2,
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowRadius: 5,
          }}
        >
          <DrawerItemList {...props} />
        </View>

        <Text
          style={{
            marginLeft: 24,
            marginTop: 28,
            marginBottom: 12,
            color: "#A3A3A3",
            fontWeight: "700",
            letterSpacing: 1,
          }}
        >
          HERRAMIENTAS
        </Text>

        <View
          style={{
            backgroundColor: "#FFFFFF",
            marginHorizontal: 14,
            borderRadius: 20,
            paddingVertical: 5,
            elevation: 2,
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowRadius: 5,
          }}
        >
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 16,
              paddingHorizontal: 20,
            }}
          >
            <Ionicons name="notifications-outline" size={22} color="#444" />
            <Text
              style={{
                marginLeft: 18,
                fontSize: 16,
                color: "#222",
                fontWeight: "600",
              }}
            >
              Notificaciones - <Text className="text-[12px] text-emerald-500">(Prióximamente)</Text>
            </Text>
          </Pressable>

          <View
            style={{
              height: 1,
              backgroundColor: "#EFEFEF",
              marginHorizontal: 20,
            }}
          />

          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 16,
              paddingHorizontal: 20,
            }}
            onPress={() => router.push("/vistaUsuarioApp/configuracion")}
          >
            <Ionicons name="settings-outline" size={22} color="#444" />
            <Text
              style={{
                marginLeft: 18,
                fontSize: 16,
                color: "#222",
                fontWeight: "600",
              }}
            >
              Configuración - <Text className="text-[12px] text-emerald-500">(Prióximamente)</Text>
            </Text>
          </Pressable>

          <View
            style={{
              height: 1,
              backgroundColor: "#EFEFEF",
              marginHorizontal: 20,
            }}
          />

          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 16,
              paddingHorizontal: 20,
            }}
            onPress={() => router.push("/vistaUsuarioApp/ayuda")}
          >
            <Ionicons name="help-circle-outline" size={22} color="#444" />
            <Text
              style={{
                marginLeft: 18,
                fontSize: 16,
                color: "#222",
                fontWeight: "600",
              }}
            >
              Ayuda
            </Text>
          </Pressable>
        </View>
      </DrawerContentScrollView>

      {/* =========================
            FOOTER: CERRAR SESIÓN
      ========================== */}
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: "#ECECEC",
          paddingHorizontal: 22,
          paddingVertical: 25,
          backgroundColor: "#FFF",
        }}
      >
        <Pressable
          onPress={async () => {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("usuario");
            router.replace("/");
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 45,
              height: 45,
              borderRadius: 14,
              backgroundColor: "#FFECEC",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="log-out-outline" size={24} color="#FF4D4F" />
          </View>

          <View style={{ marginLeft: 15 }}>
            <Text
              style={{
                color: "#FF4D4F",
                fontSize: 17,
                fontWeight: "700",
              }}
            >
              Cerrar sesión
            </Text>
            <Text
              style={{
                color: "#999",
                fontSize: 13,
                marginTop: 2,
              }}
            >
              Finalizar sesión segura
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}