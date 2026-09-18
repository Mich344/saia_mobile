import { useState } from "react";

import { View, Text, ScrollView, Alert, Switch, TextInput } from "react-native";

import { useLocalSearchParams, router } from "expo-router";

import Container from "@/components/Container";
import GradientP from "@/components/GradientP";
import Button from "@/components/Button";

import FotoAprendiz from "./components/Foto_Aprendiz";
import Estado from "./components/Estado";

import registrarSalida from "@/sql/Registrar_Salida";

export default function InfoSalida() {
  const { aprendiz, movimiento } = useLocalSearchParams();

  const datos = JSON.parse(aprendiz as string);

  const ingreso = JSON.parse(movimiento as string);

  const [observacion, setObservacion] = useState("");

  const [insumos, setInsumos] = useState(
    datos.insumos.map((item: any) => ({
      ...item,

      salida: true,

      observacion: "",
    })),
  );

  const cambiarEstado = (index: number) => {
    const copia = [...insumos];

    copia[index].salida = !copia[index].salida;

    setInsumos(copia);
  };
  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
      >
        <View className="items-center mt-5">
          <GradientP text="Registrar salida" fontWeight="bold" fontSize={24} />

          <Text className="text-gray-400 mt-2">
            Validar los insumos antes de autorizar la salida
          </Text>
        </View>
        {/* CARD DEL APRENDIZ */}
        <View className="bg-white rounded-2xl mt-5 p-5 shadow-sm">
          <FotoAprendiz aprendiz={datos.persona} />

          <Text className="text-center text-xl font-bold mt-4">
            {datos.persona.nombre_completo}
          </Text>

          <Text className="text-center text-gray-500">
            {datos.persona.tip_doc} {datos.persona.num_doc}
          </Text>

          <View className="items-center mt-3">
            <Estado estado={datos.resumen.estado} />
          </View>
        </View>
        {/* INSUMOS */}
        <View className="mt-6">
          <Text className="text-lg font-bold mb-3">Insumos registrados</Text>

          {insumos.length === 0 ? (
            <View className="bg-white rounded-2xl p-6">
              <Text className="text-center text-gray-400">
                Este aprendiz no tiene insumos registrados.
              </Text>
            </View>
          ) : (
            insumos.map((item: any, index: number) => (
              <View
                key={item.id_insumo}
                className="bg-white rounded-2xl p-4 mb-4 shadow-sm"
              >
                <View className="flex-row justify-between items-center">
                  <View className="flex-1">
                    <Text className="font-bold text-base">
                      {item.nom_insumo}
                    </Text>

                    <Text className="text-gray-500">{item.marca}</Text>

                    <Text className="text-gray-400 text-xs">
                      Serie: {item.num_serie}
                    </Text>
                  </View>

                  <Switch
                    value={item.salida}
                    onValueChange={() => cambiarEstado(index)}
                  />
                </View>

                {!item.salida && (
                  <TextInput
                    placeholder="¿Por qué no salió este insumo?"
                    value={item.observacion}
                    onChangeText={(texto) => {
                      const copia = [...insumos];

                      copia[index].observacion = texto;

                      setInsumos(copia);
                    }}
                    multiline
                    className="border border-gray-300 rounded-xl mt-4 p-3"
                  />
                )}
              </View>
            ))
          )}
        </View>{" "}
        {/* OBSERVACIÓN GENERAL */}
        <View className="mt-4">
          <Text className="font-bold text-lg mb-3">Observación general</Text>

          <TextInput
            placeholder="Escriba una observación (opcional)"
            multiline
            value={observacion}
            onChangeText={setObservacion}
            className="bg-white rounded-2xl border border-gray-300 p-4"
            style={{
              minHeight: 100,
              textAlignVertical: "top",
            }}
          />
        </View>
        {/* BOTÓN */}
        <View className="items-center mt-8 mb-6">
          <Button
            text="Registrar salida"
            onPress={async () => {
              //========================================
              // Validar observaciones
              //========================================

              for (const item of insumos) {
                if (!item.salida && item.observacion.trim() === "") {
                  Alert.alert(
                    "Observación requerida",

                    `Debe escribir la observación del insumo "${item.nom_insumo}".`,
                  );

                  return;
                }
              }

              Alert.alert(
                "Confirmar salida",

                `¿Desea registrar la salida de ${datos.persona.nombre_completo}?`,

                [
                  {
                    text: "Cancelar",

                    style: "cancel",
                  },

                  {
                    text: "Aceptar",

                    onPress: async () => {
                      const respuesta = await registrarSalida({
                        num_doc: datos.persona.num_doc,

                        observacion,

                        insumos,
                      });

                      if (!respuesta.ok) {
                        Alert.alert(
                          "Error",

                          respuesta.data.mensaje,
                        );

                        return;
                      }

                      Alert.alert(
                        "Salida registrada",

                        respuesta.data.mensaje,

                        [
                          {
                            text: "Aceptar",

                            onPress: () => router.back(),
                          },
                        ],
                      );
                    },
                  },
                ],
              );
            }}
          />
        </View>
      </ScrollView>
    </Container>
  );
}
