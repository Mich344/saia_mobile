import { useState } from "react";
import { View, Text, ScrollView, TextInput } from "react-native";
import { router } from "expo-router";
import Header from "@/components/Header";
import Input from "@/components/Input";
import InputOpcion from "@/components/InputOption";
import Button from "@/components/Button";
import ImageSelector from "@/components/ImagenSelector";

/* ── Tipo de datos del insumo ──────────────────────────────────────────────
   Cuando conectes la BD, reemplaza el useState por una llamada a tu API.
   POST /insumos  { nombre, marca, descripcion, serial, activarRegistro }
────────────────────────────────────────────────────────────────────────── */
interface InsumoForm {
  nombre: string;
  marca: string;
  descripcion: string;
  serial: string;
  activarRegistro: string;
}

const MARCAS = ["ASUS", "HP", "Dell", "Lenovo", "Apple", "Samsung", "Otra"];
const ACTIVAR_OPCIONES = ["Sí", "No"];

export default function CrearInsumoScreen() {
  /* TODO: conectar con API cuando esté disponible */
  const [form, setForm] = useState<InsumoForm>({
    nombre: "",
    marca: "",
    descripcion: "",
    serial: "",
    activarRegistro: "",
  });

  const handleGuardar = () => {
    // TODO: POST /insumos con los datos del form
    router.back();
  };

  return (
    <View className="flex-1 bg-background">

      {/* HEADER */}
      <View className="flex-col mb-[80]" >
        <Header
          title="Crear Insumo"
          subtitle="Actualiza tus datos personales"
          paddingBottom={20}
          showMenu={false}
        />
      </View>

      <ScrollView
        className="flex-1 -mt-[30]"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >

        {/* TARJETA PRINCIPAL */}
        <View className="bg-white rounded-3xl px-5 pt-5 pb-6"
          style={{ shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 5 }}
        >

          {/* Título */}
          <Text className="text-teal-sena text-2xl font-bold text-center mb-5">
            Crear Insumos
          </Text>

          {/* ── Fila superior: campos izquierda + imagen derecha ── */}
          <View className="flex-row gap-3">

            {/* Columna izquierda */}
            <View className="flex-1 gap-3">

              {/* Nombre o Referencia */}
              <View>
                <Text className="text-[13] font-bold text-black mb-1">
                  Nombre o Referencia *
                </Text>
                <Input
                  placeholder="Pc Portátil Asus"
                  iconName="pricetag-outline"
                  value={form.nombre}
                  onChangeText={(v) => setForm((f) => ({ ...f, nombre: v }))}
                />
              </View>

              {/* Marca */}
              <View>
                <Text className="text-[13] font-bold text-black mb-1">
                  Marca *
                </Text>
                <InputOpcion
                  placeholder="Marca"
                  opciones={MARCAS}
                  iconName="business-outline"
                  onSelect={(v) => setForm((f) => ({ ...f, marca: v }))}
                />
              </View>

            </View>

            {/* Columna derecha — imagen */}
            <View>
              <Text className="text-[13] font-bold text-black mb-1">
                Imagen *
              </Text>
              <ImageSelector
                mode="upload"
                placeholder="item"
                uploadWidth={150}
                uploadHeight={180}
              />
            </View>

          </View>

          {/* ── Descripción ── */}
          <View className="mt-4">
            <Text className="text-[13] font-bold text-black mb-1">
              Descripción *
            </Text>
            <TextInput
              placeholder="Descripción del producto registrado"
              placeholderTextColor="#ABABAB"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={form.descripcion}
              onChangeText={(v) => setForm((f) => ({ ...f, descripcion: v }))}
              className="bg-[#F0F0F0] rounded-2xl px-4 py-3 text-[14] text-black font-calibri"
              style={{ minHeight: 100 }}
            />
          </View>

          {/* ── Número de serie ── */}
          <View className="mt-4">
            <Text className="text-[13] font-bold text-black mb-1">
              Número de serie *
            </Text>
            <Input
              placeholder="Ejemplo JSKM-1233D, si no tiene serial poner generico"
              iconName="barcode-outline"
              value={form.serial}
              onChangeText={(v) => setForm((f) => ({ ...f, serial: v }))}
            />
          </View>

          {/* ── Activar Registro ── */}
          <View className="mt-4">
            <Text className="text-[13] font-bold text-black mb-1">
              Activar Registro *
            </Text>
            <InputOpcion
              placeholder="No"
              opciones={ACTIVAR_OPCIONES}
              iconName="toggle-outline"
              onSelect={(v) => setForm((f) => ({ ...f, activarRegistro: v }))}
            />
          </View>

        </View>

        {/* BOTÓN GUARDAR */}
        <View className="items-center mt-6">
          <Button
            text="Guardar"
            onPress={handleGuardar}
          />
        </View>

      </ScrollView>
    </View>
  );
}
