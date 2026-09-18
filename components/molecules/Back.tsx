import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text } from "react-native";
type Classname = {
  className?: string;
  onPress?: any;
  title: string;
  subtitle: string;
};
const Back = ({ className, onPress, title, subtitle }: Classname) => {
  return (
    <>
      <View className={`${className} flex-row `}>
        <View className=" w-11 h-11 rounded-full bg-white border border-gray-200 items-center justify-center mt-2 mr-3">
          <Ionicons
            name="arrow-back"
            size={22}
            color="#172033"
            onPress={onPress}
          />
        </View>

        <View>
          <Text className="text-[20px] font-WorkSansExtraBold text-[#172033]">
            {title}
          </Text>
          <Text className="text-[12px] text-gray-500 mt-0.5">{subtitle}</Text>
        </View>
      </View>
    </>
  );
};

export default Back;
