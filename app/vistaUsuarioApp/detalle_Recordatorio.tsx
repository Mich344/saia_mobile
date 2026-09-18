import { useEffect, useState } from "react";
import { View, Text, Pressable, Linking, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import Container from "@/components/Container";
import Back from "@/components/molecules/Back";

import Vista_Detalle_Recordatorio from "@/sql/Vista_Detalle_Recordatorio";

export default function DetalleRecordatorio() {
  const { id } = useLocalSearchParams();
  const [recordatorio, setRecordatorio] = useState<any>(null);

  useEffect(() => {
    cargarRecordatorio();
  }, [id]);

  const cargarRecordatorio = async () => {
    const respuesta = await Vista_Detalle_Recordatorio(Number(id));
    if (respuesta?.ok) {
      setRecordatorio(respuesta.data?.recordatorio);
    }
  };

  if (!recordatorio) {
    return (
      <Container>
        <Back title="Cargando..." onPress={() => router.back()} subtitle="Por favor espera" />
        <View className="flex-1 justify-center items-center mt-20">
          <ActivityIndicator size="large" color="#007A4E" />
          <Text className="text-gray-400 mt-3 text-xs font-medium">
            Obteniendo detalles del recordatorio...
          </Text>
        </View>
      </Container>
    );
  }

  // 1. FORMATEO SEGURO DE FECHA
  let fechaTexto = "Sin fecha asignada";
  if (recordatorio?.fecha_limite) {
    const fecha = new Date(recordatorio.fecha_limite);
    if (!isNaN(fecha.getTime())) {
      fechaTexto = fecha.toLocaleDateString("es-CO", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
  }

  // 2. FORMATEO SEGURO DE HORA
  const horaTexto = recordatorio?.hora_limite
    ? `${recordatorio.hora_limite.toString().substring(0, 5)} hrs`
    : "Sin hora asignada";

  const prioridades = {
    1: {
      nombre: "Alta",
      color: "#EF4444",
      bgColor: "#FEF2F2",
      borderColor: "#FCA5A5",
      icono: "fire",
    },
    2: {
      nombre: "Media",
      color: "#D97706",
      bgColor: "#FFFBEB",
      borderColor: "#FCD34D",
      icono: "clock-fast",
    },
    3: {
      nombre: "Baja",
      color: "#16A34A",
      bgColor: "#F0FDF4",
      borderColor: "#86EFAC",
      icono: "leaf",
    },
  };

  const prioridad =
    prioridades[recordatorio.prioridad as keyof typeof prioridades] ||
    prioridades[2];

  return (
    <Container>
      {/* 1. HEADER DE NAVEGACIÓN */}
      <Back
        title="Detalle Del Recordatorio"
        subtitle="Información de la actividad."
        onPress={() => router.replace("/vistaUsuarioApp/recordatorio_View")}
      />

      <ScrollView showsVerticalScrollIndicator={false} className="mt-20">
        {/* 2. INSIGNIA DE PRIORIDAD (Banner destacado) */}
        <View
          style={{
            backgroundColor: prioridad.bgColor,
            borderColor: prioridad.borderColor,
          }}
          className="rounded-2xl p-4 border flex-row items-center justify-between mb-10 shadow-sm"
        >
          <View className="flex-row items-center">
            <View
              style={{ backgroundColor: prioridad.color }}
              className="w-10 h-10 rounded-xl justify-center items-center mr-3 shadow-xs"
            >
              <MaterialCommunityIcons
                name={prioridad.icono as any}
                color="white"
                size={22}
              />
            </View>
            <View>
              <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Nivel de Prioridad
              </Text>
              <Text
                style={{ color: prioridad.color }}
                className="font-bold text-base capitalize"
              >
                {prioridad.nombre}
              </Text>
            </View>
          </View>

          <View
            style={{ backgroundColor: prioridad.color }}
            className="px-3 py-1 rounded-full"
          >
            <Text className="text-white text-xs font-bold uppercase">
              {prioridad.nombre}
            </Text>
          </View>
        </View>

        {/* 3. TARJETA PRINCIPAL DE DETALLES */}
        <View className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          {/* Título */}
          <Text className="font-bold text-2xl text-gray-800 leading-tight">
            {recordatorio.titulo || "Sin título"}
          </Text>

          <View className="w-full h-px bg-gray-100 my-5" />

          {/* Descripción */}
          <View className="mb-6">
            <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Descripción
            </Text>
            <Text className="text-gray-700 text-base leading-6 bg-gray-50 p-4 rounded-2xl border border-gray-100">
              {recordatorio.descripcion || "Sin descripción asignada para esta actividad."}
            </Text>
          </View>

          {/* Fecha y Hora */}
          <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            Programación
          </Text>

          <View className="bg-gray-50 rounded-2xl p-4 border border-gray-100 gap-4 mb-6">
            {/* Fecha */}
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-xl bg-[#E6F4EF] justify-center items-center mr-3">
                <Ionicons name="calendar" size={20} color="#007A4E" />
              </View>
              <View className="flex-1">
                <Text className="text-xs text-gray-400 font-semibold">
                  Fecha límite
                </Text>
                <Text className="text-sm font-bold text-gray-800 capitalize">
                  {fechaTexto}
                </Text>
              </View>
            </View>

            <View className="w-full h-px bg-gray-200/60" />

            {/* Hora */}
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-xl bg-[#E6F4EF] justify-center items-center mr-3">
                <Ionicons name="time" size={20} color="#007A4E" />
              </View>
              <View className="flex-1">
                <Text className="text-xs text-gray-400 font-semibold">
                  Hora límite
                </Text>
                <Text className="text-sm font-bold text-gray-800">
                  {horaTexto}
                </Text>
              </View>
            </View>
          </View>

          {/* Acción o Enlace */}
          {recordatorio.url && recordatorio.url.trim() !== "" ? (
            <View className="mt-2">
              <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Recurso Adjunto
              </Text>
              <Pressable
                className="bg-[#007A4E] rounded-2xl py-4 px-5 flex-row justify-between items-center shadow-md active:opacity-90"
                onPress={() => Linking.openURL(recordatorio.url)}
              >
                <View className="flex-row items-center flex-1 mr-2">
                  <Ionicons name="link-sharp" color="white" size={20} />
                  <Text
                    className="text-white font-bold ml-2.5 text-base"
                    numberOfLines={1}
                  >
                    Abrir enlace de la actividad
                  </Text>
                </View>
                <Ionicons name="open-outline" color="white" size={20} />
              </Pressable>
            </View>
          ) : (
            <View className="mt-2 flex-row items-center bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
              <Ionicons
                name="document-text-outline"
                size={20}
                color="#6B7280"
              />
              <Text className="ml-2.5 text-gray-600 text-xs font-semibold">
                Tipo: Nota personal sin enlace adjunto
              </Text>
            </View>
          )}
        </View>

      </ScrollView>
    </Container>
  );
}