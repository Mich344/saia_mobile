// Librerias
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

// Componentes

const InputOpcion = () => {
  const [abierto, setAbierto] = useState(false);
  const [seleccion, setSeleccion] = useState("");
  const opciones = [
    "Cedula de ciudadania",
    "Targeta de identidad",
    "Cedula de extranjeria",
    "Ppt",
  ];
  return (
    <>
      {/* input1 con desplegable */}
      <View className="z-50">
        {/* z-50 es clave para que la lista flote sobre el input de abajo */}
        <TouchableOpacity
          onPress={() => setAbierto(!abierto)}
          className="border border-sombreado_input rounded-[12px]  flex-row p-16 justify-between  bg-white "
        >
          <Text className={seleccion ? "text-black" : "text-gray-400"}>
            {seleccion || "Tipo de documento"}
          </Text>
          <Text className="text-gray-400">{abierto ? "V" : "V"}</Text>
        </TouchableOpacity>
        {abierto && (
          <View className="absolute top-[58px] left-0 right-0 border border-gray-200 rounded-xl bg-white shadow-lg z-50">
            {opciones.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => {
                  setSeleccion(item);
                  setAbierto(false);
                }}
                className="p-4 border-b border-gray-50"
              >
                <Text className="text-gray-700">{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      </>
  );
};

export default InputOpcion;

// - Documentacion kelly - Jorge - lizzy.

// - Mockups Cambindo - Valery - Emanuel.

// - Desarrollo Back-end base al front-end - Camilo.

// - Hian Auditor & Desarrollo front-end and backend.
