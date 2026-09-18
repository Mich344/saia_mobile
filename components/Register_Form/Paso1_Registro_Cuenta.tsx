import { View, Text, Pressable } from "react-native";
import Input from "@/components/inputs/Input";
import InputOpcion from "@/components/inputs/InputOption";
import Label from "@/components/inputs/InputLabel";
import campos from "@/atoms/FormularioRegistroAprendiz";
import { FormularioState, FormularioKey } from "@/hooks/utils/validacion_Registro_SAIA";

interface Props {
  formulario: FormularioState;
  error: Record<string, boolean>;
  onChange: (campo: FormularioKey, valor: string) => void;
  onNext: () => void;
}

export default function Paso1Informacion({ formulario, error, onChange, onNext }: Props) {
  return (
    <>
      <View className="w-full h-[1px] bg-gray-300 my-4" />
      <Text className="text-2xl font-bold text-slate-800 text-center">
        Información personal
      </Text>
      <Text className="text-gray-500 mt-2 mb-6 text-center">
        Ingresa tus datos básicos.
      </Text>

      <Label title="Tipo de documento" />
      <InputOpcion
        error={error["tip_doc"]}
        iconName="card-outline"
        placeholder="Seleccione..."
        value={formulario.tip_doc}
        placeholderColor="#ABABAB"
        opciones={[
          "Cédula de Ciudadanía",
          "Tarjeta de Identidad",
          "Cédula de Extranjería",
          "Permiso por Protección Temporal",
        ]}
        onSelect={(valor) => onChange("tip_doc", valor)}
      />

      {campos.slice(0, 3).map((iterar) => {
        const campoKey = iterar.key as FormularioKey;
        return (
          <View key={iterar.key} className="mt-5">
            <Label title={iterar.title} />
            <Input
              iconName={iterar.icon}
              placeholder={iterar.placeholder}
              inputMode={iterar.inputMode}
              keyboardType={iterar.keyboardType}
              error={error[iterar.key]}
              value={formulario[campoKey]}
              onChangeText={(texto) =>
                onChange(
                  campoKey,
                  iterar.key === "num_doc" ? texto.replace(/\D/g, "").slice(0, 10) : texto
                )
              }
            />
          </View>
        );
      })}

      <View className="w-[60%] self-center mt-10">
        <Pressable
          onPress={onNext}
          style={{ backgroundColor: "#42EDB5" }}
          className="w-full h-14 active:opacity-90 rounded-2xl justify-center items-center px-4 shadow-sm"
        >
          <Text className="text-white font-bold text-lg">Siguiente</Text>
        </Pressable>
      </View>
    </>
  );
}