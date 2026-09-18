import { View, Text } from "react-native";

interface Props {
  estado: number | string;
}

export default function Estado({ estado }: Props) {
   const activo =
    estado === 1 ||
    estado === "1" ||
    estado === "ACTIVO";

  return (
    <View className="flex-row items-center mt-2">

      <View
        className={`w-2.5 h-2.5 rounded-full ${
          activo ? "bg-green-500" : "bg-red-500"
        }`}
      />

      <Text
        className={`ml-2 text-sm font-medium ${
          activo ? "text-green-600" : "text-red-600"
        }`}
      >
        Estado: {activo ? "Activo" : "Inactivo"}
      </Text>

    </View>
  );
}