import {
  View,
  Text,
  ScrollView,
  Pressable,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import { useState, useRef, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import Container from "@/components/Container";
import GradientP from "@/components/GradientP";
import Button from "@/components/Button";

import FotoAprendiz from "./components/Foto_Aprendiz";
import Estado from "./components/Estado";
import CardMiniInsumo from "./components/CardMini_Insumo";

import registrarIngreso from "@/sql/Registrar_Ingreso";
import rechazarIngreso from "@/sql/Rechazo_Ingreso";

export default function InfoUsuario() {
  const params = useLocalSearchParams();
  const { aprendiz, tieneFoto } = params;

  // Parseo dinámico asegurando tomar el parámetro fresco del último QR escaneado
  const datos = aprendiz ? JSON.parse(aprendiz as string) : null;

  const persona = datos?.persona || {};
  const academico = datos?.academico || {};
  const insumos = datos?.insumos || [];

  const puedeIngresar = tieneFoto === "true";

  // Ref de control para evitar ejecuciones múltiples
  const alertaProcesada = useRef(false);

  // Estados de Modales y Cargas
  const [modalFotoVisible, setModalFotoVisible] = useState(false);
  const [modalRechazo, setModalRechazo] = useState(false);
  const [motivoRechazo, setMotivoRechazo] = useState("");
  const [rechazando, setRechazando] = useState(false);
  const [ingresando, setIngresando] = useState(false);

  // Modal para reemplazo de alertas
  const [modalAlerta, setModalAlerta] = useState<{
    visible: boolean;
    titulo: string;
    mensaje: string;
    tipo: "info" | "exito" | "error" | "confirmar_ingreso";
    onAceptar?: () => void;
  }>({
    visible: false,
    titulo: "",
    mensaje: "",
    tipo: "info",
  });

  // REINICIAR ESTADOS Y EVALUAR CADA VEZ QUE LA VISTA SE ENFOCA TRAS UN ESCANEO
  useFocusEffect(
    useCallback(() => {
      alertaProcesada.current = false;
      setMotivoRechazo("");
      setRechazando(false);
      setIngresando(false);
      setModalRechazo(false);

      if (!puedeIngresar) {
        setModalFotoVisible(true);
      } else {
        setModalFotoVisible(false);
      }
    }, [aprendiz, tieneFoto]),
  );

  const cerrarAlerta = () => {
    const callback = modalAlerta.onAceptar;
    setModalAlerta((prev) => ({ ...prev, visible: false }));
    if (callback) callback();
  };

  const cerrarModalFotoYRegresar = () => {
    setModalFotoVisible(false);
    if (router.canGoBack()) {
      router.back();
    }
  };

  // ==========================================
  // CONFIRMAR RECHAZO DE INGRESO
  // ==========================================
  const confirmarRechazo = async () => {
    if (!motivoRechazo.trim()) {
      setModalAlerta({
        visible: true,
        titulo: "Motivo requerido",
        mensaje: "Debe escribir el motivo por el cual se rechaza el ingreso.",
        tipo: "error",
      });
      return;
    }

    try {
      setRechazando(true);

      // Conversión limpia a String o null para evitar errores de tipo en la API
      const documentoFinal = persona.num_doc
        ? String(persona.num_doc).trim()
        : null;

      const respuesta = await rechazarIngreso({
        num_doc: documentoFinal,
        nombre_persona: persona.nombre_completo || "Usuario no matriculado",
        motivo: motivoRechazo.trim(),
      });

      if (!respuesta.ok) {
        setModalAlerta({
          visible: true,
          titulo: "No se pudo registrar",
          mensaje:
            respuesta.data?.mensaje || "No fue posible registrar el rechazo.",
          tipo: "error",
        });
        return;
      }

      setModalRechazo(false);
      setMotivoRechazo("");

      setModalAlerta({
        visible: true,
        titulo: "Ingreso rechazado",
        mensaje:
          respuesta.data?.mensaje ||
          "Reporte de rechazo registrado correctamente.",
        tipo: "exito",
        onAceptar: () => {
          if (router.canGoBack()) router.back();
        },
      });
    } catch (error) {
      setModalAlerta({
        visible: true,
        titulo: "Error de conexión",
        mensaje: "No fue posible conectar con el servidor.",
        tipo: "error",
      });
    } finally {
      setRechazando(false);
    }
  };

  // ==========================================
  // AUTORIZAR INGRESO
  // ==========================================
  const solicitarAutorizacion = () => {
    if (!puedeIngresar) {
      setModalFotoVisible(true);
      return;
    }

    setModalAlerta({
      visible: true,
      titulo: "Autorizar ingreso",
      mensaje: `¿Desea autorizar el ingreso de ${persona.nombre_completo}?`,
      tipo: "confirmar_ingreso",
    });
  };

  const ejecutarIngreso = async () => {
    try {
      setIngresando(true);
      setModalAlerta((prev) => ({ ...prev, visible: false }));

      const respuesta = await registrarIngreso({
        num_doc: persona.num_doc,
      });

      if (!respuesta.ok) {
        setModalAlerta({
          visible: true,
          titulo: "No se pudo registrar",
          mensaje:
            respuesta.data?.mensaje || "No fue posible autorizar el ingreso.",
          tipo: "error",
        });
        return;
      }

      setModalAlerta({
        visible: true,
        titulo: "Ingreso registrado",
        mensaje: respuesta.data.mensaje,
        tipo: "exito",
        onAceptar: () => {
          if (router.canGoBack()) router.back();
        },
      });
    } catch (error) {
      setModalAlerta({
        visible: true,
        titulo: "Error de conexión",
        mensaje: "No fue posible conectar con el servidor.",
        tipo: "error",
      });
    } finally {
      setIngresando(false);
    }
  };

  if (!datos) return null;

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* ENCABEZADO */}
        <View className="mt-6 px-1">
          <Text className="text-gray-400 text-xs font-semibold tracking-widest uppercase text-center">
            Control de acceso
          </Text>
            <View className="items-center">
 <GradientP
            text="Ingreso de aprendiz"
            fontWeight="bold"
            fontSize={27}
          />
            </View>
         
          <Text className="text-gray-500 text-sm mt-1 text-center">
            Información verificada mediante código QR
          </Text>
        </View>

        {/* PERFIL DEL APRENDIZ */}
        <View className="bg-white rounded-[30px] mt-7 p-6 shadow-sm">
          <View className="items-center">
            <View
              className={`rounded-full p-1 ${
                puedeIngresar ? "bg-[#00BF63]" : "bg-red-500"
              }`}
            >
              <View className="bg-white rounded-full p-1">
                <FotoAprendiz aprendiz={persona} />
              </View>
            </View>

            <Text className="text-gray-900 text-2xl font-bold text-center mt-5">
              {persona.nombre_completo}
            </Text>

            <View className="flex-row items-center mt-2">
              <Ionicons name="card-outline" size={16} color="#6B7280" />
              <Text className="text-gray-500 ml-2 text-sm">
                {persona.tip_doc}
              </Text>
              <Text className="text-gray-300 mx-2">•</Text>
              <Text className="text-gray-700 font-semibold text-sm">
                {persona.num_doc}
              </Text>
            </View>

            <View className="mt-4">
              <Estado estado={academico.estado} />
            </View>
          </View>

          <View className="h-px bg-gray-100 my-6" />

          <Text className="text-gray-800 text-lg font-bold mb-5">
            Información personal
          </Text>

          <View className="flex-row">
            <View className="flex-1 mr-2">
              <View className="bg-gray-50 rounded-2xl p-4">
                <Ionicons name="call-outline" size={20} color="#00BF63" />
                <Text className="text-gray-400 text-xs mt-3">Teléfono</Text>
                <Text className="text-gray-800 font-semibold mt-1">
                  {persona.tel || "No registrado"}
                </Text>
              </View>
            </View>

            <View className="flex-1 ml-2">
              <View className="bg-gray-50 rounded-2xl p-4">
                <Ionicons name="water-outline" size={20} color="#EF4444" />
                <Text className="text-gray-400 text-xs mt-3">
                  Tipo de sangre
                </Text>
                <Text className="text-gray-800 font-semibold mt-1">
                  {persona.tip_sang || "No registrado"}
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-gray-50 rounded-2xl p-4 mt-3">
            <View className="flex-row items-center">
              <Ionicons name="mail-outline" size={20} color="#3B82F6" />
              <View className="ml-3 flex-1">
                <Text className="text-gray-400 text-xs">
                  Correo electrónico
                </Text>
                <Text
                  className="text-gray-800 font-semibold mt-1"
                  numberOfLines={1}
                >
                  {persona.email || "No registrado"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* AVISO FOTO */}
        {!puedeIngresar && (
          <View className="bg-red-50 border border-red-200 rounded-3xl p-5 mt-5">
            <View className="flex-row items-center">
              <View className="bg-red-100 w-11 h-11 rounded-2xl items-center justify-center">
                <Ionicons name="camera-outline" size={22} color="#DC2626" />
              </View>

              <View className="ml-3 flex-1">
                <Text className="text-red-700 font-bold">
                  Foto no registrada
                </Text>
                <Text className="text-red-500 text-xs mt-1">
                  El aprendiz no cumple los requisitos de ingreso.
                </Text>
              </View>
            </View>

            <Text className="text-red-600 text-sm mt-4 leading-5">
              Debe registrar una fotografía antes de poder autorizar el ingreso
              a las instalaciones.
            </Text>
          </View>
        )}

        {/* INFORMACIÓN ACADÉMICA */}
        <View className="mt-7">
          <Text className="text-gray-800 text-xl font-bold mb-4">
            Formación académica
          </Text>

          <View className="bg-white rounded-3xl p-5 shadow-sm">
            <View className="flex-row items-center">
              <View className="bg-[#ECFDF5] w-11 h-11 rounded-2xl items-center justify-center">
                <Ionicons name="business-outline" size={21} color="#00BF63" />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-gray-400 text-xs">
                  Centro de formación
                </Text>
                <Text className="text-gray-800 font-bold mt-1">
                  {academico.centro || "No registrado"}
                </Text>
              </View>
            </View>

            <View className="h-px bg-gray-100 my-5" />

            <View className="flex-row items-center">
              <View className="bg-cyan-50 w-11 h-11 rounded-2xl items-center justify-center">
                <Ionicons name="school-outline" size={21} color="#20B8C2" />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-gray-800 font-bold mt-1">
                  {academico.programa || "Sin formación activa"}
                </Text>
              </View>
            </View>

            <View className="h-px bg-gray-100 my-5" />

            <View className="flex-row items-center">
              <View className="bg-indigo-50 w-11 h-11 rounded-2xl items-center justify-center">
                <Ionicons name="id-card-outline" size={21} color="#6366F1" />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-gray-400 text-xs">Número de ficha</Text>
                <Text className="text-gray-800 font-bold mt-1">
                  {academico.ficha || "No registrado"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* INSUMOS */}
        <View className="mt-7">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-xl font-bold text-gray-800">
                Insumos registrados
              </Text>
              <Text className="text-gray-400 text-xs mt-1">
                Elementos asociados al aprendiz
              </Text>
            </View>

            <View className="bg-[#ECFDF5] px-4 py-2 rounded-2xl">
              <Text className="text-[#00BF63] font-bold text-base">
                {insumos.length}
              </Text>
            </View>
          </View>

          {insumos.length === 0 ? (
            <View className="bg-white rounded-3xl p-8 items-center shadow-sm">
              <View className="bg-gray-100 w-16 h-16 rounded-3xl items-center justify-center">
                <Ionicons name="cube-outline" size={32} color="#9CA3AF" />
              </View>
              <Text className="text-gray-500 font-semibold mt-4">
                No tiene insumos registrados
              </Text>
              <Text className="text-gray-400 text-xs mt-1 text-center">
                No hay elementos asociados a este aprendiz.
              </Text>
            </View>
          ) : (
            <View>
              {insumos.slice(0, 3).map((item: any) => (
                <Pressable
                  key={item.id_insumo}
                  className="mb-3"
                  onPress={() => {
                    router.push({
                      pathname: "/vistaGuardaApp/consulta", // O la ruta de tu vista de insumos
                      params: {
                        insumo: JSON.stringify(item),
                        // Agregas los datos del aprendiz aquí:
                        aprendiz: Array.isArray(params.aprendiz)
                          ? params.aprendiz[0]
                          : params.aprendiz,
                        tieneFoto: Array.isArray(params.tieneFoto)
                          ? params.tieneFoto[0]
                          : params.tieneFoto,
                      },
                    });
                  }}
                >
                  <CardMiniInsumo insumo={item} />
                </Pressable>
              ))}
            </View>
          )}

          {insumos.length > 3 && (
            <Pressable
              className="bg-white rounded-2xl py-4 mt-2 items-center"
              onPress={() => {
                router.push({
                  pathname: "./todos_Insumos",
                  params: {
                    aprendiz: JSON.stringify(datos),
                  },
                });
              }}
            >
              <View className="flex-row items-center">
                <Text className="text-[#00BF63] font-bold">
                  Ver todos los insumos
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color="#00BF63"
                  style={{ marginLeft: 5 }}
                />
              </View>
            </Pressable>
          )}
        </View>

        {/* ACCIONES CENTRADAS DE AUTORIZACIÓN Y RECHAZO */}
        <View className="mt-8 items-center w-full">
          {!puedeIngresar && (
            <Text className="text-center text-red-500 text-xs mb-3 font-semibold px-2">
              No puede autorizar el ingreso hasta registrar una fotografía.
            </Text>
          )}

          <View className="w-full items-center justify-center">
            <Button
              text={
                ingresando
                  ? "Procesando..."
                  : puedeIngresar
                    ? "Autorizar ingreso"
                    : "Ingreso bloqueado"
              }
              onPress={solicitarAutorizacion}
              disable={!puedeIngresar || ingresando}
            />
          </View>

          <Pressable
            className="mt-3 w-full border border-red-200 bg-red-50 rounded-2xl py-4 items-center justify-center"
            onPress={() => {
              setMotivoRechazo("");
              setModalRechazo(true);
            }}
          >
            <View className="flex-row items-center justify-center">
              <Ionicons name="close-circle-outline" size={20} color="#DC2626" />
              <Text className="text-red-600 font-bold ml-2">
                Rechazar ingreso
              </Text>
            </View>
          </Pressable>
        </View>

        {/* PIE DE PÁGINA */}
        <View className="items-center mt-6">
          <View className="flex-row items-center">
            <Ionicons
              name="shield-checkmark-outline"
              size={15}
              color="#9CA3AF"
            />
            <Text className="text-gray-400 text-xs ml-1">
              Control de acceso SAIA
            </Text>
          </View>
          <Text className="text-gray-300 text-[10px] mt-1">
            Verificación realizada por personal de seguridad
          </Text>
        </View>
      </ScrollView>

      {/* MODAL 1: FOTO REQUERIDA */}
      <Modal
        visible={modalFotoVisible}
        transparent
        animationType="fade"
        onRequestClose={cerrarModalFotoYRegresar}
      >
        <View className="flex-1 bg-black/50 justify-center px-5">
          <View className="bg-white rounded-3xl p-6 items-center">
            <View className="w-16 h-16 rounded-full bg-red-100 items-center justify-center mb-4">
              <Ionicons name="camera-outline" size={32} color="#DC2626" />
            </View>

            <Text className="text-gray-900 text-xl font-bold text-center">
              Fotografía requerida
            </Text>

            <Text className="text-gray-500 text-sm text-center mt-3 leading-5">
              Este aprendiz no cuenta con una foto registrada en el sistema.
              Debe registrar su fotografía antes de autorizar el ingreso al
              SENA.
            </Text>

            <Pressable
              className="w-full bg-gray-900 rounded-2xl py-4 items-center mt-6"
              onPress={cerrarModalFotoYRegresar}
            >
              <Text className="text-white font-bold text-base">Entendido</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* MODAL 2: RECHAZAR INGRESO */}
      <Modal
        visible={modalRechazo}
        transparent
        animationType="fade"
        onRequestClose={() => {
          if (!rechazando) setModalRechazo(false);
        }}
      >
        <View className="flex-1 bg-black/50 justify-center px-5">
          <View className="bg-white rounded-3xl p-6">
            <View className="flex-row items-center">
              <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center">
                <Ionicons
                  name="close-circle-outline"
                  size={27}
                  color="#DC2626"
                />
              </View>

              <View className="ml-3 flex-1">
                <Text className="text-gray-900 text-lg font-bold">
                  Rechazar ingreso
                </Text>

                <Text className="text-gray-400 text-xs mt-1">
                  {persona.nombre_completo || "Persona no registrada"}
                </Text>
              </View>
            </View>

            <Text className="text-gray-500 text-sm mt-5 leading-5">
              Indique el motivo por el cual no se autoriza el ingreso de esta
              persona.
            </Text>

            <Text className="text-gray-700 font-bold text-sm mt-5 mb-2">
              Motivo del rechazo
            </Text>

            <TextInput
              value={motivoRechazo}
              onChangeText={setMotivoRechazo}
              placeholder="Escriba el motivo..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              editable={!rechazando}
              className="border border-gray-200 bg-gray-50 rounded-2xl p-4 text-gray-800 min-h-[110px]"
            />

            <View className="flex-row mt-5">
              <Pressable
                className="flex-1 bg-gray-100 rounded-2xl py-4 items-center mr-2"
                disabled={rechazando}
                onPress={() => {
                  setModalRechazo(false);
                  setMotivoRechazo("");
                }}
              >
                <Text className="text-gray-600 font-bold">Cancelar</Text>
              </Pressable>

              <Pressable
                className="flex-1 bg-red-600 rounded-2xl py-4 items-center ml-2"
                disabled={rechazando}
                onPress={confirmarRechazo}
              >
                {rechazando ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text className="text-white font-bold">
                    Confirmar rechazo
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL 3: ALERTA Y CONFIRMACIÓN GENERAL */}
      <Modal
        visible={modalAlerta.visible}
        transparent
        animationType="fade"
        onRequestClose={cerrarAlerta}
      >
        <View className="flex-1 bg-black/50 justify-center px-5">
          <View className="bg-white rounded-3xl p-6 items-center">
            <View
              className={`w-16 h-16 rounded-full items-center justify-center mb-4 ${
                modalAlerta.tipo === "exito"
                  ? "bg-emerald-100"
                  : modalAlerta.tipo === "error"
                    ? "bg-red-100"
                    : modalAlerta.tipo === "confirmar_ingreso"
                      ? "bg-emerald-100"
                      : "bg-blue-100"
              }`}
            >
              <Ionicons
                name={
                  modalAlerta.tipo === "exito"
                    ? "checkmark-circle-outline"
                    : modalAlerta.tipo === "error"
                      ? "alert-circle-outline"
                      : modalAlerta.tipo === "confirmar_ingreso"
                        ? "checkmark-done-circle-outline"
                        : "information-circle-outline"
                }
                size={34}
                color={
                  modalAlerta.tipo === "exito" ||
                  modalAlerta.tipo === "confirmar_ingreso"
                    ? "#00BF63"
                    : modalAlerta.tipo === "error"
                      ? "#DC2626"
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

            {modalAlerta.tipo === "confirmar_ingreso" ? (
              <View className="flex-row mt-6 w-full">
                <Pressable
                  className="flex-1 bg-gray-100 rounded-2xl py-4 items-center mr-2"
                  onPress={() =>
                    setModalAlerta((prev) => ({ ...prev, visible: false }))
                  }
                >
                  <Text className="text-gray-600 font-bold">Cancelar</Text>
                </Pressable>

                <Pressable
                  className="flex-1 bg-[#00BF63] rounded-2xl py-4 items-center ml-2"
                  onPress={ejecutarIngreso}
                >
                  <Text className="text-white font-bold">Aceptar</Text>
                </Pressable>
              </View>
            ) : (
              <Pressable
                className="w-full bg-gray-900 rounded-2xl py-4 items-center mt-6"
                onPress={cerrarAlerta}
              >
                <Text className="text-white font-bold text-base">Aceptar</Text>
              </Pressable>
            )}
          </View>
        </View>
      </Modal>
    </Container>
  );
}
