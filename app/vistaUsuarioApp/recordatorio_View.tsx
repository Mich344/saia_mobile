import React, { useCallback, useState } from "react";
import { ScrollView, Text, TextInput, View, Pressable } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import Container from "@/components/Container";
import Recordatorio from "@/components/Recordatorio";
import Back from "@/components/molecules/Back";
import ColorGradient from "@/components/GradientP";

import Vista_Recordatorio from "@/sql/Vista_Recordatorio";

export default function RecordatoriosTalleres() {
  const [recordatorios, setRecordatorios] = useState<any[]>([]);
  const [buscar, setBuscar] = useState("");

  // 1. ESTADO PARA LA PAGINACIÓN
  const [paginaActual, setPaginaActual] = useState(1);
  const ELEMENTOS_POR_PAGINA = 5;

  const cargarRecordatorios = async () => {
    const respuesta = await Vista_Recordatorio();
    if (respuesta.ok) {
      setRecordatorios(respuesta.data.recordatorios);
    }
  };

  useFocusEffect(
    useCallback(() => {
      cargarRecordatorios();
    }, [])
  );

  // 2. FILTRADO
  const filtrados = recordatorios.filter((item) =>
    item.titulo.toLowerCase().includes(buscar.toLowerCase())
  );

  // 3. CÁLCULO DE PAGINACIÓN
  const totalPaginas = Math.ceil(filtrados.length / ELEMENTOS_POR_PAGINA) || 1;
  const inicio = (paginaActual - 1) * ELEMENTOS_POR_PAGINA;
  const fin = inicio + ELEMENTOS_POR_PAGINA;
  const recordatoriosPaginados = filtrados.slice(inicio, fin);

  // Manejar cambio de texto en búsqueda (reinicia a la página 1)
  const handleBuscarChange = (texto: string) => {
    setBuscar(texto);
    setPaginaActual(1);
  };

  return (
    <Container>
      {/* HEADER DE NAVEGACIÓN */}
      <Back
        title="Mis Recordatorios"
        subtitle="Organiza todas tus actividades"
        onPress={() => router.back()}
      />

      {/* SECCIÓN TITULAR */}
      <View className="items-center mt-6 mb-2">
        <ColorGradient
          text="RECORDATORIOS"
          fontWeight="bold"
          fontSize={24}
        />
        <Text className="text-center text-gray-500 text-xs mt-1">
          Agrega recordatorios para todo tipo de necesidad institucional.
        </Text>
      </View>

      {/* BARRA DE BÚSQUEDA + BOTÓN CREAR */}
      <View className="flex-row items-center gap-3 my-4">
        <View className="flex-1 bg-white rounded-2xl border border-gray-200 px-4 py-2 flex-row items-center">
          <Ionicons name="search" size={20} color="#6B7280" />

          <TextInput
            placeholder="Buscar recordatorio..."
            className="ml-3 flex-1 text-gray-800"
            value={buscar}
            onChangeText={handleBuscarChange}
          />
        </View>

        <Pressable
          onPress={() => router.push("/vistaUsuarioApp/recordatorio_Crear")}
          className="w-12 h-12 rounded-2xl bg-[#007A4E] justify-center items-center elevation-3 shadow-sm"
        >
          <Ionicons name="add" size={28} color="white" />
        </Pressable>
      </View>

      {/* INDICADOR DE TOTAL */}
      <View className="flex-row items-center justify-between mb-3 px-1">
        <Text className="text-gray-400 font-semibold text-xs uppercase tracking-wider">
          Lista de Actividades
        </Text>
        <Text className="text-[#007A4E] font-bold text-xs bg-[#E6F4EF] px-2.5 py-1 rounded-full">
          {filtrados.length} {filtrados.length === 1 ? "activo" : "activos"}
        </Text>
      </View>
      <View className="w-full h-px bg-gray-200 mb-4" />

      {/* LISTA DE RECORDATORIOS */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {filtrados.length === 0 ? (
          <View className="items-center justify-center mt-12 px-6">
            <View className="w-20 h-20 rounded-full bg-gray-50 items-center justify-center mb-4 border border-gray-100">
              <Ionicons
                name="calendar-clear-outline"
                size={38}
                color="#9CA3AF"
              />
            </View>
            <Text className="text-gray-700 font-bold text-base text-center">
              No hay recordatorios
            </Text>
            <Text className="text-gray-400 text-xs text-center mt-1">
              Crea uno nuevo presionando el botón "+" a la derecha del buscador.
            </Text>
          </View>
        ) : (
          <>
            {/* Renderiza únicamente los 5 elementos de la página actual */}
            {recordatoriosPaginados.map((item) => (
              <Recordatorio
                onDelete={cargarRecordatorios}
                id={item.id_recordatorio}
                key={item.id_recordatorio}
                titulo={item.titulo}
                descripcion={item.descripcion}
                fecha={item.fecha_limite}
                hora={item.hora_limite}
                prioridad={item.prioridad}
                url={item.url}
              />
            ))}

            {/* CONTROLES DE PAGINACIÓN (1 2 3...) */}
            {totalPaginas > 1 && (
              <View className="flex-row items-center justify-between my-6 px-2">
                <Pressable
                  disabled={paginaActual === 1}
                  onPress={() => setPaginaActual((prev) => prev - 1)}
                  className={`flex-row items-center px-3 py-2 rounded-xl border ${
                    paginaActual === 1
                      ? "border-gray-200 bg-gray-100"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  <Ionicons
                    name="chevron-back"
                    size={16}
                    color={paginaActual === 1 ? "#9CA3AF" : "#374151"}
                  />
                  <Text
                    className={`text-xs font-semibold ml-1 ${
                      paginaActual === 1 ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    Anterior
                  </Text>
                </Pressable>

                {/* Números de páginas */}
                <View className="flex-row items-center gap-1.5">
                  {Array.from({ length: totalPaginas }, (_, index) => {
                    const numeroPagina = index + 1;
                    const esActiva = numeroPagina === paginaActual;
                    return (
                      <Pressable
                        key={numeroPagina}
                        onPress={() => setPaginaActual(numeroPagina)}
                        className={`w-8 h-8 rounded-xl items-center justify-center ${
                          esActiva
                            ? "bg-[#007A4E]"
                            : "bg-gray-100 border border-gray-200"
                        }`}
                      >
                        <Text
                          className={`text-xs font-bold ${
                            esActiva ? "text-white" : "text-gray-600"
                          }`}
                        >
                          {numeroPagina}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>

                <Pressable
                  disabled={paginaActual === totalPaginas}
                  onPress={() => setPaginaActual((prev) => prev + 1)}
                  className={`flex-row items-center px-3 py-2 rounded-xl border ${
                    paginaActual === totalPaginas
                      ? "border-gray-200 bg-gray-100"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold mr-1 ${
                      paginaActual === totalPaginas
                        ? "text-gray-400"
                        : "text-gray-700"
                    }`}
                  >
                    Siguiente
                  </Text>
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={paginaActual === totalPaginas ? "#9CA3AF" : "#374151"}
                  />
                </Pressable>
              </View>
            )}
          </>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </Container>
  );
}