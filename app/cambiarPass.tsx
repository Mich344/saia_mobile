import { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Header from "@/components/Header";
import Button from "@/components/Button";
import InputPass from "@/components/InputPassword";
import css from "@/styles/StylesComponent";

/* ── Tipos ─────────────────────────────────────────────────────────────────
   TODO: conectar con API
     1. Verificar contraseña actual  → POST /auth/verify-password
     2. Actualizar contraseña        → PUT  /auth/change-password
────────────────────────────────────────────────────────────────────────── */
interface CambiarPassForm {
  passActual: string;
  passNueva: string;
  passConfirmar: string;
}

const REQUISITOS = [
  { label: "Al menos 8 caracteres",        check: (p: string) => p.length >= 8 },
  { label: "Al menos 1 número",            check: (p: string) => /\d/.test(p) },
  { label: "Al menos 1 letra mayúscula",   check: (p: string) => /[A-Z]/.test(p) },
  { label: "Al menos 1 letra minúscula",   check: (p: string) => /[a-z]/.test(p) },
  { label: "Al menos 1 caracter especial", check: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

function nivelSeguridad(pass: string): number {
  if (!pass) return 0;
  const cumplidos = REQUISITOS.filter((r) => r.check(pass)).length;
  if (cumplidos <= 1) return 1;
  if (cumplidos <= 2) return 2;
  if (cumplidos <= 3) return 3;
  if (cumplidos <= 4) return 4;
  return 5;
}

const NIVEL_LABEL = ["", "Débil", "Regular", "Aceptable", "Fuerte", "Muy Fuerte"];
const NIVEL_COLOR = ["", "#FF0000", "#F4A700", "#FFC300", "#71B030", "#009220"];
const BARRA_SEGS  = 5;

export default function CambiarPassScreen() {
  const [form, setForm] = useState<CambiarPassForm>({
    passActual: "",
    passNueva: "",
    passConfirmar: "",
  });

  const nivel = nivelSeguridad(form.passNueva);

  const todosRequisitos  = REQUISITOS.every((r) => r.check(form.passNueva));
  const botonHabilitado  =
    form.passActual.length > 0 &&
    todosRequisitos &&
    form.passNueva === form.passConfirmar &&
    form.passConfirmar.length > 0;

  const handleContinuar = () => {
    // TODO: PUT /auth/change-password { passActual, passNueva }
    router.back();
  };

  return (
    <View className="flex-1 bg-background">

      <Header
        title="Cambiar Contraseña"
        subtitle="Actualiza tu contraseña"
        paddingBottom={20}
        showMenu={false}
      />

      <ScrollView
        className="flex-1 -mt-[30]"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* Banner informativo */}
        <View className="flex-row items-center bg-teal-tint-100 rounded-2xl px-4 py-4 mt-16 mb-6"
          style={css.infoBanner}
        >
          <View className="w-[38] h-[38] rounded-full bg-teal-tint-300 items-center justify-center mr-3">
            <Ionicons name="shield-checkmark-outline" size={22} color="#3DE1B9" />
          </View>
          <View className="flex-1">
            <Text className="text-[14] font-bold text-black">
              Tu seguridad es importante
            </Text>
            <Text className="text-[12] text-grey-text mt-0.5 leading-4">
              Crea una contraseña segura que solo tú puedas recordar
            </Text>
          </View>
        </View>

        {/* Contraseña actual */}
        <Text className="text-[15] font-bold text-black mb-2">
          Contraseña actual
        </Text>
        <InputPass
          placeholder="Ingresa tu contraseña actual"
          value={form.passActual}
          onChangeText={(v) => setForm((f) => ({ ...f, passActual: v }))}
        />

        {/* Nueva contraseña */}
        <Text className="text-[15] font-bold text-black mt-5 mb-2">
          Nueva Contraseña
        </Text>
        <InputPass
          placeholder="Ingresa tu nueva contraseña"
          value={form.passNueva}
          onChangeText={(v) => setForm((f) => ({ ...f, passNueva: v }))}
        />

        {/* Barra de seguridad */}
        {form.passNueva.length > 0 && (
          <View className="mt-3 mb-1">
            <View className="flex-row justify-between items-center mb-1.5">
              <Text className="text-[12] text-grey-text">
                Seguridad de la contraseña:
              </Text>
              <Text className="text-[12] font-bold" style={{ color: NIVEL_COLOR[nivel] }}>
                {NIVEL_LABEL[nivel]}
              </Text>
            </View>
            <View className="flex-row gap-1.5">
              {Array.from({ length: BARRA_SEGS }).map((_, i) => (
                <View
                  key={i}
                  className="flex-1 h-[5] rounded-full"
                  style={{ backgroundColor: i < nivel ? NIVEL_COLOR[nivel] : "#E0E0E0" }}
                />
              ))}
            </View>
          </View>
        )}

        {/* Requisitos */}
        <View className="bg-teal-tint-100 rounded-2xl px-4 py-4 mt-4"
          style={css.infoBanner}
        >
          <View className="flex-row items-center mb-2">
            <Ionicons name="bulb-outline" size={18} color="#3DE1B9" />
            <Text className="text-[13] font-bold text-black ml-2">
              Tu contraseña debe contener:
            </Text>
          </View>
          {REQUISITOS.map((req, i) => {
            const ok = req.check(form.passNueva);
            return (
              <View key={i} className="flex-row items-center mt-1">
                <Ionicons
                  name={ok ? "checkmark-circle" : "ellipse-outline"}
                  size={14}
                  color={ok ? "#3DE1B9" : "#ABABAB"}
                />
                <Text
                  className="text-[12] ml-1.5"
                  style={{ color: ok ? "#3DE1B9" : "#888" }}
                >
                  {req.label}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Confirmar contraseña */}
        <Text className="text-[15] font-bold text-black mt-5 mb-2">
          Confirmar contraseña
        </Text>
        <InputPass
          placeholder="Confirma tu contraseña"
          value={form.passConfirmar}
          onChangeText={(v) => setForm((f) => ({ ...f, passConfirmar: v }))}
        />

        {/* Aviso de coincidencia */}
        {form.passConfirmar.length > 0 && (
          <Text
            className="text-[12] mt-1.5 ml-1"
            style={{
              color: form.passNueva === form.passConfirmar ? "#3DE1B9" : "#FF0000",
            }}
          >
            {form.passNueva === form.passConfirmar
              ? "✓ Las contraseñas coinciden"
              : "✗ Las contraseñas no coinciden"}
          </Text>
        )}

        {/* Botón */}
        <View className="items-center mt-0">
          <Button
            text="Continuar"
            onPress={handleContinuar}
            disabled={!botonHabilitado}
          />
        </View>

        {/* Pie de página */}
        <View className="flex-row items-center justify-center mt-6 gap-2">
          <Ionicons name="shield-checkmark-outline" size={24} color="#ABABAB" />
          <Text className="text-[12] text-grey-placeholder text-center">
            Tus datos están protegidos.{"\n"}La seguridad de tu cuenta es nuestra prioridad
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}
