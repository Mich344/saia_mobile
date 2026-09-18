import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import consultarDetalleMovimiento from "@/sql/Detalle_Reporte_MVT_Aprendiz";

interface ModalDetalleMovimientoProps {
  visible: boolean;
  idMovimiento: number | null;

  // NUEVO:
  // Nos dice si el reporte que seleccionamos
  // es un ingreso o una salida.
  tipoMovimiento: "ingreso" | "salida";

  onClose: () => void;
}

const Modal_Detalle_MVT_Aprendiz = ({
  visible,
  idMovimiento,
  tipoMovimiento,
  onClose,
}: ModalDetalleMovimientoProps) => {
  //======================================================
  // ESTADOS
  //======================================================

  const [movimiento, setMovimiento] = useState<any>(null);

  const [aprendiz, setAprendiz] = useState<any>(null);

  const [guarda, setGuarda] = useState<any>(null);

  const [insumos, setInsumos] = useState<any[]>([]);

  const [cargando, setCargando] = useState(false);

  //======================================================
  // SABER SI ES INGRESO
  //======================================================

  const esIngreso = tipoMovimiento === "ingreso";

  const esSalida = tipoMovimiento === "salida";

  //======================================================
  // CARGAR DETALLE
  //======================================================

  useEffect(() => {
    if (visible && idMovimiento !== null) {
      cargarDetalle();
    }
  }, [visible, idMovimiento]);

  const cargarDetalle = async () => {
    if (idMovimiento === null) {
      return;
    }

    setCargando(true);

    setMovimiento(null);
    setAprendiz(null);
    setGuarda(null);
    setInsumos([]);

    try {
      console.log("======================================");
      console.log("🔥 CARGANDO DETALLE");
      console.log("ID:", idMovimiento);
      console.log("TIPO:", tipoMovimiento);
      console.log("======================================");

      const respuesta = await consultarDetalleMovimiento(idMovimiento);

      console.log("======================================");
      console.log("🔥 RESPUESTA DETALLE");
      console.log(respuesta);
      console.log("======================================");

      if (respuesta.ok) {
        setMovimiento(respuesta.movimiento || null);

        setAprendiz(respuesta.aprendiz || null);

        setGuarda(respuesta.guarda || null);

        setInsumos(respuesta.insumos || []);
      }
    } catch (error) {
      console.log("🔥 ERROR DETALLE:", error);
    } finally {
      setCargando(false);
    }
  };

  //======================================================
  // FORMATEAR FECHA
  //======================================================

  const formatearFecha = (fecha: string | null) => {
    if (!fecha) {
      return "--";
    }

    return new Date(fecha).toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  //======================================================
  // FORMATEAR HORA
  //======================================================

  const formatearHora = (fecha: string | null) => {
    if (!fecha) {
      return "--";
    }

    return new Date(fecha).toLocaleTimeString("es-CO", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  //======================================================
  // FECHA DEL REPORTE SELECCIONADO
  //======================================================

  const fechaReporte = esIngreso
    ? movimiento?.fecha_hora_ingreso
    : movimiento?.fecha_hora_salida;

  //======================================================
  // ESTADO DEL MOVIMIENTO
  //======================================================

  const movimientoActivo =
    movimiento?.estado_movimiento === 1 ||
    movimiento?.estado_movimiento === "1";

  //======================================================
  // ESTADO VISUAL
  //======================================================

  const estadoTexto = esSalida
    ? "FINALIZADO"
    : movimientoActivo
      ? "INGRESO"
      : "INGRESO";

  //======================================================
  // COLORES SEGÚN TIPO
  //======================================================

  const colorPrincipal = esIngreso ? "#35B94A" : "#EF4444";

  const colorFondoBadge = esIngreso ? "#EAF9EE" : "#FFEAEA";

  const colorFondoIcono = esIngreso ? "#EEF9F1" : "#FFF0F0";

  const colorFondoTipo = esIngreso ? "#DCF8E2" : "#FFE0E0";

  //======================================================
  // TEXTO PRINCIPAL
  //======================================================

  const tituloMovimiento = esIngreso
    ? "Registro de ingreso"
    : "Registro de salida";

  //======================================================
  // ICONO PRINCIPAL
  //======================================================

  const iconoMovimiento = esIngreso ? "log-in-outline" : "log-out-outline";

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-[#FAFAFA]">
        {/* ================================================= */}
        {/* ENCABEZADO */}
        {/* ================================================= */}

        <View className="px-5 pt-5 pb-3 bg-[#FAFAFA]">
          <View className="flex-row items-center justify-between">
            <Text className="text-[21px] font-bold text-[#172033]">
              Detalle del reporte
            </Text>

            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.7}
              className="w-10 h-10 rounded-full bg-white items-center justify-center border border-[#EEEEEE]"
            >
              <Ionicons name="close" size={23} color="#172033" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ================================================= */}
        {/* CARGANDO */}
        {/* ================================================= */}

        {cargando ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#25C9B4" />

            <Text className="mt-4 text-[#777777]">Cargando reporte...</Text>
          </View>
        ) : !movimiento ? (
          /* ================================================= */
          /* ERROR / SIN DATOS */
          /* ================================================= */

          <View className="flex-1 items-center justify-center px-8">
            <Ionicons name="document-text-outline" size={55} color="#AAAAAA" />

            <Text className="text-[19px] font-bold text-[#222222] mt-4 text-center">
              No se pudo cargar el reporte
            </Text>

            <Text className="text-[#777777] text-center mt-2">
              No encontramos información asociada a este movimiento.
            </Text>
          </View>
        ) : (
          /* ================================================= */
          /* CONTENIDO */
          /* ================================================= */

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: 35,
            }}
          >
            {/* ================================================= */}
            {/* TARJETA PRINCIPAL */}
            {/* ================================================= */}

            <View className="bg-white rounded-[18px] border border-[#EEEEEE] px-4 py-4 shadow-sm">
              <View className="flex-row items-center">
                {/* ========================================= */}
                {/* ICONO */}
                {/* ========================================= */}

                <View
                  className="w-[92px] h-[92px] rounded-full items-center justify-center"
                  style={{
                    backgroundColor: colorFondoIcono,
                  }}
                >
                  <Ionicons
                    name={iconoMovimiento}
                    size={54}
                    color={colorPrincipal}
                  />
                </View>

                {/* ========================================= */}
                {/* CENTRO */}
                {/* ========================================= */}

                <View className="flex-1 ml-4">
                  {/* BADGE */}
                  <View
                    className="self-start flex-row items-center rounded-full px-3 py-1"
                    style={{
                      backgroundColor: colorFondoBadge,
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
                      {esIngreso ? estadoTexto : "SALIDA"}
                    </Text>
                  </View>

                  {/* TITULO */}

                  <Text className="text-[18px] font-bold text-[#172033] mt-2">
                    {tituloMovimiento}
                  </Text>

                  {/* CODIGO */}

                  <Text className="text-[21px] font-bold text-[#12AFAF] mt-1">
                    #{movimiento.codigo || `RAC-${movimiento.id_ingreso}`}
                  </Text>
                </View>

                {/* ========================================= */}
                {/* FECHA / HORA */}
                {/* ========================================= */}

                <View className="ml-2">
                  <View className="flex-row items-center">
                    <Ionicons
                      name="calendar-outline"
                      size={18}
                      color="#444444"
                    />

                    <Text className="text-[13px] text-[#303030] ml-2">
                      {formatearFecha(fechaReporte)}
                    </Text>
                  </View>

                  <View className="flex-row items-center mt-5">
                    <Ionicons name="time-outline" size={18} color="#444444" />

                    <Text className="text-[13px] text-[#303030] ml-2">
                      {formatearHora(fechaReporte)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* ================================================= */}
            {/* ACCESO / ESTADO */}
            {/* ================================================= */}

            <View
              className="mt-4 rounded-[18px] px-5 py-4 flex-row items-center"
              style={{
                backgroundColor: esIngreso ? "#EFFBF4" : "#FFF3F3",
              }}
            >
              <View
                className="w-[48px] h-[48px] rounded-full items-center justify-center"
                style={{
                  backgroundColor: esIngreso ? "#07983C" : "#EF4444",
                }}
              >
                <Ionicons
                  name={esIngreso ? "shield-checkmark" : "log-out-outline"}
                  size={29}
                  color="white"
                />
              </View>

              <View className="flex-1 ml-4">
                <Text className="text-[16px] font-bold text-[#172033]">
                  {esIngreso ? "Acceso autorizado" : "Salida registrada"}
                </Text>

                <Text className="text-[13px] text-[#666666] mt-1">
                  {movimiento.observacion ||
                    (esIngreso
                      ? "Sin novedades registradas."
                      : "Salida registrada correctamente.")}
                </Text>
              </View>

              <View
                className="w-[58px] h-[58px] rounded-full items-center justify-center"
                style={{
                  backgroundColor: esIngreso ? "#DDF5E4" : "#FFE2E2",
                }}
              >
                <Ionicons
                  name="checkmark"
                  size={32}
                  color={esIngreso ? "#9ED9AD" : "#F5A0A0"}
                />
              </View>
            </View>

            {/* ================================================= */}
            {/* INFORMACIÓN DEL REGISTRO */}
            {/* ================================================= */}

            <View className="mt-4 bg-white rounded-[18px] border border-[#EEEEEE] p-4">
              <View className="flex-row items-center">
                <Ionicons
                  name="information-circle-outline"
                  size={23}
                  color="#16B7B7"
                />

                <Text className="text-[16px] font-bold text-[#13A9A9] ml-2">
                  Información del registro
                </Text>
              </View>

              <View className="h-[1px] bg-[#EEEEEE] mt-4" />

              <View className="flex-row mt-4">
                {/* ========================================= */}
                {/* FECHA */}
                {/* ========================================= */}

                <View className="flex-1 items-center">
                  <Ionicons name="calendar-outline" size={22} color="#16B7B7" />

                  <Text className="text-[12px] text-[#555555] mt-3">Fecha</Text>

                  <Text className="text-[13px] font-bold text-[#172033] mt-1">
                    {formatearFecha(fechaReporte)}
                  </Text>
                </View>

                <View className="w-[1px] bg-[#EEEEEE]" />

                {/* ========================================= */}
                {/* HORA */}
                {/* ========================================= */}

                <View className="flex-1 items-center">
                  <Ionicons name="time-outline" size={23} color="#16B7B7" />

                  <Text className="text-[12px] text-[#555555] mt-3">Hora</Text>

                  <Text className="text-[13px] font-bold text-[#172033] mt-1">
                    {formatearHora(fechaReporte)}
                  </Text>
                </View>

                <View className="w-[1px] bg-[#EEEEEE]" />

                {/* ========================================= */}
                {/* TIPO */}
                {/* ========================================= */}

                <View className="flex-1 items-center">
                  <Ionicons
                    name={iconoMovimiento}
                    size={23}
                    color={colorPrincipal}
                  />

                  <Text className="text-[12px] text-[#555555] mt-3">Tipo</Text>

                  <View
                    className="rounded-full px-3 py-1 mt-1"
                    style={{
                      backgroundColor: colorFondoTipo,
                    }}
                  >
                    <Text
                      className="text-[12px] font-bold"
                      style={{
                        color: colorPrincipal,
                      }}
                    >
                      {esIngreso ? "Ingreso" : "Salida"}
                    </Text>
                  </View>
                </View>

                <View className="w-[1px] bg-[#EEEEEE]" />

                {/* ========================================= */}
                {/* PORTERÍA */}
                {/* ========================================= */}

                <View className="flex-1 items-center">
                  <Ionicons name="business-outline" size={22} color="#16B7B7" />

                  <Text className="text-[12px] text-[#555555] mt-3">
                    Portería
                  </Text>

                  <Text
                    className="text-[13px] font-bold text-[#172033] mt-1 text-center"
                    numberOfLines={1}
                  >
                    {movimiento.porteria || "2"}
                  </Text>
                </View>
              </View>
            </View>

            {/* ================================================= */}
            {/* INSUMOS */}
            {/* ================================================= */}

            <View className="mt-4 bg-white rounded-[18px] border border-[#EEEEEE] p-4">
              <View className="flex-row items-center">
                <Ionicons name="cube-outline" size={23} color="#16B7B7" />

                <Text className="text-[16px] font-bold text-[#13A9A9] ml-2">
                  Insumos registrados
                </Text>

                <View className="bg-[#DDF7E4] rounded-full px-3 py-1 ml-3">
                  <Text className="text-[12px] font-bold text-[#35A94A]">
                    {insumos.length}
                  </Text>
                </View>
              </View>

              {insumos.length === 0 ? (
                <View className="items-center py-8">
                  <Ionicons
                    name="file-tray-outline"
                    size={42}
                    color="#AAAAAA"
                  />

                  <Text className="text-[#777777] mt-3">
                    No hay insumos registrados
                  </Text>
                </View>
              ) : (
                <View className="mt-3">
                  {insumos.map((insumo, index) => (
                    <View
                      key={
                        insumo.id_insumo
                          ? `${insumo.id_insumo}-${index}`
                          : `insumo-${index}`
                      }
                      className="border border-[#EEEEEE] rounded-[15px] px-4 py-3 mb-2"
                    >
                      <View className="flex-row items-center">
                        {/* ICONO */}

                        <View className="w-[48px] h-[48px] rounded-full bg-[#EEF8F5] items-center justify-center">
                          <Ionicons
                            name="laptop-outline"
                            size={25}
                            color="#18AFAF"
                          />
                        </View>

                        {/* DATOS */}

                        <View className="flex-1 ml-4">
                          <Text className="text-[15px] font-bold text-[#172033]">
                            {insumo.nom_insumo || "Insumo registrado"}
                          </Text>

                          <Text className="text-[13px] text-[#777777] mt-1">
                            {insumo.estado || "Verificado"}
                          </Text>
                        </View>

                        {/* CHECK */}

                        <View className="w-[27px] h-[27px] rounded-full bg-[#43BE4C] items-center justify-center">
                          <Ionicons name="checkmark" size={18} color="white" />
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>

            {/* ================================================= */}
            {/* CONTROL DE ACCESO */}
            {/* ================================================= */}

            <View className="mt-4 bg-white rounded-[18px] border border-[#EEEEEE] p-4">
              <View className="flex-row items-center">
                <Ionicons
                  name="shield-checkmark-outline"
                  size={23}
                  color="#16B7B7"
                />

                <Text className="text-[16px] font-bold text-[#13A9A9] ml-2">
                  Control de acceso
                </Text>
              </View>

              <View className="h-[1px] bg-[#EEEEEE] mt-4" />

              <View className="flex-row mt-4">
                <View className="flex-1">
                  <Text className="text-[12px] text-[#777777]">Guarda</Text>

                  <Text className="text-[14px] font-bold text-[#172033] mt-1">
                    {guarda?.nombre || "Sin registro"}
                  </Text>
                </View>

                <View className="flex-1">
                  <Text className="text-[12px] text-[#777777]">Empresa</Text>

                  <Text className="text-[14px] font-bold text-[#172033] mt-1">
                    {guarda?.empresa || "Sin registro"}
                  </Text>
                </View>
              </View>
            </View>

            {/* ================================================= */}
            {/* REGISTRO ASOCIADO */}
            {/* ================================================= */}

            {(esIngreso && movimiento.fecha_hora_salida) || esSalida ? (
              <View className="mt-4 bg-white rounded-[18px] border border-[#EEEEEE] p-4">
                {/* TITULO */}

                <View className="flex-row items-center">
                  <Ionicons name="link-outline" size={23} color="#16AFC0" />

                  <Text className="text-[16px] font-bold text-[#13A9A9] ml-2">
                    {esIngreso
                      ? "Registro de salida asociado"
                      : "Registro de ingreso asociado"}
                  </Text>
                </View>

                {/* TARJETA */}

                <View
                  className="mt-3 rounded-[15px] p-4"
                  style={{
                    backgroundColor: esIngreso ? "#F0F6FF" : "#EFFBF4",
                  }}
                >
                  <View className="flex-row items-center">
                    {/* ICONO */}

                    <View
                      className="w-[50px] h-[50px] rounded-full items-center justify-center"
                      style={{
                        backgroundColor: esIngreso ? "#E3F0FF" : "#E2F7E8",
                      }}
                    >
                      <Ionicons
                        name={esIngreso ? "log-out-outline" : "log-in-outline"}
                        size={28}
                        color={esIngreso ? "#1671E8" : "#16A34A"}
                      />
                    </View>

                    {/* DATOS */}

                    <View className="flex-1 ml-4">
                      <Text className="text-[12px] text-[#777777]">
                        {esIngreso
                          ? "Salida relacionada"
                          : "Ingreso relacionado"}
                      </Text>

                      <Text
                        className="text-[17px] font-bold mt-1"
                        style={{
                          color: esIngreso ? "#1671E8" : "#16A34A",
                        }}
                      >
                        #{movimiento.codigo || `RAC-${movimiento.id_ingreso}`}
                      </Text>

                      <View className="flex-row mt-3">
                        <View className="flex-row items-center">
                          <Ionicons
                            name="calendar-outline"
                            size={16}
                            color="#45627C"
                          />

                          <Text className="text-[12px] text-[#45627C] ml-1">
                            {formatearFecha(
                              esIngreso
                                ? movimiento.fecha_hora_salida
                                : movimiento.fecha_hora_ingreso,
                            )}
                          </Text>
                        </View>

                        <View className="flex-row items-center ml-5">
                          <Ionicons
                            name="time-outline"
                            size={16}
                            color="#45627C"
                          />

                          <Text className="text-[12px] text-[#45627C] ml-1">
                            {formatearHora(
                              esIngreso
                                ? movimiento.fecha_hora_salida
                                : movimiento.fecha_hora_ingreso,
                            )}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <Ionicons
                      name="chevron-forward"
                      size={24}
                      color="#27496B"
                    />
                  </View>

                  <Text className="text-[12px] text-[#68798B] mt-4">
                    {esIngreso
                      ? "Este ingreso está asociado a la salida registrada arriba."
                      : "Esta salida está asociada al ingreso registrado anteriormente."}
                  </Text>
                </View>
              </View>
            ) : null}

            {/* ================================================= */}
            {/* INFORMACIÓN APRENDIZ */}
            {/* ================================================= */}

            <View className="mt-4 bg-white rounded-[18px] border border-[#EEEEEE] p-4">
              <View className="flex-row items-center">
                <Ionicons name="person-outline" size={23} color="#16B7B7" />

                <Text className="text-[16px] font-bold text-[#13A9A9] ml-2">
                  Aprendiz
                </Text>
              </View>

              <View className="h-[1px] bg-[#EEEEEE] mt-4" />

              <Text className="text-[16px] font-bold text-[#172033] mt-4">
                {aprendiz?.nombre_completo || "Sin información"}
              </Text>

              <Text className="text-[13px] text-[#777777] mt-1">
                {aprendiz?.tip_doc || "Documento"}:{" "}
                {aprendiz?.num_doc || movimiento.num_doc}
              </Text>

              {aprendiz?.ficha && (
                <Text className="text-[13px] text-[#777777] mt-2">
                  Ficha: {aprendiz.ficha}
                </Text>
              )}

              {aprendiz?.programa && (
                <Text className="text-[13px] text-[#777777] mt-2">
                  Programa: {aprendiz.programa}
                </Text>
              )}

              {aprendiz?.centro && (
                <Text className="text-[13px] text-[#777777] mt-2">
                  Centro: {aprendiz.centro}
                </Text>
              )}
            </View>

            {/* ================================================= */}
            {/* BOTÓN CERRAR */}
            {/* ================================================= */}

            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.8}
              className="bg-[#263238] rounded-[15px] py-4 items-center mt-5"
            >
              <Text className="text-white text-[15px] font-bold">Cerrar</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    </Modal>
  );
};

export default Modal_Detalle_MVT_Aprendiz;
