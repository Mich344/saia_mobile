import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Back from "@/components/molecules/Back";

import Container from "@/components/Container";
import Modal_Detalle_MVT_Aprendiz from "@/components/Modal_Detalle_MVT_Aprendiz";
import consultarMovimientos from "@/sql/Reporte_MVT_Aprendiz";

interface MovimientoReporte {
  id_reporte: string;
  id_ingreso: number;

  tipo_reporte: "ingreso" | "salida";

  codigo: string | null;

  fecha_hora: string;

  fecha_hora_ingreso: string;
  fecha_hora_salida: string | null;

  estado_movimiento: number | string;

  observacion: string | null;
  porteria: string | null;

  num_doc: number;

  id_guarda: number | null;

  tiene_asociado: boolean;
}

const HistorialReportes = () => {
  //======================================================
  // ESTADOS
  //======================================================

  const [movimientos, setMovimientos] = useState<MovimientoReporte[]>([]);

  const [visibleModal, setVisibleModal] = useState(false);

  const [idMovimientoSeleccionado, setIdMovimientoSeleccionado] = useState<
    number | null
  >(null);

  const [tipoMovimientoSeleccionado, setTipoMovimientoSeleccionado] = useState<
    "ingreso" | "salida"
  >("ingreso");

  const [cargando, setCargando] = useState(true);

  const [busqueda, setBusqueda] = useState("");

  const [mesSeleccionado, setMesSeleccionado] = useState<number | null>(null);

  //======================================================
  // MESES
  //======================================================

  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  //======================================================
  // CARGAR REPORTES
  //======================================================

  useEffect(() => {
    console.log("======================================");
    console.log("🔥 SE MONTÓ HISTORIAL REPORTES");
    console.log("======================================");

    cargarMovimientos();
  }, []);

  const cargarMovimientos = async () => {
    console.log("======================================");
    console.log("🔥 EJECUTANDO cargarMovimientos");
    console.log("======================================");

    setCargando(true);

    try {
      const respuesta = await consultarMovimientos();

      console.log("======================================");
      console.log("🔥 RESPUESTA DE CONSULTARMOVIMIENTOS");
      console.log(respuesta);
      console.log("======================================");

      if (respuesta.ok) {
        setMovimientos(respuesta.movimientos || []);
      } else {
        setMovimientos([]);
      }
    } catch (error) {
      console.log("🔥 ERROR CARGANDO MOVIMIENTOS:", error);

      setMovimientos([]);
    } finally {
      setCargando(false);
    }
  };

  //======================================================
  // FORMATO FECHA
  //======================================================

  const formatearFecha = (fecha: string) => {
    if (!fecha) return "--";

    try {
      // Reemplaza el espacio por 'T' para asegurar parseo ISO correcto en JS/React Native
      const fechaNormalizada = fecha.includes(" ")
        ? fecha.replace(" ", "T")
        : fecha;
      const dateObj = new Date(fechaNormalizada);

      if (isNaN(dateObj.getTime())) return "--";

      return dateObj.toLocaleDateString("es-CO", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "--";
    }
  };

  //======================================================
  // FORMATO HORA
  //======================================================

  const formatearHora = (fecha: string) => {
    if (!fecha) return "--";

    try {
      const fechaNormalizada = fecha.includes(" ")
        ? fecha.replace(" ", "T")
        : fecha;
      const dateObj = new Date(fechaNormalizada);

      if (isNaN(dateObj.getTime())) return "--";

      return dateObj.toLocaleTimeString("es-CO", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return "--";
    }
  };

  //======================================================
  // FILTRAR REPORTES (BUSCADOR Y FILTRO DE MES)
  //======================================================

  const movimientosFiltrados = useMemo(() => {
    return movimientos.filter((item) => {
      //==========================================
      // FILTRO POR MES
      //==========================================

      if (mesSeleccionado !== null) {
        const fechaNormalizada = item.fecha_hora
          ? item.fecha_hora.replace(" ", "T")
          : "";
        const fecha = new Date(fechaNormalizada);

        if (!isNaN(fecha.getTime())) {
          const mes = fecha.getMonth();
          if (mes !== mesSeleccionado) {
            return false;
          }
        }
      }

      //==========================================
      // FILTRO POR BÚSQUEDA
      //==========================================

      if (busqueda.trim() !== "") {
        const texto = busqueda.toLowerCase().trim();

        // 1. Código explícito o el código generado RPT - ID
        const codigo = (
          item.codigo || `rpt - ${item.id_ingreso}`
        ).toLowerCase();

        // 2. Tipo de reporte (ingreso / salida)
        const tipo = item.tipo_reporte ? item.tipo_reporte.toLowerCase() : "";

        // 3. Fecha en formato ISO u original (ej: "2026-09-13")
        const fechaOriginal = item.fecha_hora
          ? item.fecha_hora.toLowerCase()
          : "";

        // 4. Fecha formateada (ej: "13 de sep. de 2026")
        const fechaFormateada = formatearFecha(item.fecha_hora).toLowerCase();

        // 5. Portería u observaciones (si aplican)
        const porteria = item.porteria ? item.porteria.toLowerCase() : "";
        const observacion = item.observacion
          ? item.observacion.toLowerCase()
          : "";

        // Verificamos coincidencia con cualquiera de los campos
        const coincide =
          codigo.includes(texto) ||
          tipo.includes(texto) ||
          fechaOriginal.includes(texto) ||
          fechaFormateada.includes(texto) ||
          porteria.includes(texto) ||
          observacion.includes(texto);

        if (!coincide) {
          return false;
        }
      }

      return true;
    });
  }, [movimientos, busqueda, mesSeleccionado]);

  //======================================================
  // ABRIR DETALLE
  //======================================================

  const abrirDetalle = (item: MovimientoReporte) => {
    console.log("======================================");
    console.log("🔥 ABRIENDO REPORTE");
    console.log("ID:", item.id_ingreso);
    console.log("TIPO:", item.tipo_reporte);
    console.log("======================================");

    setIdMovimientoSeleccionado(item.id_ingreso);

    setTipoMovimientoSeleccionado(item.tipo_reporte);

    setVisibleModal(true);
  };

  //======================================================
  // CERRAR MODAL
  //======================================================

  const cerrarModal = () => {
    setVisibleModal(false);

    setIdMovimientoSeleccionado(null);

    setTipoMovimientoSeleccionado("ingreso");
  };

  //======================================================
  // CARGANDO
  //======================================================

  if (cargando) {
    return (
      <Container>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#25C9B4" />

          <Text className="text-[#777777] mt-4">Cargando historial...</Text>
        </View>
      </Container>
    );
  }

  //======================================================
  // VISTA PRINCIPAL
  //======================================================

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        <Back
          className="mb-5"
          onPress={() => router.back()}
          title="Historial de Ingresos"
          subtitle="Visualiza tu historico de ingreso y salida."
        />

        {/* ================================================= */}
        {/* TÍTULO */}
        {/* ================================================= */}

        <View className="items-center px-6 pt-4">
          {/* Subtítulo / Badge decorativo */}
          <View className="bg-[#EBFBF7] px-3 py-1 rounded-full mb-2">
            <Text className="text-[#27C8B5] text-[12px] font-semibold tracking-wide uppercase">
              Auditoría y Control
            </Text>
          </View>

          {/* Título Principal */}
          <Text className="text-[#27C8B5] text-[26px] font-extrabold text-center leading-8">
            Historial de Ingresos y Salidas
          </Text>

          {/* Descripción Resumida */}
          <Text className="text-[#5A6470] text-[14px] text-center mt-3 leading-5 px-2">
            Consulta tus reportes de los últimos 12 meses y lleva el control
            detallado de tus insumos registrados.
          </Text>
        </View>

        {/* ================================================= */}
        {/* BUSCADOR */}
        {/* ================================================= */}

        <View className="flex-row px-4 mt-6">
          <View className="flex-1 h-[56px] rounded-[18px] border border-[#E5E5E5] bg-white flex-row items-center px-4">
            <Ionicons name="search-outline" size={27} color="#111111" />

            <TextInput
              value={busqueda}
              onChangeText={setBusqueda}
              placeholder="Buscar reportes..."
              placeholderTextColor="#999999"
              className="flex-1 ml-3 text-[16px] text-[#222222]"
            />
          </View>
        </View>

        {/* ================================================= */}
        {/* MESES */}
        {/* ================================================= */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-6"
          contentContainerStyle={{
            paddingHorizontal: 16,
            gap: 10,
          }}
        >
          {meses.map((mes, index) => {
            const seleccionado = mesSeleccionado === index;

            return (
              <TouchableOpacity
                key={mes}
                activeOpacity={0.8}
                onPress={() => {
                  if (seleccionado) {
                    setMesSeleccionado(null);
                  } else {
                    setMesSeleccionado(index);
                  }
                }}
                className={`px-5 py-2 rounded-full ${
                  seleccionado ? "bg-[#3CD1C0]" : "bg-[#E9E9E9]"
                }`}
              >
                <Text
                  className={`font-bold ${
                    seleccionado ? "text-white" : "text-[#222222]"
                  }`}
                >
                  {mes}
                </Text>
              </TouchableOpacity>
            );
          })}

          {/* CALENDARIO */}

          <TouchableOpacity
            activeOpacity={0.8}
            className="w-[48px] h-[34px] rounded-full bg-[#E9E9E9] items-center justify-center"
            onPress={() => setMesSeleccionado(null)}
          >
            <Ionicons name="calendar-outline" size={20} color="#222222" />
          </TouchableOpacity>
        </ScrollView>

        {/* ================================================= */}
        {/* CONTENEDOR REPORTES */}
        {/* ================================================= */}

        <View className="mx-4 mt-5 bg-white rounded-[20px] border border-[#E6E6E6] overflow-hidden">
          {movimientosFiltrados.length === 0 ? (
            //================================================
            // SIN REPORTES
            //================================================

            <View className="items-center justify-center py-20 px-8">
              <View className="w-[65px] h-[65px] rounded-full bg-[#F1F1F1] items-center justify-center">
                <Ionicons name="file-tray-outline" size={35} color="#999999" />
              </View>

              <Text className="text-[17px] font-bold text-[#777777] mt-5">
                No hay más registros
              </Text>

              {busqueda.trim() !== "" || mesSeleccionado !== null ? (
                <Text className="text-[13px] text-[#999999] text-center mt-2">
                  No encontramos reportes con los filtros seleccionados.
                </Text>
              ) : (
                <Text className="text-[13px] text-[#999999] text-center mt-2">
                  Todavía no tienes movimientos registrados.
                </Text>
              )}
            </View>
          ) : (
            //================================================
            // REPORTES
            //================================================

            movimientosFiltrados.map((item, index) => {
              const esIngreso = item.tipo_reporte === "ingreso";

              const colorPrincipal = esIngreso ? "#35B94A" : "#EF4444";

              const colorFondo = esIngreso ? "#EAF9EE" : "#FFEAEA";

              const colorIconoFondo = esIngreso ? "#DDF7E4" : "#FFE1E1";

              return (
                <TouchableOpacity
                  key={item.id_reporte}
                  activeOpacity={0.8}
                  onPress={() => abrirDetalle(item)}
                  className={`px-4 py-5 ${
                    index !== movimientosFiltrados.length - 1
                      ? "border-b border-[#EEEEEE]"
                      : ""
                  }`}
                >
                  <View className="flex-row items-center">
                    {/* ================================= */}
                    {/* ICONO DOCUMENTO */}
                    {/* ================================= */}

                    <View
                      className="w-[48px] h-[48px] rounded-[9px] items-center justify-center"
                      style={{
                        backgroundColor: colorIconoFondo,
                      }}
                    >
                      <Ionicons
                        name="document-text-outline"
                        size={27}
                        color={colorPrincipal}
                      />
                    </View>

                    {/* ================================= */}
                    {/* INFORMACIÓN */}
                    {/* ================================= */}

                    <View className="flex-1 ml-4">
                      <Text className="text-[12px] text-[#B0B0B0]">
                        {formatearFecha(item.fecha_hora)}
                      </Text>

                      <Text
                        className="text-[15px] font-bold text-[#202020] mt-1"
                        numberOfLines={1}
                      >
                        {item.codigo || `RPT - ${item.id_ingreso}`}
                      </Text>

                      <Text
                        className="text-[13px] font-bold mt-1"
                        style={{
                          color: colorPrincipal,
                        }}
                      >
                        {esIngreso ? "Ingreso" : "Salida"}
                      </Text>
                    </View>

                    {/* ================================= */}
                    {/* DERECHA */}
                    {/* ================================= */}

                    <View className="items-end">
                      <View
                        className="flex-row items-center rounded-full px-4 py-1"
                        style={{
                          backgroundColor: colorFondo,
                        }}
                      >
                        <View
                          className="w-2 h-2 rounded-full mr-2"
                          style={{
                            backgroundColor: colorPrincipal,
                          }}
                        />

                        <Text
                          className="text-[12px] font-bold"
                          style={{
                            color: colorPrincipal,
                          }}
                        >
                          {esIngreso ? "INGRESO" : "SALIDA"}
                        </Text>
                      </View>

                      <Text className="text-[12px] text-[#555555] mt-2">
                        {formatearHora(item.fecha_hora)}
                      </Text>
                    </View>

                    {/* ================================= */}
                    {/* FLECHA */}
                    {/* ================================= */}

                    <Ionicons
                      name="chevron-forward"
                      size={22}
                      color="#222222"
                      style={{
                        marginLeft: 10,
                      }}
                    />
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>

        {/* ================================================= */}
        {/* INFORMACIÓN INFERIOR */}
        {/* ================================================= */}

        {movimientosFiltrados.length > 0 && (
          <View className="items-center mt-5">
            <Ionicons name="file-tray-outline" size={42} color="#999999" />

            <Text className="text-[16px] text-[#999999] mt-2">
              No hay más registros
            </Text>
          </View>
        )}
      </ScrollView>

      {/* ================================================= */}
      {/* MODAL DETALLE */}
      {/* ================================================= */}

      <Modal_Detalle_MVT_Aprendiz
        visible={visibleModal}
        idMovimiento={idMovimientoSeleccionado}
        tipoMovimiento={tipoMovimientoSeleccionado}
        onClose={cerrarModal}
      />
    </Container>
  );
};

export default HistorialReportes;