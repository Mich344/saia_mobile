import { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import iniciarTurnoGuarda from "@/sql/Iniciar_Turno_Guarda";
import Container from "@/components/Container";
import GradientP from "@/components/GradientP";
import Button from "@/components/Button";

type JornadaTipo = "Mañana" | "Tarde" | "Noche" | "";

export default function InicioTurno() {
  const [turno, setTurno] = useState<JornadaTipo>("");
  const [cargando, setCargando] = useState(false);

  // Modal para reemplazo de Alert.alert
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

  const opcionesJornada = [
    {
      id: "Mañana",
      titulo: "Mañana",
      horario: "06:00 AM - 02:00 PM",
      icono: "sunny",
      colorIcono: "#F59E0B",
      bgActivo: "bg-amber-50",
      borderActivo: "border-amber-500",
      textActivo: "text-amber-700",
    },
    {
      id: "Tarde",
      titulo: "Tarde",
      horario: "02:00 PM - 10:00 PM",
      icono: "partly-sunny",
      colorIcono: "#F97316",
      bgActivo: "bg-orange-50",
      borderActivo: "border-orange-500",
      textActivo: "text-orange-700",
    },
    {
      id: "Noche",
      titulo: "Noche",
      horario: "10:00 PM - 06:00 AM",
      icono: "moon",
      colorIcono: "#6366F1",
      bgActivo: "bg-indigo-50",
      borderActivo: "border-indigo-500",
      textActivo: "text-indigo-700",
    },
  ];

  const handleIniciarTurno = async () => {
    if (turno === "") {
      setModalAlerta({
        visible: true,
        titulo: "Selección requerida",
        mensaje: "Por favor seleccione una jornada para iniciar su turno.",
        tipo: "advertencia",
      });
      return;
    }

    try {
      setCargando(true);
      const respuesta = await iniciarTurnoGuarda(turno);

      if (!respuesta.ok) {
        setModalAlerta({
          visible: true,
          titulo: "No se pudo iniciar",
          mensaje: respuesta.data?.mensaje || "No fue posible registrar el turno.",
          tipo: "error",
        });
        return;
      }

      setModalAlerta({
        visible: true,
        titulo: "¡Turno Iniciado!",
        mensaje:
          respuesta.data?.mensaje ||
          `Su turno de la ${turno.toLowerCase()} ha sido registrado correctamente.`,
        tipo: "exito",
        onAceptar: () => {
          router.replace("/vistaGuardaApp/home");
        },
      });
    } catch (error) {
      console.log("ERROR INICIANDO TURNO:", error);
      setModalAlerta({
        visible: true,
        titulo: "Error de conexión",
        mensaje: "Ocurrió un inconveniente al comunicarse con el servidor.",
        tipo: "error",
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 8,
          paddingBottom: 30,
        }}
      >
        {/* ENCABEZADO Y LOGO */}
        <View className="items-center mt-4">
          <View className="w-20 h-20 bg-emerald-50 rounded-full items-center justify-center mb-3 border border-emerald-100">
            <Image
              source={require("@/img/logo_SAIA.png")}
              className="w-12 h-12"
              resizeMode="contain"
            />
          </View>

          <GradientP text="INICIO DE TURNO" fontWeight="bold" fontSize={24} />

          <Text className="text-gray-500 text-center text-[13px] mt-2 px-4 leading-5">
            Selecciona la jornada correspondiente para activar el control de
            accesos de tu puesto.
          </Text>
        </View>

        {/* SECCIÓN DE SELECCIÓN */}
        <View className="w-full mt-8">
          <Text className="text-[15px] font-bold text-gray-800 mb-4 px-1">
            Jornada de servicio
          </Text>

          {opcionesJornada.map((item) => {
            const estaSeleccionado = turno === item.id;

            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                onPress={() => setTurno(item.id as JornadaTipo)}
                className={`rounded-2xl p-4 mb-3 border flex-row items-center justify-between transition-all ${
                  estaSeleccionado
                    ? `${item.bgActivo} ${item.borderActivo} shadow-sm`
                    : "bg-white border-gray-100 shadow-sm"
                }`}
              >
                <View className="flex-row items-center flex-1">
                  <View
                    className={`w-11 h-11 rounded-xl items-center justify-center ${
                      estaSeleccionado ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <Ionicons
                      name={item.icono as any}
                      size={22}
                      color={item.colorIcono}
                    />
                  </View>

                  <View className="ml-3.5 flex-1">
                    <Text
                      className={`text-[15px] font-bold ${
                        estaSeleccionado ? item.textActivo : "text-gray-800"
                      }`}
                    >
                      {item.titulo}
                    </Text>

                    <Text className="text-gray-400 text-[12px] mt-0.5">
                      {item.horario}
                    </Text>
                  </View>
                </View>

                <View
                  className={`w-6 h-6 rounded-full border items-center justify-center ${
                    estaSeleccionado
                      ? "bg-[#16A878] border-[#16A878]"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {estaSeleccionado && (
                    <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* CARD DINÁMICA DE CONFIRMACIÓN */}
        <View className="mt-4">
          {turno !== "" ? (
            <View className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 flex-row items-center">
              <View className="w-9 h-9 rounded-xl bg-[#16A878] items-center justify-center">
                <Ionicons
                  name="checkmark-circle-outline"
                  size={20}
                  color="#FFFFFF"
                />
              </View>

              <View className="ml-3 flex-1">
                <Text className="text-emerald-900 font-bold text-[12px]">
                  Jornada lista para iniciar
                </Text>

                <Text className="text-emerald-700 text-[11px] mt-0.5">
                  Turno seleccionado:{" "}
                  <Text className="font-extrabold">{turno}</Text>
                </Text>
              </View>
            </View>
          ) : (
            <View className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-4 flex-row items-center">
              <Ionicons
                name="information-circle-outline"
                size={20}
                color="#9CA3AF"
              />

              <Text className="text-gray-400 text-[12px] ml-2 flex-1">
                Por favor toca una de las opciones superiores para continuar.
              </Text>
            </View>
          )}
        </View>

        {/* BOTÓN DE ACCIÓN */}
        <View className="mt-8 items-center w-full">
          {cargando ? (
            <View className="bg-[#16A878] py-3.5 px-8 rounded-2xl items-center justify-center flex-row w-full">
              <ActivityIndicator color="#FFFFFF" size="small" />
              <Text className="text-white font-bold text-[14px] ml-2">
                Iniciando turno...
              </Text>
            </View>
          ) : (
            <Button text="Iniciar Turno" onPress={handleIniciarTurno} />
          )}
        </View>
      </ScrollView>

      {/* MODAL DE ALERTA PERSONALIZADO */}
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