import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, Pressable, Linking } from "react-native";
import { useState } from "react";
import Modalcomponent from "@/components/Modal";
import Eliminar_Recordatorio from "@/sql/Eliminar_Recordatorio";
import { router } from "expo-router";

type RecordatorioProps = {
  id: number;
  titulo: string;
  descripcion?: string | null;
  fecha?: string | null;
  hora?: string | null;
  prioridad: number;
  url?: string | null;

  onDelete: () => void;
};

const prioridades = {
  1: {
    color: "#EF4444",
    fondo: "#FEF2F2",
    texto: "#DC2626",
    nombre: "Alta",
    icono: "fire",
  },

  2: {
    color: "#F59E0B",
    fondo: "#FFFBEB",
    texto: "#D97706",
    nombre: "Media",
    icono: "clock-fast",
  },

  3: {
    color: "#22C55E",
    fondo: "#F0FDF4",
    texto: "#16A34A",
    nombre: "Baja",
    icono: "leaf",
  },
};

export default function Recordatorio({
  titulo,
  descripcion,
  fecha,
  hora,
  prioridad,
  url,
  id,
  onDelete,
}: RecordatorioProps) {
  const theme =
    prioridades[prioridad as keyof typeof prioridades] || prioridades[2];

  // =====================================================
  // FECHA
  // =====================================================

  let dia = "";
  let mes = "";
  let diferencia: number | null = null;

  if (fecha) {
    const fechaObj = new Date(fecha);

    dia = fechaObj.getDate().toString();

    mes = fechaObj
      .toLocaleDateString("es-CO", {
        month: "short",
      })
      .toUpperCase();

    const hoy = new Date();

    hoy.setHours(0, 0, 0, 0);
    fechaObj.setHours(0, 0, 0, 0);

    diferencia = Math.ceil(
      (fechaObj.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24),
    );
  }

  // =====================================================
  // ESTADO
  // =====================================================

  let estado = "";

  if (diferencia === null) {
    estado = "Sin fecha límite";
  } else if (diferencia < 0) {
    estado = "Vencido";
  } else if (diferencia === 0) {
    estado = "Vence hoy";
  } else if (diferencia === 1) {
    estado = "Vence mañana";
  } else {
    estado = `Faltan ${diferencia} días`;
  }

  // =====================================================
  // ELIMINAR
  // =====================================================

  const [modalVisible, setModalVisible] = useState(false);

  const eliminar = async () => {
    const respuesta = await Eliminar_Recordatorio(id);

    if (!respuesta.ok) {
      alert(
        typeof respuesta.data === "object" &&
          respuesta.data !== null &&
          "mensaje" in respuesta.data
          ? respuesta.data.mensaje
          : "No fue posible eliminar el recordatorio.",
      );

      return;
    }

    onDelete();
    setModalVisible(false);
  };

  // =====================================================
  // EDITAR
  // =====================================================

  const editarRecordatorio = () => {
    setModalVisible(false);

    console.log("Editar");
  };

  // =====================================================
  // ABRIR DETALLE
  // =====================================================

  const abrirDetalle = () => {
    router.push({
      pathname: "../vistaUsuarioApp/detalle_Recordatorio",
      params: {
        id: id.toString(),
      },
    });
  };

  return (
    <Pressable
      android_ripple={{
        color: "#E5E7EB",
      }}
      className="mb-4 active:opacity-90"
      onPress={abrirDetalle}
    >
      <Modalcomponent
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        titulo="Opciones"
        descripcion="¿Qué deseas hacer con este recordatorio?"
        onPressButton={() => {
          setModalVisible(false);
        }}
        secondButton="Eliminar"
        onPressSecondButton={eliminar}
      />

      <View
        className="bg-white rounded-2xl border border-gray-200 p-4 mb-3"
        style={{
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 2,
        }}
      >
        {/* =====================================================
            ENCABEZADO
        ===================================================== */}

        <View className="flex-row justify-between items-center">
          {/* PRIORIDAD */}

          <View
            className="flex-row items-center px-3 py-1 rounded-full"
            style={{
              backgroundColor: theme.fondo,
            }}
          >
            <MaterialCommunityIcons
              name={theme.icono as any}
              size={15}
              color={theme.texto}
            />

            <Text
              className="ml-1 text-xs font-calibriBold"
              style={{
                color: theme.texto,
              }}
            >
              {theme.nombre}
            </Text>
          </View>

          {/* FECHA */}

          {fecha ? (
            <View className="flex-row items-center">
              <Ionicons name="calendar-outline" size={15} color="#6B7280" />

              <Text className="ml-1 text-xs text-gray-500">
                {dia} {mes}
              </Text>
            </View>
          ) : (
            <View className="flex-row items-center">
              <Ionicons
                name="document-text-outline"
                size={15}
                color="#9CA3AF"
              />

              <Text className="ml-1 text-xs text-gray-400">Nota</Text>
            </View>
          )}
        </View>

        {/* =====================================================
            TITULO
        ===================================================== */}

        <Text className="font-calibriBold text-[17px] mt-3" numberOfLines={1}>
          {titulo}
        </Text>

        {/* =====================================================
            DESCRIPCIÓN
        ===================================================== */}

        {descripcion ? (
          <Text className="text-gray-600 mt-1" numberOfLines={2}>
            {descripcion}
          </Text>
        ) : (
          <Text className="italic text-gray-400 mt-1">Sin descripción</Text>
        )}

        {/* =====================================================
            FECHA / HORA / ESTADO
        ===================================================== */}

        <View className="flex-row justify-between items-center mt-3">
          {/* HORA */}

          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={16} color="#6B7280" />

            <Text className="ml-2 text-gray-600">
              {hora ? hora.substring(0, 5) : "Sin hora límite"}
            </Text>
          </View>

          {/* ESTADO */}

          <View className="flex-row items-center">
            <Ionicons
              name={
                diferencia === null
                  ? "document-text-outline"
                  : diferencia < 0
                    ? "close-circle"
                    : diferencia <= 1
                      ? "warning"
                      : "ellipse"
              }
              size={14}
              color={
                diferencia === null
                  ? "#9CA3AF"
                  : diferencia < 0
                    ? "#DC2626"
                    : diferencia <= 1
                      ? "#F59E0B"
                      : "#22C55E"
              }
            />

            <Text
              className={`ml-2 text-xs font-calibriBold ${
                diferencia === null
                  ? "text-gray-400"
                  : diferencia < 0
                    ? "text-red-600"
                    : diferencia <= 1
                      ? "text-orange-500"
                      : "text-green-600"
              }`}
            >
              {estado}
            </Text>
          </View>
        </View>

        {/* =====================================================
            BOTONES
        ===================================================== */}

        <View className="flex-row items-center mt-4">
          {url && url.trim() !== "" ? (
            <Pressable
              className="bg-[#007A4E] px-4 py-2 rounded-xl flex-row items-center active:opacity-80"
              onPress={(e) => {
                e.stopPropagation();
                Linking.openURL(url);
              }}
            >
              <Ionicons name="open-outline" color="white" size={17} />

              <Text className="text-white ml-2 font-calibriBold">Abrir</Text>
            </Pressable>
          ) : (
            <View className="flex-row items-center flex-1">
              <Ionicons
                name="document-text-outline"
                size={17}
                color="#6B7280"
              />

              <Text className="ml-2 italic text-gray-500">Nota personal</Text>
            </View>
          )}

          <View className="flex-1" />

          {/* OPCIONES */}

          <Pressable
            onPress={(e) => {
              e.stopPropagation();
              setModalVisible(true);
            }}
            className="w-10 h-10 rounded-full bg-gray-100 justify-center items-center"
          >
            <Ionicons name="ellipsis-vertical" size={18} color="#6B7280" />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}
