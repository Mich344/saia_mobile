import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Modal,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import Input from "@/components/inputs/Input";
import InputOpcion from "@/components/inputs/InputOption";
import Button from "@/components/Button";
import ImageSelector from "@/components/ImagenSelector";
import Container from "@/components/Container";
import Back from "@/components/molecules/Back";

import ipconfig from "@/sql/ipconfig";
import consultarInsumo from "@/sql/Consultar_Insumo";
import editarInsumo from "@/sql/Editar_Insumo";

interface ArchivoImagen {
  uri: string;
  name: string;
  type: string;
}

const MARCAS = ["ASUS", "HP", "Dell", "Lenovo", "Apple", "Samsung", "Otra"];

const ACTIVAR_OPCIONES = ["Sí", "No"];

const EditarInsumo = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [imagen, setImagen] = useState<ArchivoImagen | null>(null);
  const [imagenActual, setImagenActual] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    marca: "",
    descripcion: "",
    serial: "",
    activarRegistro: "",
  });

  // Modal personalizado para reemplazar alert()
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

  // ============================================================
  // CARGAR INSUMO
  // ============================================================

  const cargarInsumo = async (idInsumo: string) => {
    setCargando(true);
    try {
      const respuesta = await consultarInsumo(idInsumo);

      if (!respuesta.ok) {
        setModalAlerta({
          visible: true,
          titulo: "Error al consultar",
          mensaje:
            respuesta.data?.mensaje ||
            "No se pudo obtener la información del insumo.",
          tipo: "error",
          onAceptar: () => router.back(),
        });
        return;
      }

      const insumo = respuesta.data.insumo;

      setImagenActual(insumo.imagen);

      setForm({
        nombre: insumo.nom_insumo || "",
        marca: insumo.marca || "",
        descripcion: insumo.desc_insumo || "",
        serial: insumo.num_serie || "",
        activarRegistro: insumo.estado === 1 ? "Sí" : "No",
      });
    } catch (error) {
      console.error("❌ ERROR CONSULTANDO INSUMO:", error);
      setModalAlerta({
        visible: true,
        titulo: "Error de conexión",
        mensaje: "No se pudo establecer conexión con el servidor.",
        tipo: "error",
        onAceptar: () => router.back(),
      });
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (id) {
      cargarInsumo(id);
    }
  }, [id]);

  // ============================================================
  // GUARDAR CAMBIOS
  // ============================================================

  const handleGuardar = async () => {
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
        mensaje:
          "Por favor completa todos los campos obligatorios antes de guardar.",
        tipo: "advertencia",
      });
      return;
    }

    setCargando(true);

    try {
      const respuesta = await editarInsumo(id, {
        nom_insumo: form.nombre.trim(),
        marca: form.marca,
        estado: form.activarRegistro === "Sí" ? 1 : 0,
        num_serie: form.serial.trim().toUpperCase(),
        desc_insumo: form.descripcion.trim(),
        imagen,
      });

      if (!respuesta.ok) {
        const mensaje =
          typeof respuesta.data === "string"
            ? respuesta.data
            : respuesta.data?.mensaje || "No se pudo actualizar el insumo.";

        setModalAlerta({
          visible: true,
          titulo: "Error al actualizar",
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
        titulo: "¡Insumo actualizado!",
        mensaje: "Los cambios han sido guardados correctamente en el sistema.",
        tipo: "exito",
        onAceptar: () => {
          router.replace("/vistaUsuarioApp/Insumo");
        },
      });
    } catch (error) {
      console.error("❌ ERROR EDITANDO INSUMO:", error);
      setModalAlerta({
        visible: true,
        titulo: "Error de conexión",
        mensaje:
          "Ocurrió un inconveniente al conectar con el servidor. Inténtalo más tarde.",
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
          paddingHorizontal: 18,
          paddingTop: 10,
          paddingBottom: 35,
        }}
      >
        {/* ===================================================== */}
        {/* ENCABEZADO */}
        {/* ===================================================== */}

        <Back
          className="mb-5"
          onPress={() => router.back()}
          title="Editar insumo"
          subtitle="Modifica la información del elemento registrado"
        />

        {/* ===================================================== */}
        {/* TARJETA PRINCIPAL */}
        {/* ===================================================== */}

        <View className="bg-white rounded-[24px] border border-[#E8EEEE] p-5">
          {/* CABECERA DE LA TARJETA */}

          <View className="flex-row items-center mb-5">
            <View className="w-[40px] h-[40px] rounded-xl bg-[#EAFBF6] items-center justify-center">
              <Ionicons name="cube-outline" size={21} color="#20C9A5" />
            </View>

            <View className="ml-3">
              <Text className="text-[16px] font-bold text-[#172033]">
                Información del insumo
              </Text>

              <Text className="text-[11px] text-[#888888] mt-1">
                Actualiza los datos del elemento
              </Text>
            </View>
          </View>

          {/* ================================================= */}
          {/* NOMBRE */}
          {/* ================================================= */}

          <View>
            <View className="flex-row items-center mb-2">
              <Ionicons name="pricetag-outline" size={17} color="#20BFA0" />

              <Text className="text-[13px] font-bold text-[#333333] ml-2">
                Nombre
              </Text>

              <Text className="text-[#EF4444] text-[13px] ml-1">*</Text>
            </View>

            <Input
              placeholder="Pc Portátil Asus"
              iconName="pricetag-outline"
              value={form.nombre}
              onChangeText={(v) =>
                setForm((f) => ({
                  ...f,
                  nombre: v,
                }))
              }
            />
          </View>

          {/* ================================================= */}
          {/* MARCA */}
          {/* ================================================= */}

          <View className="mt-4">
            <View className="flex-row items-center mb-2">
              <Ionicons name="business-outline" size={17} color="#20BFA0" />

              <Text className="text-[13px] font-bold text-[#333333] ml-2">
                Marca
              </Text>

              <Text className="text-[#EF4444] text-[13px] ml-1">*</Text>
            </View>

            <InputOpcion
              placeholder="Selecciona una marca"
              opciones={MARCAS}
              iconName="business-outline"
              value={form.marca}
              onSelect={(v) =>
                setForm((f) => ({
                  ...f,
                  marca: v,
                }))
              }
            />
          </View>

          {/* ================================================= */}
          {/* IMAGEN */}
          {/* ================================================= */}

          <View className="mt-5">
            <View className="flex-row items-center mb-2">
              <Ionicons name="image-outline" size={17} color="#20BFA0" />

              <Text className="text-[13px] font-bold text-[#333333] ml-2">
                Imagen
              </Text>

              <Text className="text-[#EF4444] text-[13px] ml-1">*</Text>
            </View>

            <View className="bg-[#F7FAF9] rounded-[20px] border border-[#E5EFEC] p-4 items-center">
              <ImageSelector
                mode="upload"
                placeholder="item"
                uploadWidth={150}
                uploadHeight={150}
                image={
                  imagen
                    ? imagen.uri
                    : imagenActual
                      ? `${ipconfig}${imagenActual}`
                      : null
                }
                onImageSelected={setImagen}
              />

              <View className="flex-row items-center mt-3">
                <Ionicons
                  name="information-circle-outline"
                  size={15}
                  color="#888888"
                />

                <Text className="text-[11px] text-[#888888] ml-1">
                  Selecciona una nueva imagen para reemplazarla
                </Text>
              </View>
            </View>
          </View>

          {/* ================================================= */}
          {/* DESCRIPCIÓN */}
          {/* ================================================= */}

          <View className="mt-5">
            <View className="flex-row items-center mb-2">
              <Ionicons
                name="document-text-outline"
                size={17}
                color="#20BFA0"
              />

              <Text className="text-[13px] font-bold text-[#333333] ml-2">
                Descripción
              </Text>

              <Text className="text-[#EF4444] text-[13px] ml-1">*</Text>
            </View>

            <TextInput
              placeholder="Descripción del producto registrado"
              placeholderTextColor="#ABABAB"
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              editable={!cargando}
              value={form.descripcion}
              onChangeText={(v) =>
                setForm((f) => ({
                  ...f,
                  descripcion: v,
                }))
              }
              className="bg-[#F5F7F7] rounded-2xl px-4 py-3 text-[14px] text-black font-calibri border border-[#E8EEEE]"
              style={{
                minHeight: 115,
              }}
            />
          </View>

          {/* ================================================= */}
          {/* NÚMERO DE SERIE */}
          {/* ================================================= */}

          <View className="mt-5">
            <View className="flex-row items-center mb-2">
              <Ionicons name="barcode-outline" size={17} color="#20BFA0" />

              <Text className="text-[13px] font-bold text-[#333333] ml-2">
                Número de serie
              </Text>

              <Text className="text-[#EF4444] text-[13px] ml-1">*</Text>
            </View>

            <Input
              placeholder="Ejemplo JSKM-1233D"
              iconName="barcode-outline"
              value={form.serial}
              onChangeText={(v) =>
                setForm((f) => ({
                  ...f,
                  serial: v.toUpperCase(),
                }))
              }
            />
          </View>

          {/* ================================================= */}
          {/* ESTADO */}
          {/* ================================================= */}

          <View className="mt-5">
            <View className="flex-row items-center mb-2">
              <Ionicons name="toggle-outline" size={18} color="#20BFA0" />

              <Text className="text-[13px] font-bold text-[#333333] ml-2">
                Estado del registro
              </Text>

              <Text className="text-[#EF4444] text-[13px] ml-1">*</Text>
            </View>

            <InputOpcion
              placeholder="Selecciona el estado"
              opciones={ACTIVAR_OPCIONES}
              iconName="toggle-outline"
              value={form.activarRegistro}
              onSelect={(v) =>
                setForm((f) => ({
                  ...f,
                  activarRegistro: v,
                }))
              }
            />
          </View>

          {/* ================================================= */}
          {/* ESTADO ACTUAL */}
          {/* ================================================= */}

          {form.activarRegistro !== "" && (
            <View
              className={`flex-row items-center rounded-2xl p-4 mt-5 ${
                form.activarRegistro === "Sí" ? "bg-[#ECFDF3]" : "bg-[#FFF4F4]"
              }`}
            >
              <View
                className={`w-[42px] h-[42px] rounded-full items-center justify-center ${
                  form.activarRegistro === "Sí"
                    ? "bg-[#D8F7E5]"
                    : "bg-[#FFE1E1]"
                }`}
              >
                <Ionicons
                  name={
                    form.activarRegistro === "Sí"
                      ? "checkmark-circle-outline"
                      : "close-circle-outline"
                  }
                  size={23}
                  color={form.activarRegistro === "Sí" ? "#22A95A" : "#EF4444"}
                />
              </View>

              <View className="flex-1 ml-3">
                <Text
                  className={`text-[13px] font-bold ${
                    form.activarRegistro === "Sí"
                      ? "text-[#168A47]"
                      : "text-[#D93636]"
                  }`}
                >
                  {form.activarRegistro === "Sí"
                    ? "Registro activo"
                    : "Registro inactivo"}
                </Text>

                <Text className="text-[11px] text-[#777777] mt-1">
                  {form.activarRegistro === "Sí"
                    ? "El insumo puede ser utilizado en los registros."
                    : "El insumo no estará disponible para nuevos registros."}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* ===================================================== */}
        {/* BOTONES */}
        {/* ===================================================== */}

        <View className="">
          {cargando ? (
            <View className="bg-[#20C7A0] py-4 px-8 rounded-2xl items-center justify-center flex-row w-full">
              <ActivityIndicator color="#FFFFFF" size="small" />
              <Text className="text-white font-bold text-[14px] ml-2">
                Guardando cambios...
              </Text>
            </View>
          ) : (
            <View className="justify-between items-center flex-row gap-3">
              <Button text="Guardar" size="sm" onPress={handleGuardar} />
                <Button
                  text="Cancelar"
                  size="sm"
                  onPress={() => router.replace("/vistaUsuarioApp/Insumo")}
                />
            </View>
          )}
        </View>

        {/* ===================================================== */}
        {/* PIE */}
        {/* ===================================================== */}

        <View className="flex-row items-center justify-center mt-5">
          <Ionicons name="shield-checkmark-outline" size={16} color="#AAAAAA" />

          <Text className="text-[10px] text-[#999999] ml-2">
            Los cambios se guardarán en el sistema SAIA
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
};

export default EditarInsumo;
