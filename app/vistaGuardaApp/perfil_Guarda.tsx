import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import Container from "@/components/Container";
import Back from "@/components/molecules/Back";
import obtenerPerfilGuarda from "@/sql/Perfil_Guarda";
import ipconfig from "@/sql/ipconfig";
import { router } from "expo-router";

export default function VistaGuarda() {
  const [guarda, setGuarda] = useState<any>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    cargarPerfil();
  }, []);

  const cargarPerfil = async () => {
    setCargando(true);
    setError(null);

    try {
      const respuesta = await obtenerPerfilGuarda();

      if (respuesta.ok && respuesta.data?.ok) {
        setGuarda(respuesta.data.guarda);
      } else {
        setError(
          respuesta.data?.mensaje ||
            "Error al obtener la información del guarda."
        );
      }
    } catch (err) {
      setError("Error de conexión al obtener el perfil.");
    } finally {
      setCargando(false);
    }
  };

  // ============================================================
  // ESTADO DE CARGA
  // ============================================================
  if (cargando) {
    return (
      <Container>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#37D9C1" />
          <Text className="mt-3 text-slate-500 text-sm font-medium">
            Cargando perfil del guarda...
          </Text>
        </View>
      </Container>
    );
  }

  // ============================================================
  // ESTADO DE ERROR
  // ============================================================
  if (error || !guarda) {
    return (
      <Container>
        <Back title="Perfil del guarda" subtitle="Error" />
        <View className="flex-1 items-center justify-center px-6">
          <View className="w-20 h-20 rounded-full bg-red-50 items-center justify-center mb-4">
            <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
          </View>
          <Text className="text-[#111827] text-lg text-center font-bold">
            ¡Ups! Ocurrió un problema
          </Text>
          <Text className="text-slate-500 text-sm text-center mt-1">
            {error || "No se pudo recuperar la información requerida."}
          </Text>
        </View>
      </Container>
    );
  }

  // CONSTRUCCIÓN DE VALORES Y NOMBRE DE CAMPOS
  const nombreCompleto =
    `${guarda.nombres || guarda.nombre || ""} ${guarda.p_ape || ""}`.trim();

  // Resolución de ruta de imagen (Absoluta o con servidor ipconfig)
  const rawImagen = guarda.imagen || guarda.foto || guarda.foto_guarda;
  const urlImagenFinal = rawImagen
    ? rawImagen.startsWith("http")
      ? rawImagen
      : `${ipconfig}${rawImagen.replace(/^\/+/, "")}`
    : null;

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 6,
          paddingTop: 5,
          paddingBottom: 40,
        }}
      >
        {/* ======================================================
            HEADER
        ====================================================== */}
        <Back
          title="Perfil"
          subtitle="Credencial digital e información del personal."
          onPress={() => router.replace("/vistaGuardaApp/home")}
        />

        {/* ======================================================
            TARJETA CREDENCIAL PRINCIPAL
        ====================================================== */}
        <View
          className="bg-white rounded-[32px] border border-slate-100 overflow-hidden mt-20"
          style={{
            shadowColor: "#0F172A",
            shadowOpacity: 0.06,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 6 },
            elevation: 5,
          }}
        >
          {/* BANNER INSTITUCIONAL */}
          <View className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex-row items-center justify-between">
            <View className="flex-row items-center space-x-3">
              <Image
                source={require("@/img/logo_SAIA.png")}
                style={{
                  width: 40,
                  height: 40,
                  resizeMode: "contain",
                }}
              />
              <View className="ml-2">
                <Text
                  className="text-[13px] text-slate-800 font-bold leading-tight"
                  style={{ fontFamily: "WorkSans_Bold" }}
                >
                  SAIA
                </Text>
                <Text
                  className="text-[11px] text-emerald-600 font-semibold tracking-wider uppercase"
                  style={{ fontFamily: "WorkSans_SemiBold" }}
                >
                  Sistema SAIA • Seguridad
                </Text>
              </View>
            </View>
          </View>

          {/* AVATAR + INSIGNIA */}
          <View className="items-center mt-6">
            <View className="relative">
              <View
                style={{
                  width: 116,
                  height: 116,
                  borderRadius: 58,
                  borderWidth: 3,
                  borderColor: "#37D9C1",
                  padding: 3,
                  backgroundColor: "#FFFFFF",
                }}
              >
                {urlImagenFinal ? (
                  <Image
                    source={{ uri: urlImagenFinal }}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 50,
                    }}
                    resizeMode="cover"
                  />
                ) : (
                  <View
                    className="flex-1 items-center justify-center bg-slate-100"
                    style={{ borderRadius: 50 }}
                  >
                    <Ionicons name="person" size={54} color="#94A3B8" />
                  </View>
                )}
              </View>

              {/* Check de verificación */}
              <View className="absolute bottom-0 right-0 bg-[#111B5E] border-2 border-white rounded-full p-1.5 items-center justify-center">
                <Ionicons name="shield-checkmark" size={16} color="#37D9C1" />
              </View>
            </View>
          </View>

          {/* NOMBRE Y CARGO */}
          <View className="items-center px-6 mt-3">
            <Text
              className="text-[21px] text-slate-900 text-center"
              style={{ fontFamily: "WorkSans_Bold" }}
            >
              {nombreCompleto || "Guarda de Seguridad"}
            </Text>

            <View className="bg-indigo-50 px-3 py-1 rounded-full mt-1.5 border border-indigo-100/60">
              <Text
                className="text-[12px] text-[#111B5E]"
                style={{ fontFamily: "WorkSans_SemiBold" }}
              >
                {guarda.empresa_seg || "Personal de Vigilancia"}
              </Text>
            </View>
          </View>

          {/* ====================================================
              BLOQUES DE INFORMACIÓN (GRID 2 COLUMNAS / FILAS)
          ==================================================== */}
          <View className="p-5 space-y-3">
            {/* FILA 1: Documento y Teléfono */}
            <View className="flex-row space-x-3">
              <View className="flex-1 bg-slate-50 border border-slate-100 p-3.5 rounded-2xl flex-row items-center">
                <View className="w-9 h-9 rounded-xl bg-emerald-100/70 items-center justify-center mr-3">
                  <Ionicons name="card-outline" size={18} color="#059669" />
                </View>
                <View className="flex-1">
                  <Text className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                    Documento
                  </Text>
                  <Text
                    className="text-[13px] text-slate-800 mt-0.5"
                    style={{ fontFamily: "WorkSans_Bold" }}
                    numberOfLines={1}
                  >
                    {guarda.num_doc || guarda.documento || "Sin registrar"}
                  </Text>
                </View>
              </View>

              <View className="flex-1 bg-slate-50 border border-slate-100 p-3.5 rounded-2xl flex-row items-center ml-2">
                <View className="w-9 h-9 rounded-xl bg-emerald-100/70 items-center justify-center mr-3">
                  <Ionicons name="call-outline" size={18} color="#059669" />
                </View>
                <View className="flex-1">
                  <Text className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                    Teléfono
                  </Text>
                  <Text
                    className="text-[13px] text-slate-800 mt-0.5"
                    style={{ fontFamily: "WorkSans_Bold" }}
                    numberOfLines={1}
                  >
                    {guarda.tel || guarda.telefono || "Sin registrar"}
                  </Text>
                </View>
              </View>
            </View>

            {/* FILA 2: Correo (Ancho completo) */}
            <View className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl flex-row items-center mt-2">
              <View className="w-9 h-9 rounded-xl bg-emerald-100/70 items-center justify-center mr-3">
                <Ionicons name="mail-outline" size={18} color="#059669" />
              </View>
              <View className="flex-1">
                <Text className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                  Correo Electrónico
                </Text>
                <Text
                  className="text-[13px] text-slate-800 mt-0.5"
                  style={{ fontFamily: "WorkSans_Bold" }}
                  numberOfLines={1}
                >
                  {guarda.email || guarda.correo || "Sin registrar"}
                </Text>
              </View>
            </View>

            {/* FILA 3: Turno de trabajo */}
            <View className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl flex-row items-center mt-2">
              <View className="w-9 h-9 rounded-xl bg-emerald-100/70 items-center justify-center mr-3">
                <Ionicons name="time-outline" size={18} color="#059669" />
              </View>
              <View className="flex-1">
                <Text className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                  Turno y Horario
                </Text>
                <Text
                  className="text-[13px] text-slate-800 mt-0.5"
                  style={{ fontFamily: "WorkSans_Bold" }}
                >
                  {guarda.turno || "Turno asignado"}
                  {guarda.inicio_turno && guarda.finalizacion_turno
                    ? ` (${guarda.inicio_turno} - ${guarda.finalizacion_turno})`
                    : ""}
                </Text>
              </View>
            </View>

            {/* OBSERVACIÓN */}
            {guarda.observacion && (
              <View className="bg-amber-50/60 border border-amber-200/60 p-3 rounded-2xl flex-row items-start mt-2">
                <Ionicons
                  name="information-circle-outline"
                  size={18}
                  color="#D97706"
                  style={{ marginTop: 2, marginRight: 8 }}
                />
                <View className="flex-1">
                  <Text className="text-[10px] text-amber-700 font-semibold uppercase">
                    Observaciones de turno
                  </Text>
                  <Text className="text-[12px] text-slate-700 mt-0.5">
                    {guarda.observacion}
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* ====================================================
              TARJETA DE CÓDIGO DE IDENTIFICACIÓN (FOOTER)
          ==================================================== */}
          <View className="p-3 pt-0">
            <View className="bg-[#111B5E] rounded-[22px] px-4 py-3.5 flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <View className="w-10 h-10 bg-white/10 rounded-xl items-center justify-center border border-white/10">
                  <MaterialCommunityIcons
                    name="shield-account"
                    size={24}
                    color="#37D9C1"
                  />
                </View>
                <View className="ml-3 flex-1">
                  <Text className="text-white/70 text-[10px] font-medium tracking-wide uppercase">
                    Código Interno Guarda
                  </Text>
                  <Text
                    className="text-[#37D9C1] text-[14px] mt-0.5"
                    style={{ fontFamily: "WorkSans_Bold" }}
                  >
                    {`ID-GUARDA-${guarda.id_guarda || guarda.id || "001"}`}
                  </Text>
                </View>
              </View>

              <Ionicons name="qr-code-outline" size={24} color="#FFFFFF" />
            </View>
          </View>
        </View>

        {/* INDICADOR DE ESTADO EN VIVO */}
        <View className="flex-row items-center justify-center mt-6">
          <View className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-2" />
          <Text
            className="text-emerald-700 text-[12px] font-semibold tracking-wide"
            style={{ fontFamily: "WorkSans_SemiBold" }}
          >
            GUARDA ACTIVO
          </Text>
        </View>
      </ScrollView>
    </Container>
  );
}