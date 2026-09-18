import { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Modal,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Input from "@/components/inputs/Input";
import InputOpcion from "@/components/inputs/InputOption";
import Button from "@/components/Button";
import ImageSelector from "@/components/ImagenSelector";
import Container from "@/components/Container";
import Back from "@/components/molecules/Back";

import registrarInsumo from "@/sql/Insumo";

interface ArchivoImagen {
  uri: string;
  name?: string;
  type?: string;
}

const MARCAS = ["ASUS", "HP", "Dell", "Lenovo", "Apple", "Samsung", "Otra"];
const ACTIVAR_OPCIONES = ["Sí", "No"];

export default function CrearInsumoScreen() {
  /* ============================================================
      ESTADO
  ============================================================ */

  const [form, setForm] = useState({
    nombre: "",
    marca: "",
    descripcion: "",
    serial: "",
    activarRegistro: "",
  });

  const [imagen, setImagen] = useState<ArchivoImagen | null>(null);
  const [formKey, setFormKey] = useState(0);
  const [cargando, setCargando] = useState(false);

  // Modal personalizado para reemplazar los alert()
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

  /* ============================================================
      LIMPIAR FORMULARIO
  ============================================================ */

  const limpiarFormulario = useCallback(() => {
    console.log("🧹 LIMPIANDO FORMULARIO DE INSUMO");

    setForm({
      nombre: "",
      marca: "",
      descripcion: "",
      serial: "",
      activarRegistro: "",
    });

    setImagen(null);
    setFormKey((prev) => prev + 1);
  }, []);

  /* ============================================================
      LIMPIAR CADA VEZ QUE LA PANTALLA RECIBE FOCUS
  ============================================================ */

  useFocusEffect(
    useCallback(() => {
      console.log("🟢 CREAR INSUMO: FOCUS");
      limpiarFormulario();

      return () => {
        console.log("⚪ CREAR INSUMO: BLUR");
      };
    }, [limpiarFormulario])
  );

  /* ============================================================
      IMAGEN
  ============================================================ */

  const handleImageSelected = (img: ArchivoImagen | null) => {
    if (!img || !img.uri) {
      setImagen(null);
      return;
    }

    const filename = img.uri.split("/").pop() || "insumo_imagen.jpg";
    const match = /\.(\w+)$/.exec(filename);
    const ext = match ? match[1].toLowerCase() : "jpg";
    const mimeType = img.type || `image/${ext === "jpg" ? "jpeg" : ext}`;

    const imagenFinal = {
      uri: img.uri,
      name: img.name || filename,
      type: mimeType,
    };

    setImagen(imagenFinal);
  };

  /* ============================================================
      GUARDAR INSUMO
  ============================================================ */

  const GuardarInsumo = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        setModalAlerta({
          visible: true,
          titulo: "Sesión no válida",
          mensaje: "No se encontró el token de autenticación.",
          tipo: "error",
        });
        return;
      }

      /* ===========================
          VALIDAR CAMPOS
      =========================== */

      if (
        !form.nombre.trim() ||
        !form.marca ||
        !form.descripcion.trim() ||
        !form.serial.trim() ||
        !form.activarRegistro
      ) {
        setModalAlerta({
          visible: true,
          titulo: "Campos incompletos",
          mensaje: "Por favor completa todos los campos obligatorios.",
          tipo: "advertencia",
        });
        return;
      }

      /* ===========================
          VALIDAR IMAGEN
      =========================== */

      if (!imagen || !imagen.uri) {
        setModalAlerta({
          visible: true,
          titulo: "Fotografía requerida",
          mensaje: "Debe seleccionar o capturar una imagen del insumo.",
          tipo: "advertencia",
        });
        return;
      }

      setCargando(true);

      /* ===========================
          CREAR FORMDATA
      =========================== */

      const formData = new FormData();
      formData.append("nom_insumo", form.nombre.trim());
      formData.append("marca", form.marca);
      formData.append("desc_insumo", form.descripcion.trim());
      formData.append("estado", form.activarRegistro === "Sí" ? "1" : "0");
      formData.append("num_serie", form.serial.trim().toUpperCase());

      const filename =
        imagen.name || imagen.uri.split("/").pop() || "photo.jpg";
      const fileType = imagen.type || "image/jpeg";

      formData.append("imagen", {
        uri: imagen.uri,
        name: filename,
        type: fileType,
      } as any);

      /* ===========================
          ENVIAR AL BACKEND
      =========================== */

      const respuesta = await registrarInsumo(formData);

      if (!respuesta.ok) {
        const mensaje =
          typeof respuesta.data === "string"
            ? respuesta.data
            : respuesta.data?.mensaje || "Error al registrar el insumo.";

        setModalAlerta({
          visible: true,
          titulo: "No se pudo registrar",
          mensaje,
          tipo: "error",
        });
        return;
      }

      /* ===========================
          ÉXITO
      =========================== */

      setModalAlerta({
        visible: true,
        titulo: "¡Insumo registrado!",
        mensaje: "El elemento ha sido guardado exitosamente en el sistema.",
        tipo: "exito",
        onAceptar: () => {
          limpiarFormulario();
          router.replace("/vistaUsuarioApp/Insumo");
        },
      });
    } catch (error) {
      console.error("❌ ERROR GUARDANDO INSUMO:", error);
      setModalAlerta({
        visible: true,
        titulo: "Error de conexión",
        mensaje:
          "No fue posible conectar con el servidor. Verifica tu red e inténtalo nuevamente.",
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
          paddingHorizontal: 5,
          paddingTop: 10,
          paddingBottom: 35,
        }}
      >
        {/* ENCABEZADO */}
        <Back
          className="mb-5"
          onPress={() => router.replace("/vistaUsuarioApp/Insumo")}
          title="Crear Insumos"
          subtitle="Registra un nuevo elemento en el sistema."
        />

        {/* TARJETA PRINCIPAL */}
        <View
          key={formKey}
          className="bg-white rounded-[24px] border border-[#E8ECEF] px-5 py-5"
        >
          {/* INFORMACIÓN GENERAL */}
          <View className="flex-row items-center mb-5">
            <View className="w-[34px] h-[34px] rounded-xl bg-[#E9FBF5] items-center justify-center">
              <Ionicons
                name="information-circle-outline"
                size={21}
                color="#20C7A0"
              />
            </View>

            <View className="ml-3">
              <Text className="text-[17px] font-bold text-[#172033]">
                Información general
              </Text>
              <Text className="text-[12px] text-[#8A939E]">
                Datos básicos del insumo
              </Text>
            </View>
          </View>

          {/* NOMBRE */}
          <View className="mb-4">
            <Text className="text-[13px] font-bold text-[#172033] mb-2">
              Nombre <Text className="text-red-400">*</Text>
            </Text>

            <Input
              placeholder="Pc Portátil Asus"
              iconName="pricetag-outline"
              onChangeText={(v) =>
                setForm((f) => ({
                  ...f,
                  nombre: v,
                }))
              }
            />
          </View>

          {/* MARCA */}
          <View className="mb-4">
            <Text className="text-[13px] font-bold text-[#172033] mb-2">
              Marca <Text className="text-red-400">*</Text>
            </Text>

            <InputOpcion
              placeholder="Selecciona una marca"
              opciones={MARCAS}
              iconName="pricetag-outline"
              onSelect={(v) =>
                setForm((f) => ({
                  ...f,
                  marca: v,
                }))
              }
            />
          </View>

          {/* IMAGEN */}
          <View className="mb-4">
            <View className="flex-row items-center mb-2">
              <Text className="text-[13px] font-bold text-[#172033]">
                Imagen
              </Text>
              <Text className="text-red-400 text-[13px] ml-1">*</Text>
            </View>

            <View className="bg-[#F8FAFC] border border-dashed border-[#C9D4D8] rounded-[20px] p-4 items-center">
              <View className="mb-3">
                <ImageSelector
                  mode="upload"
                  placeholder="item"
                  uploadWidth={150}
                  uploadHeight={150}
                  onImageSelected={handleImageSelected}
                />
              </View>

              <View className="flex-row items-center">
                <Ionicons name="camera-outline" size={16} color="#20B99A" />
                <Text className="text-[12px] text-[#7B858E] ml-2">
                  Selecciona una imagen del insumo
                </Text>
              </View>
            </View>
          </View>

          <View className="h-[1px] bg-[#EDF0F2] my-3" />

          {/* DETALLES DEL INSUMO */}
          <View className="flex-row items-center mb-5 mt-2">
            <View className="w-[34px] h-[34px] rounded-xl bg-[#EAF8FF] items-center justify-center">
              <Ionicons
                name="document-text-outline"
                size={20}
                color="#3299D8"
              />
            </View>

            <View className="ml-3">
              <Text className="text-[17px] font-bold text-[#172033]">
                Detalles del insumo
              </Text>
              <Text className="text-[12px] text-[#8A939E]">
                Información adicional
              </Text>
            </View>
          </View>

          {/* DESCRIPCIÓN */}
          <View className="mb-4">
            <Text className="text-[13px] font-bold text-[#172033] mb-2">
              Descripción <Text className="text-red-400">*</Text>
            </Text>

            <View className="bg-[#F7F8FA] rounded-2xl border border-[#E5E8EB]">
              <TextInput
                placeholder="Descripción del producto registrado"
                placeholderTextColor="#AAB0B6"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                editable={!cargando}
                onChangeText={(v) =>
                  setForm((f) => ({
                    ...f,
                    descripcion: v,
                  }))
                }
                className="px-4 py-3 text-[14px] text-black"
                style={{
                  minHeight: 105,
                }}
              />
            </View>
          </View>

          {/* SERIAL */}
          <View className="mb-4">
            <Text className="text-[13px] font-bold text-[#172033] mb-2">
              Número de serie <Text className="text-red-400">*</Text>
            </Text>

            <Input
              placeholder="Ejemplo JSKM-1233D o Generico"
              iconName="barcode-outline"
              onChangeText={(v) =>
                setForm((f) => ({
                  ...f,
                  serial: v.toUpperCase(),
                }))
              }
            />
          </View>

          {/* ACTIVAR REGISTRO */}
          <View>
            <Text className="text-[13px] font-bold text-[#172033] mb-2">
              Activar registro <Text className="text-red-400">*</Text>
            </Text>

            <InputOpcion
              placeholder="Selecciona una opción"
              opciones={ACTIVAR_OPCIONES}
              iconName="toggle-outline"
              onSelect={(v) =>
                setForm((f) => ({
                  ...f,
                  activarRegistro: v,
                }))
              }
            />
          </View>

          {/* ESTADO VISUAL */}
          {form.activarRegistro !== "" && (
            <View
              className={`flex-row items-center rounded-2xl px-4 py-3 mt-4 ${
                form.activarRegistro === "Sí" ? "bg-[#ECFBF2]" : "bg-[#FFF5F5]"
              }`}
            >
              <View
                className={`w-[36px] h-[36px] rounded-full items-center justify-center ${
                  form.activarRegistro === "Sí"
                    ? "bg-[#D4F5E0]"
                    : "bg-[#FFE1E1]"
                }`}
              >
                <Ionicons
                  name={
                    form.activarRegistro === "Sí"
                      ? "checkmark-circle-outline"
                      : "close-circle-outline"
                  }
                  size={21}
                  color={form.activarRegistro === "Sí" ? "#1AA957" : "#E35D5D"}
                />
              </View>

              <View className="ml-3 flex-1">
                <Text
                  className={`text-[13px] font-bold ${
                    form.activarRegistro === "Sí"
                      ? "text-[#168C49]"
                      : "text-[#C94D4D]"
                  }`}
                >
                  {form.activarRegistro === "Sí"
                    ? "Registro activo"
                    : "Registro inactivo"}
                </Text>

                <Text className="text-[11px] text-[#7B858E] mt-1">
                  {form.activarRegistro === "Sí"
                    ? "El insumo quedará disponible para su registro."
                    : "El insumo será creado sin activar su registro."}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* BOTÓN GUARDAR / CARGA */}
        <View className="items-center mt-6">
          {cargando ? (
            <View className="bg-[#20C7A0] py-4 px-8 rounded-2xl items-center justify-center flex-row w-full">
              <ActivityIndicator color="#FFFFFF" size="small" />
              <Text className="text-white font-bold text-[14px] ml-2">
                Guardando insumo...
              </Text>
            </View>
          ) : (
            <Button text="Guardar insumo" onPress={GuardarInsumo} />
          )}
        </View>

        {/* MENSAJE INFERIOR */}
        <View className="flex-row items-center justify-center mt-5 px-4">
          <Text className="text-[11px] text-[#89939B] ml-2 text-center">
            La información del insumo será registrada de forma segura en el
            sistema.
          </Text>
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