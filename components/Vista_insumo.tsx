import { View, Text, Image, Pressable, Modal, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import { Feather, MaterialIcons, Ionicons } from "@expo/vector-icons";

import ipconfig from "@/sql/ipconfig";
import EstadoImg from "@/sql/EstadoImg";
import Eliminar_insumo from "@/sql/Borrar_Insumo";

export interface Insumo {
  id: number;
  nombreInsumo: string;
  codigoInsumo: string;
  activo: boolean;
  onEstadoChange?: (estado: boolean) => void;
  image?: string | null;
  onDelete?: () => void;
}

const InsumoVista = ({
  id,
  nombreInsumo,
  codigoInsumo,
  activo,
  image,
  onEstadoChange,
  onDelete,
}: Insumo) => {
  const [activoInsumo, setActivoInsumo] = useState(activo);
  const [cargandoEstado, setCargandoEstado] = useState(false);
  const [cargandoEliminar, setCargandoEliminar] = useState(false);

  // Modal de Alerta y Confirmación
  const [modalAlerta, setModalAlerta] = useState<{
    visible: boolean;
    titulo: string;
    mensaje: string;
    tipo: "exito" | "error" | "advertencia" | "info" | "confirmacion";
    onAceptar?: () => void;
  }>({
    visible: false,
    titulo: "",
    mensaje: "",
    tipo: "info",
  });

  useEffect(() => {
    setActivoInsumo(activo);
  }, [activo]);

  const cerrarAlerta = () => {
    setModalAlerta((prev) => ({ ...prev, visible: false }));
  };

  // ==========================================================
  // CAMBIAR ESTADO
  // ==========================================================

  const cambiarEstado = async () => {
    if (cargandoEstado) return;

    const nuevoEstado = activoInsumo ? 0 : 1;
    setCargandoEstado(true);

    try {
      const respuesta = await EstadoImg(id, nuevoEstado);

      if (!respuesta.ok) {
        setModalAlerta({
          visible: true,
          titulo: "No se pudo actualizar",
          mensaje:
            respuesta.data?.mensaje ||
            "No fue posible cambiar el estado del insumo.",
          tipo: "error",
        });
        return;
      }

      const nuevoEstadoBooleano = nuevoEstado === 1;
      setActivoInsumo(nuevoEstadoBooleano);
      onEstadoChange?.(nuevoEstadoBooleano);
    } catch (error) {
      console.log("ERROR CAMBIANDO ESTADO:", error);
      setModalAlerta({
        visible: true,
        titulo: "Error de conexión",
        mensaje: "No se pudo conectar con el servidor.",
        tipo: "error",
      });
    } finally {
      setCargandoEstado(false);
    }
  };

  // ==========================================================
  // ELIMINAR INSUMO
  // ==========================================================

  const solicitarEliminacion = () => {
    setModalAlerta({
      visible: true,
      titulo: "¿Eliminar insumo?",
      mensaje: `¿Estás seguro de que deseas eliminar "${nombreInsumo}"? Esta acción no se puede deshacer.`,
      tipo: "confirmacion",
      onAceptar: ejecutarEliminacion,
    });
  };

  const ejecutarEliminacion = async () => {
    cerrarAlerta();
    setCargandoEliminar(true);

    try {
      const respuesta = await Eliminar_insumo(id);

      if (!respuesta.ok) {
        setModalAlerta({
          visible: true,
          titulo: "No se pudo eliminar",
          mensaje:
            respuesta.data?.mensaje ||
            "No fue posible eliminar el insumo del sistema.",
          tipo: "error",
        });
        return;
      }

      onDelete?.();
    } catch (error) {
      console.log("ERROR ELIMINANDO INSUMO:", error);
      setModalAlerta({
        visible: true,
        titulo: "Error de conexión",
        mensaje: "No fue posible conectar con el servidor.",
        tipo: "error",
      });
    } finally {
      setCargandoEliminar(false);
    }
  };

  return (
    <View
      className="bg-white rounded-3xl px-4 py-4 mb-4 border border-gray-100"
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        elevation: 3,
      }}
    >
      {/* ======================================================
          CONTENIDO
      ====================================================== */}

      <View className="flex-row">
        {/* IMAGEN */}
        <Image
          source={
            image
              ? { uri: `${ipconfig}${image}` }
              : require("../img/item-placeholder.png")
          }
          className="w-16 h-16 rounded-2xl border border-gray-200"
        />

        {/* INFORMACIÓN */}
        <View className="flex-1 ml-4 justify-center">
          <View className="flex-row justify-between items-start">
            <Text
              numberOfLines={1}
              className="font-calibriBold text-[17px] flex-1 mr-2 text-gray-900"
            >
              {nombreInsumo}
            </Text>

            <Pressable onPress={cambiarEstado} disabled={cargandoEstado}>
              <View
                className={`px-3 py-1 rounded-full ${
                  activoInsumo ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <Text
                  className={`text-xs font-calibriBold ${
                    activoInsumo ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {cargandoEstado
                    ? "..."
                    : activoInsumo
                    ? "Activo"
                    : "Inactivo"}
                </Text>
              </View>
            </Pressable>
          </View>

          {/* SERIE */}
          <Text className="text-gray-400 text-xs mt-2">Número de serie</Text>

          <View className="flex-row items-center mt-0.5">
            <MaterialIcons name="qr-code-2" size={15} color="#007A4E" />

            <Text
              numberOfLines={1}
              className="font-calibriBold text-gray-700 ml-1"
            >
              {codigoInsumo}
            </Text>
          </View>
        </View>
      </View>

      {/* SEPARADOR */}
      <View className="h-[1px] bg-gray-100 mt-4 mb-3" />

      {/* ACCIONES */}
      <View className="flex-row justify-end">
        {/* EDITAR */}
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/vistaUsuarioApp/editarInsumo",
              params: {
                id: String(id),
              },
            })
          }
          className="flex-row items-center bg-[#E8F5F0] px-3 py-2 rounded-xl mr-2 active:opacity-80"
        >
          <Feather name="edit-2" size={17} color="#007A4E" />
          <Text className="text-[#007A4E] font-calibriBold ml-2">Editar</Text>
        </Pressable>

        {/* ELIMINAR */}
        <Pressable
          onPress={solicitarEliminacion}
          disabled={cargandoEliminar}
          className="flex-row items-center bg-red-50 px-3 py-2 rounded-xl active:opacity-80"
        >
          {cargandoEliminar ? (
            <ActivityIndicator size="small" color="#EF4444" />
          ) : (
            <>
              <MaterialIcons name="delete-outline" size={20} color="#EF4444" />
              <Text className="text-red-500 font-calibriBold ml-2">
                Eliminar
              </Text>
            </>
          )}
        </Pressable>
      </View>

      {/* MODAL DE ALERTA Y CONFIRMACIÓN PERSONALIZADO */}
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
                  : modalAlerta.tipo === "error" || modalAlerta.tipo === "confirmacion"
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
                    : modalAlerta.tipo === "confirmacion"
                    ? "trash-outline"
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
                    : modalAlerta.tipo === "error" || modalAlerta.tipo === "confirmacion"
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

            {modalAlerta.tipo === "confirmacion" ? (
              <View className="flex-row w-full mt-6 space-x-3">
                <Pressable
                  className="flex-1 bg-gray-100 py-3.5 rounded-2xl items-center active:opacity-80 mr-2"
                  onPress={cerrarAlerta}
                >
                  <Text className="text-gray-700 font-bold text-base">
                    Cancelar
                  </Text>
                </Pressable>

                <Pressable
                  className="flex-1 bg-red-600 py-3.5 rounded-2xl items-center active:opacity-80"
                  onPress={modalAlerta.onAceptar}
                >
                  <Text className="text-white font-bold text-base">
                    Eliminar
                  </Text>
                </Pressable>
              </View>
            ) : (
              <Pressable
                className="w-full bg-gray-900 rounded-2xl py-4 items-center mt-6 active:opacity-90"
                onPress={cerrarAlerta}
              >
                <Text className="text-white font-bold text-base">Aceptar</Text>
              </Pressable>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default InsumoVista;