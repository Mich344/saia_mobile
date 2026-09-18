import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Image, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import obtenerPerfilGuarda from "@/sql/Perfil_Guarda";
import ipconfig from "@/sql/ipconfig";

type DrawerNav = DrawerNavigationProp<any>;

export default function CustomHeader() {
  const navigation = useNavigation<DrawerNav>();
  const [guarda, setGuarda] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarDatosGuarda();
  }, []);

  const cargarDatosGuarda = async () => {
    try {
      const respuesta = await obtenerPerfilGuarda();
      if (respuesta.ok && respuesta.data?.ok) {
        setGuarda(respuesta.data.guarda);
      }
    } catch (error) {
      console.log("Error al cargar perfil del guarda:", error);
    } finally {
      setCargando(false);
    }
  };

  // Evalúa las posibles claves donde venga la ruta de la imagen
  const rawImagen = guarda?.imagen || guarda?.foto || guarda?.foto_guarda;

  // Si la ruta no empieza por http, se le antepone el ipconfig del servidor
  const urlImagen = rawImagen
    ? rawImagen.startsWith("http")
      ? rawImagen
      : `${ipconfig}${rawImagen.replace(/^\/+/, "")}`
    : null;

  // Construir nombre formateado (ej: "Viviana Díaz")
  const nombreMostrar = guarda
    ? `${guarda.nombres?.split(" ")[0] || guarda.nombre?.split(" ")[0] || ""} ${guarda.p_ape || ""}`.trim()
    : "Guarda de Seguridad";

  return (
    <LinearGradient
      colors={["#2EC4B6", "#37D9C1", "#48B88E"]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      className="px-4 pt-10 pb-4 shadow-sm"
    >
      <View className="flex-row items-center justify-between">
        {/* ======================================================
            SECCIÓN IZQUIERDA: AVATAR Y DATOS DEL GUARDA
        ====================================================== */}
        <Pressable
          onPress={() => router.push("/perfil_Guarda" as any)}
          className="flex-row items-center flex-1 mr-3"
        >
          {/* CONTENEDOR CIRCULAR DE LA FOTO */}
          <View className="w-14 h-14 rounded-full border-2 border-white overflow-hidden bg-white/20 justify-center items-center shadow-md">
            {cargando ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : urlImagen ? (
              <Image
                source={{ uri: urlImagen }}
                style={{ width: "100%", height: "100%", borderRadius: 9999 }}
                resizeMode="cover"
              />
            ) : (
              <Ionicons name="person" size={28} color="#FFFFFF" />
            )}
          </View>

          {/* TEXTO DE NOMBRE Y CARGO */}
          <View className="ml-3 flex-1">
            <Text
              className="text-white text-[20px] leading-tight"
              style={{ fontFamily: "WorkSans_Bold" }}
              numberOfLines={1}
            >
              {nombreMostrar}
            </Text>
            <Text
              className="text-white/90 text-[13px] mt-0.5"
              style={{ fontFamily: "WorkSans_Regular" }}
              numberOfLines={1}
            >
              {guarda?.empresa_seg || "Guarda de seguridad"}
            </Text>
          </View>
        </Pressable>

        {/* ======================================================
            SECCIÓN DERECHA: BOTÓN MENÚ DRAWER
        ====================================================== */}
        <Pressable
          onPress={() => navigation.openDrawer()}
          className="w-12 h-12 rounded-full bg-white/20 items-center justify-center active:bg-white/30"
        >
          <Ionicons name="menu-outline" size={28} color="#FFFFFF" />
        </Pressable>
      </View>
    </LinearGradient>
  );
}