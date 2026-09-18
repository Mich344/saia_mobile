import { Text, View } from "react-native";
import Obligatorio from "@/components/molecules/AsteriscoOb";

type LabelProp = {
  title?: string;
  className?: string;
};

const Label = ({ title, className }: LabelProp) => {
  return (
    <View className="bg-white">
      <Text className={className}>
        {title}
        <Obligatorio signo="*" />
      </Text>
    </View>
  );
};

export default Label;
