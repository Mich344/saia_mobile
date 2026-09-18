import { View, Text, Image } from "react-native";

const EsquinasQR = () => {
    return(
        <View className="flex-1">
        {/* Parte superior */}
        <View className="flex-1 bg-black/70" />

        {/* Centro */}
        <View className="flex-row h-[300px]">
          <View className="flex-1 bg-black/70" />

          {/* Marco */}
          <View className="w-[280px] h-[280px] relative">
            <View className="absolute top-0 left-0 w-10 h-10 border-l-4 border-t-4 border-teal-sena" />

            <View className="absolute top-0 right-0 w-10 h-10 border-r-4 border-t-4 border-teal-sena" />

            <View className="absolute bottom-0 left-0 w-10 h-10 border-l-4 border-b-4 border-teal-sena" />

            <View className="absolute bottom-0 right-0 w-10 h-10 border-r-4 border-b-4 border-teal-sena" />
          </View>

          <View className="flex-1 bg-black/70" />
        </View>

        {/* Parte inferior */}
        <View className="flex-1 bg-black/70 items-center pt-10">
          <Image />
          <View className="bg-black/50 p-5 rounded-lg items-center border border-red-100">
            <Text className="text-white  text-xl font-bold">
              Acerque el código QR
            </Text>

            <Text className="text-gray-300 mt-3">
              El código será leído automáticamente
            </Text>
          </View>
        </View>
      </View>
    )
}

export default EsquinasQR;