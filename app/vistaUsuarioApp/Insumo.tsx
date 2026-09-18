import { View, Text, Pressable, Modal } from "react-native";
import React, { useState, useCallback } from "react";
import { router } from "expo-router";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import Container from "@/components/Container";
import ColorGrandient from "@/components/GradientP";
import SearchBar from "@/components/SearchBar";
import VistaInsumo from "@/components/Vista_insumo";
import Back from "@/components/molecules/Back";
import Vista_insumo from "@/sql/Vista_insumo";

interface Insumo {
  id_insumo: number;
  nom_insumo: string;
  marca: string;
  estado: number;
  num_serie: string;
  desc_insumo: string;
  fecha_registro: string;
  imagen: string | null;
}

type Filtro = "todos" | "activos" | "inactivos";

export default function RegistrarInsumo() {
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [filtro, setFiltro] = useState<Filtro>("todos");

  // Paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 5;

  // Modal personalizado de alerta
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

  useFocusEffect(
    useCallback(() => {
      cargarInsumos();
    }, [])
  );

  const cargarInsumos = async () => {
    try {
      const respuesta = await Vista_insumo();

      if (respuesta.ok) {
        setInsumos(respuesta.data.insumos);
      } else {
        setModalAlerta({
          visible: true,
          titulo: "Error al cargar",
          mensaje:
            respuesta.data?.mensaje ||
            "Ocurrió un error al obtener la lista de insumos.",
          tipo: "error",
        });
      }
    } catch (error) {
      console.error("❌ ERROR CARGANDO INSUMOS:", error);
      setModalAlerta({
        visible: true,
        titulo: "Error de conexión",
        mensaje: "No se pudo conectar con el servidor para obtener los datos.",
        tipo: "error",
      });
    }
  };

  const eliminarVisualmente = (id: number) => {
    setInsumos((prev) => prev.filter((item) => item.id_insumo !== id));
  };

  const actualizarEstadoVisualmente = (id: number, nuevoEstado: boolean) => {
    setInsumos((prev) =>
      prev.map((item) =>
        item.id_insumo === id
          ? {
              ...item,
              estado: nuevoEstado ? 1 : 0,
            }
          : item
      )
    );
  };

  // ==========================================
  // FILTROS Y PAGINACIÓN
  // ==========================================

  const insumosFiltrados = insumos.filter((item) => {
    if (filtro === "activos") {
      return item.estado === 1;
    }

    if (filtro === "inactivos") {
      return item.estado === 0;
    }

    return true;
  });

  // Cálculos de Paginación
  const totalPaginas =
    Math.ceil(insumosFiltrados.length / elementosPorPagina) || 1;
  const inicio = (paginaActual - 1) * elementosPorPagina;
  const insumosPaginados = insumosFiltrados.slice(
    inicio,
    inicio + elementosPorPagina
  );

  const cambiarFiltro = (nuevoFiltro: Filtro) => {
    setFiltro(nuevoFiltro);
    setPaginaActual(1); // Reiniciar a página 1 al cambiar de filtro
  };

  const activos = insumos.filter((item) => item.estado === 1).length;
  const inactivos = insumos.filter((item) => item.estado === 0).length;

  return (
    <Container>
      <Back
        className="mb-5"
        onPress={() => router.back()}
        title="Tus insumos"
        subtitle="Visualiza tu lista de insumos para el ingreso."
      />

      <View className="flex-1 pb-6">
        {/* ========================================== */}
        {/* ENCABEZADO */}
        {/* ========================================== */}

        <View className="flex-row justify-between">
          <View className="flex-1 items-center">
            <ColorGrandient
              text="Mis insumos"
              fontWeight="bold"
              fontSize={28}
            />

            <Text className="text-gray-500 mt-1 text-center">
              Administra los recursos registrados
            </Text>
          </View>
        </View>

        {/* ========================================== */}
        {/* BUSCADOR */}
        {/* ========================================== */}

        <View className="px-5 mt-6 flex-row items-center space-x-3">
          <View className="flex-1">
            <SearchBar placeholder="Buscar insumo..." />
          </View>

          <Pressable
            onPress={() => router.push("./crearInsumo")}
            className="w-12 h-12 rounded-2xl bg-[#007A4E] items-center justify-center mt-5 ml-3"
          >
            <MaterialIcons name="add" size={28} color="white" />
          </Pressable>
        </View>

        {/* ========================================== */}
        {/* FILTROS */}
        {/* ========================================== */}

        <View className="px-5 mt-5">
          <View className="flex-row bg-gray-100 rounded-2xl p-1">
            {/* TODOS */}
            <Pressable
              onPress={() => cambiarFiltro("todos")}
              className={`flex-1 py-2.5 rounded-xl items-center ${
                filtro === "todos" ? "bg-white" : "bg-transparent"
              }`}
              style={
                filtro === "todos"
                  ? {
                      shadowColor: "#000",
                      shadowOpacity: 0.05,
                      shadowRadius: 4,
                      elevation: 1,
                    }
                  : undefined
              }
            >
              <Text
                className={`font-calibriBold ${
                  filtro === "todos" ? "text-[#007A4E]" : "text-gray-500"
                }`}
              >
                Todos ({insumos.length})
              </Text>
            </Pressable>

            {/* ACTIVOS */}
            <Pressable
              onPress={() => cambiarFiltro("activos")}
              className={`flex-1 py-2.5 rounded-xl items-center ${
                filtro === "activos" ? "bg-white" : "bg-transparent"
              }`}
              style={
                filtro === "activos"
                  ? {
                      shadowColor: "#000",
                      shadowOpacity: 0.05,
                      shadowRadius: 4,
                      elevation: 1,
                    }
                  : undefined
              }
            >
              <Text
                className={`font-calibriBold ${
                  filtro === "activos" ? "text-[#007A4E]" : "text-gray-500"
                }`}
              >
                Activos ({activos})
              </Text>
            </Pressable>

            {/* INACTIVOS */}
            <Pressable
              onPress={() => cambiarFiltro("inactivos")}
              className={`flex-1 py-2.5 rounded-xl items-center ${
                filtro === "inactivos" ? "bg-white" : "bg-transparent"
              }`}
              style={
                filtro === "inactivos"
                  ? {
                      shadowColor: "#000",
                      shadowOpacity: 0.05,
                      shadowRadius: 4,
                      elevation: 1,
                    }
                  : undefined
              }
            >
              <Text
                className={`font-calibriBold ${
                  filtro === "inactivos" ? "text-red-500" : "text-gray-500"
                }`}
              >
                Inactivos ({inactivos})
              </Text>
            </Pressable>
          </View>
        </View>

        {/* ========================================== */}
        {/* TÍTULO DE LA LISTA */}
        {/* ========================================== */}

        <View className="px-5 mt-6 mb-3">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="font-calibriBold text-xl text-gray-900">
                Insumos registrados
              </Text>

              <Text className="text-gray-400 text-xs mt-1">
                {insumosFiltrados.length} elementos en total
              </Text>
            </View>

            <MaterialIcons name="inventory-2" size={22} color="#9CA3AF" />
          </View>
        </View>

        {/* ========================================== */}
        {/* LISTA RENDERIZADA MEDIANTE MAP */}
        {/* ========================================== */}

        <View className="px-4">
          {insumosPaginados.length === 0 ? (
            <View className="items-center mt-12 px-5">
              <View className="w-20 h-20 rounded-full bg-gray-100 items-center justify-center">
                <MaterialIcons name="inventory-2" size={42} color="#D1D5DB" />
              </View>

              <Text className="font-calibriBold text-xl mt-5 text-gray-800">
                {filtro === "activos"
                  ? "No hay insumos activos"
                  : filtro === "inactivos"
                  ? "No hay insumos inactivos"
                  : "No hay insumos registrados"}
              </Text>

              <Text className="text-gray-500 text-center mt-2 px-5">
                {filtro === "todos"
                  ? "Registra tu primer insumo para comenzar."
                  : "No existen elementos dentro de este filtro."}
              </Text>

              {filtro === "todos" && (
                <Pressable
                  onPress={() => router.push("./crearInsumo")}
                  className="bg-[#007A4E] mt-6 px-6 py-3 rounded-xl"
                >
                  <Text className="text-white font-calibriBold">
                    Registrar insumo
                  </Text>
                </Pressable>
              )}
            </View>
          ) : (
            insumosPaginados.map((item) => (
              <View key={item.id_insumo.toString()} className="mb-2">
                <VistaInsumo
                  id={item.id_insumo}
                  nombreInsumo={item.nom_insumo}
                  codigoInsumo={item.num_serie}
                  activo={item.estado === 1}
                  image={item.imagen}
                  onDelete={() => eliminarVisualmente(item.id_insumo)}
                  onEstadoChange={(nuevoEstado) =>
                    actualizarEstadoVisualmente(item.id_insumo, nuevoEstado)
                  }
                />
              </View>
            ))
          )}
        </View>

        {/* ========================================== */}
        {/* CONTROLES DE PAGINACIÓN */}
        {/* ========================================== */}

        {insumosFiltrados.length > elementosPorPagina && (
          <View className="flex-row justify-between items-center px-6 py-3 bg-white border-t border-gray-100 mt-4">
            <Pressable
              disabled={paginaActual === 1}
              onPress={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
              className={`px-4 py-2 rounded-xl flex-row items-center ${
                paginaActual === 1 ? "bg-gray-100" : "bg-[#007A4E]"
              }`}
            >
              <MaterialIcons
                name="chevron-left"
                size={20}
                color={paginaActual === 1 ? "#9CA3AF" : "white"}
              />
              <Text
                className={`font-calibriBold text-xs ml-1 ${
                  paginaActual === 1 ? "text-gray-400" : "text-white"
                }`}
              >
                Anterior
              </Text>
            </Pressable>

            <Text className="text-gray-600 font-calibriBold text-xs">
              Página {paginaActual} de {totalPaginas}
            </Text>

            <Pressable
              disabled={paginaActual === totalPaginas}
              onPress={() =>
                setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))
              }
              className={`px-4 py-2 rounded-xl flex-row items-center ${
                paginaActual === totalPaginas ? "bg-gray-100" : "bg-[#007A4E]"
              }`}
            >
              <Text
                className={`font-calibriBold text-xs mr-1 ${
                  paginaActual === totalPaginas ? "text-gray-400" : "text-white"
                }`}
              >
                Siguiente
              </Text>
              <MaterialIcons
                name="chevron-right"
                size={20}
                color={paginaActual === totalPaginas ? "#9CA3AF" : "white"}
              />
            </Pressable>
          </View>
        )}
      </View>

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