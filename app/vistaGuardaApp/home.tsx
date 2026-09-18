import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
  Pressable,
} from "react-native";

import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import Container from "@/components/Container";

import consultarTurnoGuarda from "@/sql/Consultar_Turno_Guarda";
import finalizarTurnoGuarda from "@/sql/Finalizar_Turno_Guarda";
import consultarDashboardGuarda from "@/sql/Resumen_Reportes_Guarda";

interface DatosTurno {
  id_historial_turno: number;
  fecha: string;
  inicio_turno: string;
  finalizacion_turno: string | null;
  turno: string;
  empresa_seg: string;
  estado: string;
}

interface Actividad {
  id_ingreso: number;
  num_doc: string;
  nombre: string;
  tipo: "INGRESO" | "SALIDA";
  hora: string;
  fecha_hora_ingreso: string;
  fecha_hora_salida: string | null;
  observacion: string | null;
  codigo: string | null;
  porteria: string | null;
  estado: string;
}

interface Dashboard {
  ingresos: number;
  salidas: number;
  personasDentro: number;
}

const HomeGuarda = () => {
  //==================================================
  // TURNO
  //==================================================
  const [cargando, setCargando] = useState(true);
  const [datosTurno, setDatosTurno] = useState<DatosTurno | null>(null);
  const [tiempo, setTiempo] = useState("00:00:00");

  //==================================================
  // DASHBOARD
  //==================================================
  const [resumen, setResumen] = useState<Dashboard>({
    ingresos: 0,
    salidas: 0,
    personasDentro: 0,
  });

  const [actividad, setActividad] = useState<Actividad[]>([]);
  const [cargandoDashboard, setCargandoDashboard] = useState(true);

  //==================================================
  // CONSULTAR TURNO
  //==================================================
  const verificarTurno = async () => {
    try {
      const respuesta = await consultarTurnoGuarda();

      if (!respuesta.ok) {
        setCargando(false);
        return;
      }

      if (!respuesta.tieneTurno) {
        router.replace("/vistaGuardaApp/Inic_Turn_Guarda");
        return;
      }

      setDatosTurno(respuesta.turno);
      setCargando(false);
    } catch (error) {
      console.log("ERROR VERIFICANDO TURNO:", error);
      setCargando(false);
    }
  };

  //==================================================
  // CONSULTAR DASHBOARD
  //==================================================
  const cargarDashboard = async () => {
    try {
      setCargandoDashboard(true);
      const respuesta = await consultarDashboardGuarda();

      if (!respuesta.ok) {
        console.log("ERROR DASHBOARD:", respuesta.data?.mensaje);
        return;
      }

      setResumen({
        ingresos: Number(respuesta.data.resumen?.ingresos) || 0,
        salidas: Number(respuesta.data.resumen?.salidas) || 0,
        personasDentro: Number(respuesta.data.resumen?.personasDentro) || 0,
      });

      setActividad(respuesta.data.actividad || []);
    } catch (error) {
      console.log("ERROR CARGANDO DASHBOARD:", error);
    } finally {
      setCargandoDashboard(false);
    }
  };

  //==================================================
  // CARGAR AL ENTRAR
  //==================================================
  useFocusEffect(
    useCallback(() => {
      verificarTurno();
      cargarDashboard();
    }, [])
  );

  //==================================================
  // CRONÓMETRO
  //==================================================
  useEffect(() => {
    if (!datosTurno) return;

    const intervalo = setInterval(() => {
      const inicio = new Date(datosTurno.inicio_turno).getTime();
      const ahora = new Date().getTime();
      const diferencia = ahora - inicio;

      if (isNaN(diferencia) || diferencia < 0) {
        setTiempo("00:00:00");
        return;
      }

      const horas = Math.floor(diferencia / 3600000);
      const minutos = Math.floor((diferencia % 3600000) / 60000);
      const segundos = Math.floor((diferencia % 60000) / 1000);

      setTiempo(
        `${String(horas).padStart(2, "0")}:${String(minutos).padStart(
          2,
          "0"
        )}:${String(segundos).padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(intervalo);
  }, [datosTurno]);

  //==================================================
  // FORMATO HORA
  //==================================================
  const formatearHora = (fecha: string | null) => {
    if (!fecha) return "--:--";

    const dateObj = new Date(fecha);
    if (isNaN(dateObj.getTime())) return "--:--";

    return dateObj.toLocaleTimeString("es-CO", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  //==================================================
  // ACCIÓN FINALIZAR TURNO
  //==================================================
  const confirmarFinalizarTurno = () => {
    Alert.alert(
      "Finalizar turno",
      "¿Está seguro de que desea concluir su servicio de hoy?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sí, finalizar",
          style: "destructive",
          onPress: async () => {
            const respuesta = await finalizarTurnoGuarda();

            if (!respuesta.ok) {
              Alert.alert("Error", respuesta.data.mensaje);
              return;
            }

            Alert.alert("Turno finalizado", respuesta.data.mensaje, [
              {
                text: "Aceptar",
                onPress: () => {
                  router.replace("/vistaGuardaApp/Inic_Turn_Guarda");
                },
              },
            ]);
          },
        },
      ]
    );
  };

  //==================================================
  // CARGANDO
  //==================================================
  if (cargando) {
    return (
      <Container>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#2EE7B3" />
          <Text className="mt-4 text-gray-500">Verificando turno...</Text>
        </View>
      </Container>
    );
  }

  //==================================================
  // HOME
  //==================================================
  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        {/* ENCABEZADO */}
        <View className="mt-2 mb-5">
          <Text className="text-[27px] font-bold text-black">
            ¡Bienvenido!
          </Text>

          <Text className="text-gray-500 mt-1 text-[14px]">
            Gestiona los accesos y movimientos de SAIA.
          </Text>
        </View>

        {/* CARD DE TURNO / JORNADA (Limpia, sin botón dentro) */}
        <View className="bg-white rounded-3xl p-5 border border-emerald-100/60 shadow-lg shadow-emerald-500/5 relative overflow-hidden">
          <View className="absolute top-0 left-0 right-0 h-1.5 bg-[#16A878]" />

          <View className="flex-row justify-between items-center pb-4 border-b border-gray-100">
            <View className="flex-row items-center">
              <View className="w-11 h-11 rounded-2xl bg-[#E8FFF7] items-center justify-center border border-[#B3F5DE]">
                <Ionicons name="shield-checkmark" size={24} color="#16A878" />
              </View>

              <View className="ml-3">
                <Text className="text-gray-400 text-[11px] font-medium uppercase tracking-wider">
                  Control de servicio
                </Text>
                <Text className="font-extrabold text-[17px] text-gray-900 mt-0.5">
                  Turno Activo
                </Text>
              </View>
            </View>

            <View className="bg-[#E5FFF1] px-3 py-1.5 rounded-full flex-row items-center border border-[#B3F5DE]">
              <View className="w-2 h-2 rounded-full bg-[#16A878] mr-1.5" />
              <Text className="text-[#16A878] text-[11px] font-bold">
                En curso
              </Text>
            </View>
          </View>

          <View className="mt-4 bg-[#F8FAFC] rounded-2xl p-4 border border-slate-100">
            <View className="flex-row items-center justify-between pb-3 border-b border-slate-200/60">
              <View className="flex-row items-center">
                <Ionicons name="sunny-outline" size={16} color="#64748B" />
                <Text className="text-slate-500 text-[12px] ml-1.5 font-medium">
                  Jornada:
                </Text>
              </View>
              <Text className="text-slate-900 font-bold text-[14px]">
                {datosTurno?.turno || "Sin jornada"}
              </Text>
            </View>

            <View className="flex-row pt-3">
              <View className="flex-1 pr-2">
                <View className="flex-row items-center">
                  <Ionicons name="time-outline" size={15} color="#64748B" />
                  <Text className="text-slate-400 text-[11px] ml-1 font-medium">
                    Hora Inicio
                  </Text>
                </View>
                <Text className="font-bold text-[15px] text-slate-800 mt-1 pl-5">
                  {formatearHora(datosTurno?.inicio_turno || null)}
                </Text>
              </View>

              <View className="w-[1px] bg-slate-200/80 my-0.5" />

              <View className="flex-1 pl-4">
                <View className="flex-row items-center">
                  <Ionicons
                    name="stopwatch-outline"
                    size={15}
                    color="#16A878"
                  />
                  <Text className="text-emerald-700 text-[11px] ml-1 font-semibold">
                    Tiempo servido
                  </Text>
                </View>
                <Text className="font-extrabold text-[16px] text-[#16A878] mt-1 pl-5 tracking-wide">
                  {tiempo}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* ACCIONES RÁPIDAS */}
        <View className="mt-6">
          <Text className="text-[18px] font-bold mb-3">Acciones rápidas</Text>

          <View className="flex-row justify-between">
            {/* ESCANEAR */}
            <Pressable
              className="bg-white rounded-2xl p-3 items-center justify-center border border-gray-100 shadow-sm"
              style={{ width: "45%", minHeight: 130 }}
              onPress={() => router.push("/vistaGuardaApp/escaner_QR")}
            >
              <View className="w-10 h-10 rounded-xl bg-[#E8FFF7] items-center justify-center">
                <Ionicons name="scan-outline" size={23} color="#2ECDB1" />
              </View>

              <Text className="text-[11px] font-bold text-center mt-2">
                Escanear QR
              </Text>

              <Text className="text-[8px] text-gray-400 text-center mt-1">
                Registrar acceso
              </Text>
            </Pressable>

            {/* PERFIL */}
            <Pressable
              className="bg-white rounded-2xl p-3 items-center justify-center border border-gray-100 shadow-sm"
              style={{ width: "45%", minHeight: 130 }}
              onPress={() => router.replace("/vistaGuardaApp/perfil_Guarda")}
            >
              <View className="w-10 h-10 rounded-xl bg-[#F3EEFF] items-center justify-center">
                <Ionicons name="person-outline" size={23} color="#8067D9" />
              </View>

              <Text className="text-[11px] font-bold text-center mt-2">
                Mi perfil
              </Text>

              <Text className="text-[8px] text-gray-400 text-center mt-1">
                Cuenta
              </Text>
            </Pressable>
          </View>
        </View>

        {/* RESUMEN DEL DÍA */}
        <View className="bg-white rounded-3xl p-5 mt-6 border border-gray-100 shadow-sm">
          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-[18px] font-bold">Resumen de hoy</Text>
            <Ionicons name="today-outline" size={21} color="#2ECDB1" />
          </View>

          {cargandoDashboard ? (
            <View className="py-5 items-center">
              <ActivityIndicator size="small" color="#2ECDB1" />
            </View>
          ) : (
            <View className="flex-row">
              <View className="flex-1 items-center">
                <View className="w-10 h-10 rounded-full bg-[#E5FFF7] items-center justify-center">
                  <Ionicons name="enter-outline" size={21} color="#2ECDB1" />
                </View>

                <Text className="text-[20px] font-bold mt-2">
                  {resumen.ingresos}
                </Text>

                <Text className="text-[9px] text-gray-400 text-center mt-1">
                  Personas{"\n"}ingresadas
                </Text>
              </View>

              <View className="w-[1px] bg-gray-200" />

              <View className="flex-1 items-center">
                <View className="w-10 h-10 rounded-full bg-[#FFF0F0] items-center justify-center">
                  <Ionicons name="exit-outline" size={21} color="#EF4444" />
                </View>

                <Text className="text-[20px] font-bold mt-2">
                  {resumen.salidas}
                </Text>

                <Text className="text-[9px] text-gray-400 text-center mt-1">
                  Registros{"\n"}salidas
                </Text>
              </View>

              <View className="w-[1px] bg-gray-200" />

              <View className="flex-1 items-center">
                <View className="w-10 h-10 rounded-full bg-[#EEF7FF] items-center justify-center">
                  <Ionicons name="people-outline" size={21} color="#3BA9E8" />
                </View>

                <Text className="text-[20px] font-bold mt-2">
                  {resumen.personasDentro}
                </Text>

                <Text className="text-[9px] text-gray-400 text-center mt-1">
                  Personas{"\n"}dentro
                </Text>
              </View>
            </View>
          )}

          <View className="flex-row justify-center items-center mt-5">
            <Ionicons name="time-outline" size={13} color="#9CA3AF" />
            <Text className="text-[9px] text-gray-400 ml-1">
              Actualizado recientemente
            </Text>
          </View>
        </View>

        {/* ACTIVIDAD RECIENTE */}
        <View className="mt-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-[18px] font-bold">Actividad reciente</Text>
            <Text className="text-[#2ECDB1] text-[12px] font-bold">SAIA</Text>
          </View>

          <View className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
            {cargandoDashboard ? (
              <View className="py-10 items-center">
                <ActivityIndicator size="small" color="#2ECDB1" />
              </View>
            ) : actividad.length === 0 ? (
              <View className="items-center py-10">
                <Ionicons name="file-tray-outline" size={40} color="#CBD5E1" />
                <Text className="text-gray-400 mt-3 text-[13px]">
                  No hay movimientos registrados hoy.
                </Text>
              </View>
            ) : (
              actividad.slice(0, 6).map((item, index) => {
                const esIngreso = item.tipo === "INGRESO";
                const maxElementos = Math.min(actividad.length, 6);
                const esUltimo = index === maxElementos - 1;

                return (
                  <View
                    key={item.id_ingreso}
                    className={`flex-row items-center px-4 py-4 ${
                      !esUltimo ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <View
                      className={`w-11 h-11 rounded-full items-center justify-center ${
                        esIngreso ? "bg-[#DCFCE7]" : "bg-[#FEE2E2]"
                      }`}
                    >
                      <Ionicons
                        name={esIngreso ? "log-in-outline" : "log-out-outline"}
                        size={21}
                        color={esIngreso ? "#16A34A" : "#EF4444"}
                      />
                    </View>

                    <View className="flex-1 ml-3">
                      <Text
                        className="font-bold text-[13px]"
                        numberOfLines={1}
                      >
                        {item.nombre}
                      </Text>

                      <Text className="text-[10px] text-gray-400 mt-1">
                        {esIngreso ? "Ingreso Personal" : "Salida Personal"}
                      </Text>
                    </View>

                    <View className="items-end">
                      <Text className="text-[10px] text-gray-400">
                        {formatearHora(item.hora)}
                      </Text>

                      <View
                        className={`mt-1 px-2 py-1 rounded-full ${
                          esIngreso ? "bg-[#E5FFF1]" : "bg-[#FFF1F1]"
                        }`}
                      >
                        <Text
                          className={`text-[8px] font-bold ${
                            esIngreso ? "text-[#16A878]" : "text-[#EF4444]"
                          }`}
                        >
                          {item.estado}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })
            )}
          </View>
        </View>

        {/* MENSAJE FINAL INFORMATIVO */}
        <View className="bg-[#EFFFF9] rounded-2xl p-4 mt-6 border border-[#D3F7EA]">
          <View className="flex-row items-center">
            <Ionicons
              name="shield-checkmark-outline"
              size={23}
              color="#16A878"
            />

            <View className="flex-1 ml-3">
              <Text className="font-bold text-[13px]">Seguridad SAIA</Text>

              <Text className="text-[11px] text-gray-500 mt-1">
                Cada registro ayuda a mantener un control seguro de los accesos.
              </Text>
            </View>
          </View>
        </View>

        {/* ================================================= */}
        {/* SECCIÓN INFERIOR REDISEÑADA: FINALIZACIÓN DE TURNO */}
        {/* ================================================= */}
        <View className="mt-8 pt-4 border-t border-dashed border-gray-200">
          <View className="bg-rose-50/60 rounded-3xl p-5 border border-rose-100/80 flex-row items-center justify-between">
            <View className="flex-1 pr-3">
              <View className="flex-row items-center mb-1">
                <Ionicons name="power-outline" size={18} color="#E11D48" />
                <Text className="text-rose-900 font-extrabold text-[14px] ml-1.5">
                  Cierre de jornada
                </Text>
              </View>
              <Text className="text-rose-600/80 text-[11px] leading-4">
                ¿Terminaste tu turno de vigilancia? Haz clic para registrar tu salida.
              </Text>
            </View>

            <Pressable
              onPress={confirmarFinalizarTurno}
              className="bg-rose-600 active:bg-rose-700 px-4 py-3 rounded-2xl flex-row items-center shadow-sm"
              style={{
                shadowColor: "#E11D48",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <Ionicons name="log-out-outline" size={17} color="#FFFFFF" />
              <Text className="text-white font-bold text-[12px] ml-1.5">
                Finalizar
              </Text>
            </Pressable>
          </View>
        </View>

      </ScrollView>
    </Container>
  );
};

export default HomeGuarda;