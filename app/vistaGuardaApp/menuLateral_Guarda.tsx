import React, { useCallback, useState, useEffect } from "react";
import { View, Text, Image, Pressable, ActivityIndicator } from "react-native";
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

import obtenerPerfilGuarda from "@/sql/Perfil_Guarda";
import ipconfig from "@/sql/ipconfig";

export default function CustomDrawer(props: any) {
  const [guarda, setGuarda] = useState<any>(null);
  const [cargando, setCargando] = useState(true);
  const [imagenPerfil, setImagenPerfil] = useState<string | null>(null);

  /* ============================================================
     CARGAR PERFIL DEL GUARDA DE SEGURIDAD
  ============================================================ */
  const cargarPerfilGuarda = useCallback(async () => {
    try {
      setCargando(true);

      // 1. Intento por servicio de backend
      const respuesta = await obtenerPerfilGuarda();

      if (respuesta.ok && respuesta.data?.guarda) {
        const datosGuarda = respuesta.data.guarda;
        setGuarda(datosGuarda);

        const imgRaw = datosGuarda.imagen || datosGuarda.foto || datosGuarda.foto_guarda;

        if (imgRaw) {
          const urlFinal = imgRaw.startsWith("http")
            ? imgRaw
            : `${ipconfig}${imgRaw.replace(/^\/+/, "")}`;
          setImagenPerfil(urlFinal);
        } else {
          setImagenPerfil(null);
        }
      } else {
        // 2. Fallback a AsyncStorage si falla el backend
        const datosLocal = await AsyncStorage.getItem("usuario");
        if (datosLocal) {
          const usr = JSON.parse(datosLocal);
          setGuarda(usr);
          if (usr.imagen) {
            const urlFinal = usr.imagen.startsWith("http")
              ? usr.imagen
              : `${ipconfig}${usr.imagen.replace(/^\/+/, "")}`;
            setImagenPerfil(urlFinal);
          }
        }
      }
    } catch (error) {
      console.log("Error cargando perfil del guarda en el Drawer:", error);
    } finally {
      setCargando(false);
    }
  }, []);

  /* ============================================================
     CARGAR CADA VEZ QUE EL DRAWER RECIBE FOCUS
  ============================================================ */
  useFocusEffect(
    useCallback(() => {
      cargarPerfilGuarda();
    }, [cargarPerfilGuarda])
  );

  // Nombre formateado para mostrar (ej: "Viviana Díaz")
  const nombreMostrar = guarda
    ? `${guarda.nombres?.split(" ")[0] || guarda.nombre?.split(" ")[0] || ""} ${
        guarda.p_ape || ""
      }`.trim()
    : "Guarda SAIA";

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
        {/* BOTÓN CERRAR DRAWER */}
        <Pressable
          onPress={() => props.navigation.closeDrawer()}
          style={{
            position: "absolute",
            right: 20,
            top: 55,
            zIndex: 10,
          }}
        >
          <Ionicons name="close" size={30} color="#FFFFFF" />
        </Pressable>

        {/* FOTO CIRCULAR DEL GUARDA */}
        <View
          style={{
            width: 105,
            height: 105,
            borderRadius: 60,
            justifyContent: "center",
            alignItems: "center",
            elevation: 8,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 8,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderWidth: 3,
            borderColor: "#FFFFFF",
            overflow: "hidden",
          }}
        >
          {cargando ? (
            <ActivityIndicator size="large" color="#FFFFFF" />
          ) : imagenPerfil ? (
            <Image
              source={{ uri: imagenPerfil }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
              }}
              resizeMode="cover"
            />
          ) : (
            <Ionicons name="person" size={54} color="#FFFFFF" />
          )}
        </View>

        {/* NOMBRE Y ROL DEL GUARDA */}
        <Text
          style={{
            marginTop: 14,
            color: "#FFF",
            fontSize: 20,
            fontFamily: "WorkSans_Bold",
            textAlign: "center",
            paddingHorizontal: 15,
          }}
          numberOfLines={1}
        >
          {nombreMostrar}
        </Text>

        <Text className="text-white/90 mt-1 text-[14px] font-semibold tracking-wider uppercase">
          {guarda?.empresa_seg || "Guarda de Seguridad"}
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
            onPress={() => router.push("/vistaGuardaApp/ayuda_Guarda")}
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