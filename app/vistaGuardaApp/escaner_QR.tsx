import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useState, useRef, useCallback } from "react";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import consultarAprendizQR from "@/sql/Consultar_Aprendiz_QR";
import AsyncStorage from "@react-native-async-storage/async-storage";
import consultarMovimiento from "@/sql/Movimiento_Aprendiz";

export default function EscanerQR() {
  const [permission, requestPermission] = useCameraPermissions();
  const [escaneado, setEscaneado] = useState(false);
  const bloqueado = useRef(false);

  // ESTADO PARA EL MODAL PERSONALIZADO (REEMPLAZA A ALERT)
  const [modalAlerta, setModalAlerta] = useState<{
    visible: boolean;
    titulo: string;
    mensaje: string;
    tipo: "error" | "sesion";
  }>({
    visible: false,
    titulo: "",
    mensaje: "",
    tipo: "error",
  });

  // RESETEAR ESTADOS AL VOLVER A LA VISTA
  useFocusEffect(
    useCallback(() => {
      bloqueado.current = false;
      setEscaneado(false);
    }, [])
  );

  const cerrarModalYDesbloquear = async () => {
    const esErrorSesion = modalAlerta.tipo === "sesion";
    setModalAlerta((prev) => ({ ...prev, visible: false }));

    if (esErrorSesion) {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("usuario");
      router.replace("/");
    } else {
      // Pequeño retardo para evitar re-escaneo accidental al cerrar
      setTimeout(() => {
        bloqueado.current = false;
        setEscaneado(false);
      }, 800);
    }
  };

  const onBarcodeScanned = async ({ data }: any) => {
    if (bloqueado.current || escaneado) return;

    bloqueado.current = true;
    setEscaneado(true);

    try {
      await Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      );

      const respuesta = await consultarAprendizQR(data);
      const estadoMovimiento = await consultarMovimiento(data);

      if (!respuesta.ok) {
        if (respuesta.status === 401) {
          setModalAlerta({
            visible: true,
            titulo: "Sesión Expirada",
            mensaje: "Tu sesión ha expirado. Debes iniciar sesión nuevamente.",
            tipo: "sesion",
          });
          return;
        }

        setModalAlerta({
          visible: true,
          titulo: "Código QR Inválido",
          mensaje: respuesta.data?.mensaje || "No se pudo consultar la información del código QR.",
          tipo: "error",
        });
        return;
      }

      const tieneFoto = !!respuesta.data.persona?.imagen;

      if (estadoMovimiento.data?.tieneIngreso) {
        router.push({
          pathname: "./solicitud_Salida",
          params: {
            aprendiz: JSON.stringify(respuesta.data),
            movimiento: JSON.stringify(estadoMovimiento.data.movimiento),
          },
        });
      } else {
        router.push({
          pathname: "./info_Usuario",
          params: {
            aprendiz: JSON.stringify(respuesta.data),
            tieneFoto: JSON.stringify(tieneFoto),
          },
        });
      }
    } catch (error) {
      console.log("ERROR EN ESCÁNER QR:", error);
      setModalAlerta({
        visible: true,
        titulo: "Error de Conexión",
        mensaje: "Ocurrió un error al conectar con el servidor para verificar el código QR.",
        tipo: "error",
      });
    }
  };

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  if (!permission) return null;

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center bg-white p-5">
        <Ionicons name="camera-outline" size={48} color="#94A3B8" />
        <Text className="mt-3 text-slate-700 text-center font-medium">
          Se necesita permiso para usar la cámara en la validación de acceso.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      {/* CÁMARA DE FONDO */}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={escaneado ? undefined : onBarcodeScanned}
      />

      {/* CAPA DE INTERFAZ SOBREPUESTA CON ESPACIADO ELEVADO */}
      <View className="flex-1 px-5 pt-12 pb-16 justify-between bg-black/20">
        {/* SECCIÓN SUPERIOR: TÍTULO Y MARCO CENTRADO */}
        <View className="items-center w-full">
          {/* TÍTULO SUPERIOR */}
          <Text className="text-white text-[18px] font-bold shadow-md mb-6">
            Escanea el QR del aprendiz
          </Text>

          {/* MARCO CENTRAL DEL ESCÁNER */}
          <View className="w-[240px] h-[240px] relative mt-2">
            {/* Esquina superior izquierda */}
            <View className="absolute top-0 left-0 w-11 h-11 border-t-[5px] border-l-[5px] border-black rounded-tl-3xl" />
            {/* Esquina superior derecha */}
            <View className="absolute top-0 right-0 w-11 h-11 border-t-[5px] border-r-[5px] border-black rounded-tr-3xl" />
            {/* Esquina inferior izquierda */}
            <View className="absolute bottom-0 left-0 w-11 h-11 border-b-[5px] border-l-[5px] border-black rounded-bl-3xl" />
            {/* Esquina inferior derecha */}
            <View className="absolute bottom-0 right-0 w-11 h-11 border-b-[5px] border-r-[5px] border-black rounded-br-3xl" />
          </View>
        </View>

        {/* SECCIÓN INFERIOR ELEVADA */}
        <View className="w-full mb-4">
          {/* BANNER INDICADOR */}
          <View className="bg-[#2D334A]/95 backdrop-blur-md rounded-2xl p-3 mb-10 flex-row items-center border border-white/10 shadow-lg">
            <View className="w-9 h-9 rounded-xl bg-[#2ECDB1] items-center justify-center mr-3">
              <Ionicons name="qr-code-outline" size={20} color="#FFFFFF" />
            </View>
            <View className="flex-1">
              <Text className="text-white font-bold text-[12px]">
                Alinea el código QR dentro del marco
              </Text>
              <Text className="text-gray-300 text-[10px] mt-0.5">
                El escaneo se hará automáticamente
              </Text>
            </View>
          </View>

          {/* TARJETA BLANCA DE CONSEJOS */}
          <View className="bg-white rounded-3xl px-4 mb-16 py-3 shadow-2xl">
            {/* ÍTEM 1: ILUMINACIÓN */}
            <View className="flex-row items-center py-2 border-b border-gray-100">
              <Ionicons name="sunny-outline" size={18} color="#2ECDB1" />
              <View className="m-2">
                <Text className="text-slate-800 font-bold text-[11px]">
                  Asegúrate de tener buena iluminación
                </Text>
                <Text className="text-slate-400 text-[9.5px]">
                  Evita reflejos y sombras
                </Text>
              </View>
            </View>

            {/* ÍTEM 2: ESTABILIDAD */}
            <View className="flex-row items-center py-2 border-b border-gray-100">
              <Ionicons name="phone-portrait-outline" size={18} color="#2ECDB1" />
              <View className="m-2">
                <Text className="text-slate-800 font-bold text-[11px]">
                  Sostén el dispositivo de forma estable
                </Text>
                <Text className="text-slate-400 text-[9.5px]">
                  Mantén el código dentro del marco
                </Text>
              </View>
            </View>

            {/* ÍTEM 3: LEGIBILIDAD */}
            <View className="flex-row items-center py-2">
              <Ionicons name="scan-circle-outline" size={18} color="#2ECDB1" />
              <View className="m-2">
                <Text className="text-slate-800 font-bold text-[11px]">
                  Verifica que el QR sea legible
                </Text>
                <Text className="text-slate-400 text-[9.5px]">
                  No debe estar dañado o borroso
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* MODAL DE ERRORES/ALERTAS EN LUGAR DE ALERT NATIVO */}
      <Modal
        visible={modalAlerta.visible}
        transparent
        animationType="fade"
        onRequestClose={cerrarModalYDesbloquear}
      >
        <View className="flex-1 bg-black/60 justify-center px-5">
          <View className="bg-white rounded-3xl p-6 items-center">
            <View className="w-16 h-16 rounded-full bg-red-100 items-center justify-center mb-4">
              <Ionicons
                name={modalAlerta.tipo === "sesion" ? "log-out-outline" : "alert-circle-outline"}
                size={34}
                color="#DC2626"
              />
            </View>

            <Text className="text-gray-900 text-xl font-bold text-center">
              {modalAlerta.titulo}
            </Text>

            <Text className="text-gray-500 text-sm text-center mt-3 leading-5">
              {modalAlerta.mensaje}
            </Text>

            <Pressable
              className="w-full bg-gray-900 rounded-2xl py-4 items-center mt-6"
              onPress={cerrarModalYDesbloquear}
            >
              <Text className="text-white font-bold text-base">Entendido</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}