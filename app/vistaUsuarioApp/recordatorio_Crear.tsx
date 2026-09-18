import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import Container from "@/components/Container";
import GradientP from "@/components/GradientP";
import Button from "@/components/Button";
import Back from "@/components/molecules/Back";
import Crear_Recordatorio from "@/sql/Crear_Recordatorio";
import { router } from "expo-router";

export default function CrearRecordatorio() {
  // =========================================================
  // DATOS DEL RECORDATORIO
  // =========================================================

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [url, setUrl] = useState("");
  const [prioridad, setPrioridad] = useState(2);
  const [cargando, setCargando] = useState(false);

  // =========================================================
  // FECHA Y HORA
  // =========================================================

  const [fecha, setFecha] = useState<Date | null>(null);
  const [hora, setHora] = useState<Date | null>(null);

  const [mostrarFecha, setMostrarFecha] = useState(false);
  const [mostrarHora, setMostrarHora] = useState(false);

  // =========================================================
  // MODAL DE ALERTA PERSONALIZADO (SAIA)
  // =========================================================

  const [modalAlerta, setModalAlerta] = useState<{
    visible: boolean;
    titulo: string;
    mensaje: string;
    tipo: "exito" | "error" | "advertencia" | "info";
    onAceptar?: () => void;
  }>({
    visible: false,
    titulo: "",
    mensaje: "",
    tipo: "info",
  });

  const cerrarAlerta = () => {
    const callback = modalAlerta.onAceptar;
    setModalAlerta((prev) => ({ ...prev, visible: false }));
    if (callback) callback();
  };

  const mostrarAlerta = (
    titulo: string,
    mensaje: string,
    tipo: "exito" | "error" | "advertencia" | "info" = "info",
    onAceptar?: () => void
  ) => {
    setModalAlerta({
      visible: true,
      titulo,
      mensaje,
      tipo,
      onAceptar,
    });
  };

  // =========================================================
  // LIMPIAR FORMULARIO
  // =========================================================

  const limpiarFormulario = useCallback(() => {
    setTitulo("");
    setDescripcion("");
    setUrl("");
    setPrioridad(2);

    setFecha(null);
    setHora(null);

    setMostrarFecha(false);
    setMostrarHora(false);
  }, []);

  // =========================================================
  // LIMPIAR CADA VEZ QUE ENTRAMOS A LA VISTA
  // =========================================================

  useFocusEffect(
    useCallback(() => {
      console.log("🟡 CREAR RECORDATORIO: FOCUS");
      limpiarFormulario();

      return () => {
        console.log("⚪ CREAR RECORDATORIO: BLUR");
      };
    }, [limpiarFormulario])
  );

  // =========================================================
  // SELECCIONAR FECHA
  // =========================================================

  const seleccionarFecha = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    setMostrarFecha(false);

    if (event.type === "set" && selectedDate) {
      setFecha(selectedDate);
    }
  };

  // =========================================================
  // SELECCIONAR HORA
  // =========================================================

  const seleccionarHora = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    setMostrarHora(false);

    if (event.type === "set" && selectedDate) {
      setHora(selectedDate);
    }
  };

  // =========================================================
  // FORMATO FECHA
  // =========================================================

  const formatoFecha = fecha
    ? fecha.toLocaleDateString("es-CO", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Sin fecha límite";

  // =========================================================
  // FORMATO HORA
  // =========================================================

  const formatoHora = hora
    ? hora.toLocaleTimeString("es-CO", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : "Sin hora límite";

  // =========================================================
  // GUARDAR RECORDATORIO
  // =========================================================

  const guardarRecordatorio = async () => {
    // Validar título
    if (!titulo.trim()) {
      mostrarAlerta(
        "Campo requerido",
        "Por favor ingresa un título para el recordatorio.",
        "advertencia"
      );
      return;
    }

    const fechaFormateada = fecha
      ? fecha.toISOString().split("T")[0]
      : null;

    const horaFormateada = hora
      ? hora.toTimeString().split(" ")[0]
      : null;

    setCargando(true);

    try {
      const respuesta = await Crear_Recordatorio({
        titulo,
        descripcion,
        fecha_limite: fechaFormateada,
        hora_limite: horaFormateada,
        prioridad,
        url,
      });

      if (!respuesta.ok) {
        let mensaje = "No se pudo crear el recordatorio.";

        if (
          respuesta.data &&
          typeof respuesta.data === "object" &&
          "mensaje" in respuesta.data
        ) {
          mensaje = respuesta.data.mensaje;
        } else if (typeof respuesta.data === "string") {
          mensaje = respuesta.data;
        }

        mostrarAlerta("Error al guardar", mensaje, "error");
        return;
      }

      mostrarAlerta(
        "¡Recordatorio Creado!",
        "Tu recordatorio se ha guardado exitosamente.",
        "exito",
        () => router.replace("/vistaUsuarioApp/recordatorio_View")
      );
    } catch (error) {
      console.log("ERROR CREANDO RECORDATORIO:", error);
      mostrarAlerta(
        "Error de conexión",
        "No se pudo conectar con el servidor.",
        "error"
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container>
      <Back
        title="Crear Recordatorios"
        subtitle="Organiza todas tus actividades."
        onPress={() =>
          router.replace("/vistaUsuarioApp/recordatorio_View")
        }
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ENCABEZADO */}
        <View className="items-center mt-16 mb-8">
          <GradientP
            text="Nuevos Recordatorios"
            fontSize={28}
            fontWeight="bold"
          />

          <Text className="text-gray-500 text-center px-8">
            Organiza tus actividades y evita olvidar entregas importantes.
          </Text>
        </View>

        {/* TÍTULO */}
        <View className="bg-white rounded-3xl p-5 mb-5 shadow border border-[#ECECEC]">
          <Text className="font-bold text-gray-700 mb-3">📌 Título</Text>

          <TextInput
            placeholder="Ej: Proyecto Final SAIA"
            onChangeText={setTitulo}
            value={titulo}
            className="border border-gray-200 rounded-2xl px-4 py-4"
          />
        </View>

        {/* DESCRIPCIÓN */}
        <View className="bg-white rounded-3xl p-5 mb-5 shadow border border-[#ECECEC]">
          <Text className="font-bold text-gray-700 mb-3">📝 Descripción</Text>

          <TextInput
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            placeholder="Agrega información importante..."
            onChangeText={setDescripcion}
            value={descripcion}
            className="border border-gray-200 rounded-2xl px-4 py-4 h-32"
          />
        </View>

        {/* FECHA Y HORA */}
        <View className="flex-row gap-4 mb-5">
          {/* FECHA */}
          <Pressable
            onPress={() => setMostrarFecha(true)}
            className="flex-1 bg-white rounded-3xl p-5 shadow border border-[#ECECEC]"
          >
            <Text className="font-bold text-gray-700 mb-3">📅 Fecha límite</Text>

            <View className="flex-row items-center">
              <MaterialCommunityIcons
                name="calendar-month"
                size={24}
                color="#007A4E"
              />

              <Text
                className={`ml-3 text-base font-semibold flex-1 ${
                  fecha ? "text-gray-800" : "text-gray-400"
                }`}
              >
                {formatoFecha}
              </Text>
            </View>
          </Pressable>

          {/* HORA */}
          <Pressable
            onPress={() => setMostrarHora(true)}
            className="flex-1 bg-white rounded-3xl p-5 shadow border border-[#ECECEC]"
          >
            <Text className="font-bold text-gray-700 mb-3">🕒 Hora límite</Text>

            <View className="flex-row items-center">
              <MaterialCommunityIcons
                name="clock-outline"
                size={24}
                color="#007A4E"
              />

              <Text
                className={`ml-3 text-base font-semibold flex-1 ${
                  hora ? "text-gray-800" : "text-gray-400"
                }`}
              >
                {formatoHora}
              </Text>
            </View>
          </Pressable>
        </View>

        {/* SELECTOR DE FECHA */}
        {mostrarFecha && (
          <DateTimePicker
            value={fecha || new Date()}
            mode="date"
            display="default"
            onChange={seleccionarFecha}
          />
        )}

        {/* SELECTOR DE HORA */}
        {mostrarHora && (
          <DateTimePicker
            value={hora || new Date()}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={seleccionarHora}
          />
        )}

        {/* PRIORIDAD */}
        <View className="bg-white rounded-3xl p-5 mb-5 shadow border border-[#ECECEC]">
          <Text className="font-bold text-gray-700 mb-4">🔥 Prioridad</Text>

          <View className="flex-row justify-between">
            {/* ALTA */}
            <Pressable
              onPress={() => setPrioridad(1)}
              className={`flex-1 mr-2 rounded-3xl py-5 items-center ${
                prioridad === 1
                  ? "bg-red-100 border-2 border-red-500"
                  : "bg-gray-100"
              }`}
            >
              <MaterialCommunityIcons
                name="fire"
                size={32}
                color="#EF4444"
              />

              <Text className="font-bold mt-2 text-red-500">Alta</Text>
            </Pressable>

            {/* MEDIA */}
            <Pressable
              onPress={() => setPrioridad(2)}
              className={`flex-1 mx-2 rounded-3xl py-5 items-center ${
                prioridad === 2
                  ? "bg-yellow-100 border-2 border-yellow-500"
                  : "bg-gray-100"
              }`}
            >
              <MaterialCommunityIcons
                name="clock-fast"
                size={32}
                color="#EAB308"
              />

              <Text className="font-bold mt-2 text-yellow-600">Media</Text>
            </Pressable>

            {/* BAJA */}
            <Pressable
              onPress={() => setPrioridad(3)}
              className={`flex-1 ml-2 rounded-3xl py-5 items-center ${
                prioridad === 3
                  ? "bg-green-100 border-2 border-green-500"
                  : "bg-gray-100"
              }`}
            >
              <MaterialCommunityIcons
                name="leaf"
                size={32}
                color="#22C55E"
              />

              <Text className="font-bold mt-2 text-green-600">Baja</Text>
            </Pressable>
          </View>
        </View>

        {/* URL */}
        <View className="bg-white rounded-3xl p-5 shadow border border-[#ECECEC]">
          <Text className="font-bold text-gray-700 mb-3">
            🔗 URL de la actividad
          </Text>

          <TextInput
            placeholder="https://classroom.google.com/..."
            onChangeText={setUrl}
            autoCapitalize="none"
            value={url}
            keyboardType="url"
            className="border border-gray-200 rounded-2xl px-4 py-4"
          />
        </View>

        {/* BOTÓN */}
        <View className="items-center mt-6 mb-8">
          <Button
            text={cargando ? "Guardando..." : "Guardar Recordatorio"}
            onPress={guardarRecordatorio}
            disabled={cargando}
          />
        </View>
      </ScrollView>

      {/* MODAL DE ALERTA PERSONALIZADO (SAIA) */}
      <Modal
        visible={modalAlerta.visible}
        transparent
        animationType="fade"
        onRequestClose={cerrarAlerta}
      >
        <View className="flex-1 bg-black/50 justify-center px-5">
          <View className="bg-white rounded-3xl p-6 items-center shadow-lg">
            <View
              className={`w-16 h-16 rounded-full items-center justify-center mb-4 ${
                modalAlerta.tipo === "exito"
                  ? "bg-emerald-100"
                  : modalAlerta.tipo === "error"
                  ? "bg-red-100"
                  : modalAlerta.tipo === "advertencia"
                  ? "bg-amber-100"
                  : "bg-blue-100"
              }`}
            >
              <Ionicons
                name={
                  modalAlerta.tipo === "exito"
                    ? "checkmark-circle-outline"
                    : modalAlerta.tipo === "error"
                    ? "alert-circle-outline"
                    : modalAlerta.tipo === "advertencia"
                    ? "warning-outline"
                    : "information-circle-outline"
                }
                size={34}
                color={
                  modalAlerta.tipo === "exito"
                    ? "#00BF63"
                    : modalAlerta.tipo === "error"
                    ? "#DC2626"
                    : modalAlerta.tipo === "advertencia"
                    ? "#D97706"
                    : "#3B82F6"
                }
              />
            </View>

            <Text className="text-gray-900 text-xl font-bold text-center">
              {modalAlerta.titulo}
            </Text>

            <Text className="text-gray-500 text-sm text-center mt-3 leading-5">
              {modalAlerta.mensaje}
            </Text>

            <Pressable
              className="w-full bg-gray-900 rounded-2xl py-4 items-center mt-6 active:opacity-90"
              onPress={cerrarAlerta}
            >
              <Text className="text-white font-bold text-base">Aceptar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </Container>
  );
}