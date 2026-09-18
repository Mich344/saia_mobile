import { View, Text, Pressable } from "react-native";
import InputPass from "@/components/inputs/InputPassword";
import Label from "@/components/inputs/InputLabel";
import { FormularioState, FormularioKey } from "@/hooks/utils/validacion_Registro_SAIA";

interface Props {
  formulario: FormularioState;
  cumple8: boolean;
  cumpleMayuscula: boolean;
  cumpleNumero: boolean;
  cumpleEspecial: boolean;
  coincide: boolean;
  onChange: (campo: FormularioKey, valor: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export default function Paso3Seguridad({
  formulario,
  cumple8,
  cumpleMayuscula,
  cumpleNumero,
  cumpleEspecial,
  coincide,
  onChange,
  onSubmit,
  onBack,
}: Props) {
  return (
    <>
      <View className="mt-5 rounded-xl p-2">
        <View className="flex-1">
          <Text className="text-lg font-bold text-slate-800 text-center">
            Seguridad de tu cuenta
          </Text>
          <Text className="text-gray-500 text-[13px] text-center">
            Utiliza una contraseña segura para proteger el acceso a SAIA.
          </Text>
        </View>

        <View className="mt-6 mb-2" style={{ marginHorizontal: -24, width: "auto" }}>
          <Label title="Contraseña" className="font-calibriBold text-[15px]" />
          <InputPass
            placeholder="AprendizSENA*2026"
            value={formulario.password}
            onChangeText={(valor) => onChange("password", valor)}
          />
        </View>

        <View className="mt-5 bg-gray-100 rounded-2xl p-4 border border-gray-200">
          <Text className="font-semibold text-slate-700 mb-3">
            Requisitos de la contraseña
          </Text>
          <Text className={cumple8 ? "text-green-600" : "text-red-500"}>
            {cumple8 ? "✅" : "⚠️"} Mínimo 8 caracteres
          </Text>
          <Text className={`mt-2 ${cumpleMayuscula ? "text-green-600" : "text-red-500"}`}>
            {cumpleMayuscula ? "✅" : "⚠️"} Al menos una letra mayúscula
          </Text>
          <Text className={`mt-2 ${cumpleNumero ? "text-green-600" : "text-red-500"}`}>
            {cumpleNumero ? "✅" : "⚠️"} Al menos un número
          </Text>
          <Text className={`mt-2 ${cumpleEspecial ? "text-green-600" : "text-red-500"}`}>
            {cumpleEspecial ? "✅" : "⚠️"} Al menos un carácter especial (@ # $ %)
          </Text>
        </View>

        <View className="mt-6" style={{ marginHorizontal: -24, width: "auto" }}>
          <Label title="Confirmar contraseña" className="font-calibriBold text-[15px]" />
          <InputPass
            placeholder="AprendizSENA*2026"
            onChangeText={(valor) => onChange("confirmarPassword", valor)}
          />
        </View>

        <View className="mt-3">
          <Text
            className={`font-semibold ${
              formulario.confirmarPassword.length === 0
                ? "text-gray-500"
                : coincide
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {formulario.confirmarPassword.length === 0
              ? "⚠️ Confirma tu contraseña"
              : coincide
              ? "✅ Las contraseñas coinciden"
              : "❌ Las contraseñas no coinciden"}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between mt-10">
        <View className="w-[48%]">
          <Pressable
            onPress={onBack}
            style={{ borderColor: "#47C5DE" }}
            className="w-full h-14 bg-transparent active:bg-slate-50 rounded-2xl justify-center items-center px-4 border-2"
          >
            <Text style={{ color: "#47C5DE" }} className="font-bold text-lg">
              Anterior
            </Text>
          </Pressable>
        </View>

        <View className="w-[48%]">
          <Pressable
            onPress={onSubmit}
            style={{ backgroundColor: "#42EDB5" }}
            className="w-full h-14 active:opacity-90 rounded-2xl justify-center items-center px-4 shadow-sm"
          >
            <Text className="text-white font-bold text-lg">Registrar</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}