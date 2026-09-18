import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Switch,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Container from "@/components/Container";

// Claves para guardar en AsyncStorage
const KEYS = {
  MODO_OSCURO: "@saia_modo_oscuro",
  NOTIF_ALERTAS: "@saia_notif_alertas",
  NOTIF_INGRESOS: "@saia_notif_ingresos",
  BIOMETRIA: "@saia_biometria",
};

export default function ConfiguracionAprendizScreen() {
  const [cargando, setCargando] = useState(true);

  // ESTADOS PERSISTENTES
  const [modoOscuro, setModoOscuro] = useState(false);
  const [notifAlertas, setNotifAlertas] = useState(true);
  const [notifIngresos, setNotifIngresos] = useState(true);
  const [biometria, setBiometria] = useState(false);

  // Cargar configuraciones guardadas al abrir la pantalla
  useEffect(() => {
    cargarConfiguraciones();
  }, []);

  const cargarConfiguraciones = async () => {
    try {
      const [dark, alertas, ingresos, bio] = await Promise.all([
        AsyncStorage.getItem(KEYS.MODO_OSCURO),
        AsyncStorage.getItem(KEYS.NOTIF_ALERTAS),
        AsyncStorage.getItem(KEYS.NOTIF_INGRESOS),
        AsyncStorage.getItem(KEYS.BIOMETRIA),
      ]);

      if (dark !== null) setModoOscuro(JSON.parse(dark));
      if (alertas !== null) setNotifAlertas(JSON.parse(alertas));
      if (ingresos !== null) setNotifIngresos(JSON.parse(ingresos));
      if (bio !== null) setBiometria(JSON.parse(bio));
    } catch (error) {
      console.error("Error cargando configuración:", error);
    } finally {
      setCargando(false);
    }
  };

  // Función para guardar un cambio dinámicamente
  const guardarPreferencia = async (clave: string, valor: boolean, setter: (v: boolean) => void) => {
    try {
      setter(valor);
      await AsyncStorage.setItem(clave, JSON.stringify(valor));
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la preferencia.");
    }
  };

  // FUNCIÓN PARA CERRAR SESIÓN DE VERDAD
  const handleCerrarSesion = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de que deseas salir de tu cuenta de Aprendiz?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Cerrar Sesión",
          style: "destructive",
          onPress: async () => {
            try {
              // Limpiar credenciales y sesión
              await AsyncStorage.multiRemove(["token", "usuario", "rol"]);
              router.replace("/");
            } catch (e) {
              Alert.alert("Error", "Ocurrió un problema al cerrar la sesión.");
            }
          },
        },
      ]
    );
  };

  if (cargando) {
    return (
      <Container>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#059669" />
          <Text className="text-slate-500 text-[12px] mt-2">Cargando preferencias...</Text>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* ENCABEZADO */}
        <View className="flex-row items-center justify-between mt-2 mb-6">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 rounded-2xl bg-gray-100 items-center justify-center active:bg-gray-200"
          >
            <Ionicons name="arrow-back" size={20} color="#1E293B" />
          </Pressable>

          <Text className="text-[18px] font-bold text-slate-800">
            Configuración
          </Text>

          <View className="w-10" />
        </View>

        {/* SECCIÓN 1: CUENTA Y PERFIL */}
        <Text className="text-[14px] font-bold text-slate-800 mb-3 px-1">
          Mi Cuenta
        </Text>

        <View className="bg-white rounded-2xl border border-slate-100 mb-6 overflow-hidden">
          <Pressable
            onPress={() => router.push("./vistaAprendizApp/perfil")}
            className="flex-row items-center justify-between p-4 border-b border-slate-100 active:bg-slate-50"
          >
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-xl bg-emerald-50 items-center justify-center mr-3">
                <Ionicons name="person-outline" size={18} color="#059669" />
              </View>
              <View>
                <Text className="text-[13px] font-bold text-slate-800">
                  Información Personal
                </Text>
                <Text className="text-slate-400 text-[10px] mt-0.5">
                  Ver tus datos registrados en el centro
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </Pressable>

          <Pressable
            onPress={() => router.push("./vistaAprendizApp/insumos")}
            className="flex-row items-center justify-between p-4 active:bg-slate-50"
          >
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-xl bg-emerald-50 items-center justify-center mr-3">
                <Ionicons name="laptop-outline" size={18} color="#059669" />
              </View>
              <View>
                <Text className="text-[13px] font-bold text-slate-800">
                  Mis Equipos y Portátiles
                </Text>
                <Text className="text-slate-400 text-[10px] mt-0.5">
                  Administrar seriales autorizados
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </Pressable>
        </View>

        {/* SECCIÓN 2: NOTIFICACIONES */}
        <Text className="text-[14px] font-bold text-slate-800 mb-3 px-1">
          Notificaciones y Avisos
        </Text>

        <View className="bg-white rounded-2xl border border-slate-100 mb-6 overflow-hidden">
          <View className="flex-row items-center justify-between p-4 border-b border-slate-100">
            <View className="flex-row items-center flex-1 pr-2">
              <View className="w-8 h-8 rounded-xl bg-slate-100 items-center justify-center mr-3">
                <Ionicons name="log-in-outline" size={18} color="#059669" />
              </View>
              <View className="flex-1">
                <Text className="text-[13px] font-bold text-slate-800">
                  Confirmación de Entradas/Salidas
                </Text>
                <Text className="text-slate-400 text-[10px] mt-0.5">
                  Notificar cuando el guarda escanee tu QR
                </Text>
              </View>
            </View>
            <Switch
              value={notifIngresos}
              onValueChange={(v) => guardarPreferencia(KEYS.NOTIF_INGRESOS, v, setNotifIngresos)}
              trackColor={{ false: "#E2E8F0", true: "#A7F3D0" }}
              thumbColor={notifIngresos ? "#059669" : "#94A3B8"}
            />
          </View>

          <View className="flex-row items-center justify-between p-4">
            <View className="flex-row items-center flex-1 pr-2">
              <View className="w-8 h-8 rounded-xl bg-slate-100 items-center justify-center mr-3">
                <Ionicons name="notifications-outline" size={18} color="#059669" />
              </View>
              <View className="flex-1">
                <Text className="text-[13px] font-bold text-slate-800">
                  Anuncios Institucionales
                </Text>
                <Text className="text-slate-400 text-[10px] mt-0.5">
                  Alertas sobre el estado del centro o porterías
                </Text>
              </View>
            </View>
            <Switch
              value={notifAlertas}
              onValueChange={(v) => guardarPreferencia(KEYS.NOTIF_ALERTAS, v, setNotifAlertas)}
              trackColor={{ false: "#E2E8F0", true: "#A7F3D0" }}
              thumbColor={notifAlertas ? "#059669" : "#94A3B8"}
            />
          </View>
        </View>

        {/* SECCIÓN 3: SEGURIDAD DE LA APP */}
        <Text className="text-[14px] font-bold text-slate-800 mb-3 px-1">
          Seguridad y Preferencias
        </Text>

        <View className="bg-white rounded-2xl border border-slate-100 mb-6 overflow-hidden">
          <View className="flex-row items-center justify-between p-4 border-b border-slate-100">
            <View className="flex-row items-center flex-1 pr-2">
              <View className="w-8 h-8 rounded-xl bg-slate-100 items-center justify-center mr-3">
                <Ionicons name="finger-print-outline" size={18} color="#059669" />
              </View>
              <View className="flex-1">
                <Text className="text-[13px] font-bold text-slate-800">
                  Desbloqueo Biométrico
                </Text>
                <Text className="text-slate-400 text-[10px] mt-0.5">
                  Requerir Huella o Face ID para abrir tu carnet
                </Text>
              </View>
            </View>
            <Switch
              value={biometria}
              onValueChange={(v) => guardarPreferencia(KEYS.BIOMETRIA, v, setBiometria)}
              trackColor={{ false: "#E2E8F0", true: "#A7F3D0" }}
              thumbColor={biometria ? "#059669" : "#94A3B8"}
            />
          </View>

          <View className="flex-row items-center justify-between p-4">
            <View className="flex-row items-center flex-1 pr-2">
              <View className="w-8 h-8 rounded-xl bg-slate-100 items-center justify-center mr-3">
                <Ionicons name="moon-outline" size={18} color="#059669" />
              </View>
              <View className="flex-1">
                <Text className="text-[13px] font-bold text-slate-800">
                  Modo Oscuro
                </Text>
                <Text className="text-slate-400 text-[10px] mt-0.5">
                  Cambiar la paleta de colores de la app
                </Text>
              </View>
            </View>
            <Switch
              value={modoOscuro}
              onValueChange={(v) => guardarPreferencia(KEYS.MODO_OSCURO, v, setModoOscuro)}
              trackColor={{ false: "#E2E8F0", true: "#A7F3D0" }}
              thumbColor={modoOscuro ? "#059669" : "#94A3B8"}
            />
          </View>
        </View>

        {/* SECCIÓN 4: CERRAR SESIÓN */}
        <Pressable
          onPress={handleCerrarSesion}
          className="bg-rose-50 border border-rose-100 rounded-2xl p-4 flex-row items-center justify-between active:bg-rose-100 mb-6"
        >
          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-xl bg-rose-100 items-center justify-center mr-3">
              <Ionicons name="log-out-outline" size={18} color="#E11D48" />
            </View>
            <Text className="text-[13px] font-bold text-rose-700">
              Cerrar Sesión
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#E11D48" />
        </Pressable>

        {/* PIE DE PANTALLA */}
        <View className="items-center">
          <Text className="text-slate-400 text-[11px] font-medium">
            SAIA Aprendiz v1.0.0
          </Text>
          <Text className="text-slate-300 text-[10px] mt-0.5">
            SENA • Sistema de Acceso e Identificación
          </Text>
        </View>
      </ScrollView>
    </Container>
  );
}