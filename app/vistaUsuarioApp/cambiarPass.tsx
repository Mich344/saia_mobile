import { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import Button from "@/components/Button";
import InputPass from "@/components/inputs/InputPassword";
import Container from "@/components/Container";
import Back from "@/components/molecules/Back";

import cambiarPassword from "@/sql/Cambias_Pass";

interface CambiarPassForm {
  passActual: string;
  passNueva: string;
  passConfirmar: string;
}

/* ============================================================
   REQUISITOS DE SEGURIDAD
============================================================ */

const REQUISITOS = [
  {
    label: "Al menos 8 caracteres",
    check: (p: string) => p.length >= 8,
  },
  {
    label: "Al menos 1 número",
    check: (p: string) => /\d/.test(p),
  },
  {
    label: "Al menos 1 letra mayúscula",
    check: (p: string) => /[A-Z]/.test(p),
  },
  {
    label: "Al menos 1 letra minúscula",
    check: (p: string) => /[a-z]/.test(p),
  },
  {
    label: "Al menos 1 carácter especial",
    check: (p: string) => /[^A-Za-z0-9]/.test(p),
  },
];

/* ============================================================
   NIVEL DE SEGURIDAD
============================================================ */

function nivelSeguridad(pass: string): number {
  if (!pass) return 0;

  const cumplidos = REQUISITOS.filter((r) => r.check(pass)).length;

  if (cumplidos <= 1) return 1;
  if (cumplidos <= 2) return 2;
  if (cumplidos <= 3) return 3;
  if (cumplidos <= 4) return 4;

  return 5;
}

const NIVEL_LABEL = [
  "",
  "Débil",
  "Regular",
  "Aceptable",
  "Fuerte",
  "Muy fuerte",
];

const NIVEL_COLOR = ["", "#EF4444", "#F59E0B", "#EAB308", "#65A30D", "#16A34A"];

const BARRA_SEGS = 5;

/* ============================================================
   PANTALLA
============================================================ */

export default function CambiarPassScreen() {
  const [form, setForm] = useState<CambiarPassForm>({
    passActual: "",
    passNueva: "",
    passConfirmar: "",
  });

  const [cargando, setCargando] = useState(false);

  const nivel = nivelSeguridad(form.passNueva);

  const todosRequisitos = REQUISITOS.every((r) => r.check(form.passNueva));

  const contraseñasCoinciden =
    form.passNueva.length > 0 &&
    form.passConfirmar.length > 0 &&
    form.passNueva === form.passConfirmar;

  const contraseñaDiferente =
    form.passActual.length > 0 &&
    form.passNueva.length > 0 &&
    form.passActual !== form.passNueva;

  const botonHabilitado =
    form.passActual.length > 0 &&
    todosRequisitos &&
    contraseñasCoinciden &&
    contraseñaDiferente;

  /* ============================================================
     CAMBIAR CONTRASEÑA
  ============================================================ */

  const handleContinuar = async () => {
    if (!form.passActual) {
      alert("Ingresa tu contraseña actual.");
      return;
    }

    if (!todosRequisitos) {
      alert("La nueva contraseña no cumple todos los requisitos.");
      return;
    }

    if (form.passActual === form.passNueva) {
      alert("La nueva contraseña debe ser diferente a la actual.");
      return;
    }

    if (form.passNueva !== form.passConfirmar) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      setCargando(true);

      console.log("======================================");
      console.log("🔥 CAMBIANDO CONTRASEÑA");
      console.log("======================================");

      const respuesta = await cambiarPassword({
        passwordActual: form.passActual,
        passwordNueva: form.passNueva,
      });

      console.log("🔥 RESPUESTA CAMBIO PASSWORD:");
      console.log(respuesta);

      if (!respuesta.ok) {
        alert(
          respuesta.data?.mensaje || "No fue posible actualizar la contraseña.",
        );
        return;
      }

      alert("Contraseña actualizada correctamente.");

      router.back();
    } catch (error) {
      console.log("🔥 ERROR CAMBIANDO PASSWORD:", error);

      alert("Ocurrió un error al actualizar la contraseña.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container>
      <Back
        className="mb-5"
        onPress={() => router.replace("/vistaUsuarioApp/editarPerfil")}
        title="Cambiar Contraseña"
        subtitle="Actualiza la contraseña de tu cuenta."
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 35,
        }}
      >

        {/* ======================================================
            BANNER SEGURIDAD
        ====================================================== */}

        <View className="bg-[#ECFBF7] border border-[#C9F3E8] rounded-[20px] p-5 mt-5">
          <View className="flex-row items-center">
            <View className="w-[48px] h-[48px] rounded-full bg-[#D6F7EE] items-center justify-center">
              <Ionicons
                name="shield-checkmark-outline"
                size={26}
                color="#20B99B"
              />
            </View>

            <View className="flex-1 ml-4">
              <Text className="text-[16px] font-bold text-[#172033]">
                Tu seguridad es importante
              </Text>

              <Text className="text-[13px] text-[#687777] mt-1 leading-5">
                Crea una contraseña segura que solo tú puedas recordar.
              </Text>
            </View>
          </View>
        </View>

        {/* ======================================================
            CONTRASEÑA ACTUAL
        ====================================================== */}

        <View className="bg-white rounded-[20px] border border-[#EEEEEE] p-5 mt-5">
          <View className="flex-row items-center mb-3">
            <View className="w-[34px] h-[34px] rounded-full bg-[#F0F8FF] items-center justify-center">
              <Ionicons name="lock-closed-outline" size={18} color="#3285D8" />
            </View>

            <View className="ml-3">
              <Text className="text-[15px] font-bold text-[#172033]">
                Contraseña actual
              </Text>

              <Text className="text-[11px] text-[#888888]">
                Confirma que eres el propietario de la cuenta.
              </Text>
            </View>
          </View>

          <InputPass
            placeholder="Ingresa tu contraseña actual"
            value={form.passActual}
            onChangeText={(v) =>
              setForm((f) => ({
                ...f,
                passActual: v,
              }))
            }
          />
        </View>

        {/* ======================================================
            NUEVA CONTRASEÑA
        ====================================================== */}

        <View className="bg-white rounded-[20px] border border-[#EEEEEE] p-5 mt-4">
          <View className="flex-row items-center mb-3">
            <View className="w-[34px] h-[34px] rounded-full bg-[#EAFBF6] items-center justify-center">
              <Ionicons name="key-outline" size={18} color="#20B99B" />
            </View>

            <View className="ml-3">
              <Text className="text-[15px] font-bold text-[#172033]">
                Nueva contraseña
              </Text>

              <Text className="text-[11px] text-[#888888]">
                Usa una combinación difícil de adivinar.
              </Text>
            </View>
          </View>

          <InputPass
            placeholder="Ingresa tu nueva contraseña"
            value={form.passNueva}
            onChangeText={(v) =>
              setForm((f) => ({
                ...f,
                passNueva: v,
              }))
            }
          />

          {/* ==================================================
              BARRA DE SEGURIDAD
          ================================================== */}

          {form.passNueva.length > 0 && (
            <View className="mt-4">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-[12px] text-[#777777]">
                  Seguridad de la contraseña
                </Text>

                <Text
                  className="text-[12px] font-bold"
                  style={{
                    color: NIVEL_COLOR[nivel],
                  }}
                >
                  {NIVEL_LABEL[nivel]}
                </Text>
              </View>

              <View className="flex-row gap-1.5">
                {Array.from({
                  length: BARRA_SEGS,
                }).map((_, i) => (
                  <View
                    key={i}
                    className="flex-1 h-[6px] rounded-full"
                    style={{
                      backgroundColor:
                        i < nivel ? NIVEL_COLOR[nivel] : "#E5E7EB",
                    }}
                  />
                ))}
              </View>
            </View>
          )}

          {/* ==================================================
              REQUISITOS
          ================================================== */}

          <View className="bg-[#F8FAFC] rounded-[17px] border border-[#E8ECEF] px-4 py-4 mt-5">
            <View className="flex-row items-center mb-3">
              <Ionicons
                name="information-circle-outline"
                size={19}
                color="#20B99B"
              />

              <Text className="text-[13px] font-bold text-[#172033] ml-2">
                Tu contraseña debe contener:
              </Text>
            </View>

            {REQUISITOS.map((req, i) => {
              const cumplido = req.check(form.passNueva);

              return (
                <View key={i} className="flex-row items-center mt-2">
                  <Ionicons
                    name={cumplido ? "checkmark-circle" : "ellipse-outline"}
                    size={17}
                    color={cumplido ? "#20B99B" : "#B8B8B8"}
                  />

                  <Text
                    className="text-[12px] ml-2"
                    style={{
                      color: cumplido ? "#20B99B" : "#777777",
                    }}
                  >
                    {req.label}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* ======================================================
            CONFIRMAR CONTRASEÑA
        ====================================================== */}

        <View className="bg-white rounded-[20px] border border-[#EEEEEE] p-5 mt-4">
          <View className="flex-row items-center mb-3">
            <View
              className={`w-[34px] h-[34px] rounded-full items-center justify-center ${
                form.passConfirmar.length === 0
                  ? "bg-[#F5F5F5]"
                  : contraseñasCoinciden
                    ? "bg-[#EAF9EE]"
                    : "bg-[#FFF0F0]"
              }`}
            >
              <Ionicons
                name={
                  form.passConfirmar.length === 0
                    ? "checkmark-outline"
                    : contraseñasCoinciden
                      ? "checkmark"
                      : "close"
                }
                size={18}
                color={
                  form.passConfirmar.length === 0
                    ? "#999999"
                    : contraseñasCoinciden
                      ? "#22A447"
                      : "#EF4444"
                }
              />
            </View>

            <View className="ml-3">
              <Text className="text-[15px] font-bold text-[#172033]">
                Confirmar contraseña
              </Text>

              <Text className="text-[11px] text-[#888888]">
                Escribe nuevamente la nueva contraseña.
              </Text>
            </View>
          </View>

          <InputPass
            placeholder="Confirma tu contraseña"
            value={form.passConfirmar}
            onChangeText={(v) =>
              setForm((f) => ({
                ...f,
                passConfirmar: v,
              }))
            }
          />

          {/* MENSAJE COINCIDENCIA */}

          {form.passConfirmar.length > 0 && (
            <View className="flex-row items-center mt-3">
              <Ionicons
                name={
                  contraseñasCoinciden ? "checkmark-circle" : "close-circle"
                }
                size={16}
                color={contraseñasCoinciden ? "#20B99B" : "#EF4444"}
              />

              <Text
                className="text-[12px] ml-2 font-semibold"
                style={{
                  color: contraseñasCoinciden ? "#20B99B" : "#EF4444",
                }}
              >
                {contraseñasCoinciden
                  ? "Las contraseñas coinciden"
                  : "Las contraseñas no coinciden"}
              </Text>
            </View>
          )}
        </View>

        {/* ======================================================
            ESTADO FINAL
        ====================================================== */}

        {form.passNueva.length > 0 && (
          <View
            className={`rounded-[18px] p-4 mt-4 flex-row items-center ${
              botonHabilitado
                ? "bg-[#ECFBF1] border border-[#CBEFD5]"
                : "bg-[#FFF8E8] border border-[#F5E5B6]"
            }`}
          >
            <Ionicons
              name={
                botonHabilitado
                  ? "checkmark-circle"
                  : "information-circle-outline"
              }
              size={22}
              color={botonHabilitado ? "#22A447" : "#E5A500"}
            />

            <Text
              className={`flex-1 ml-3 text-[12px] ${
                botonHabilitado ? "text-[#25823C]" : "text-[#8A6800]"
              }`}
            >
              {botonHabilitado
                ? "Tu contraseña cumple todos los requisitos y está lista para actualizarse."
                : "Completa todos los requisitos para poder continuar."}
            </Text>
          </View>
        )}

        {/* ======================================================
            BOTÓN
        ====================================================== */}

        <View className="items-center mt-5">
          <Button
            text={cargando ? "Actualizando..." : "Actualizar contraseña"}
            onPress={handleContinuar}
            disabled={!botonHabilitado || cargando}
          />
        </View>

        {/* ======================================================
            PIE DE SEGURIDAD
        ====================================================== */}

        <View className="flex-row items-center justify-center mt-6 px-5">
          <Ionicons name="shield-checkmark-outline" size={22} color="#A5A5A5" />

          <Text className="text-[11px] text-[#888888] text-center ml-2 leading-4">
            Tus datos están protegidos.{"\n"}
            La seguridad de tu cuenta es nuestra prioridad.
          </Text>
        </View>
      </ScrollView>
    </Container>
  );
}
