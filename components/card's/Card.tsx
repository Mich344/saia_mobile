import { Image, Pressable, Text, View } from "react-native";

type CardProp = {
  img: any;
  text: string;
  onPress?: any;
  title: string;
  bgColor?: string;
};

const Card = ({ img, text, onPress, title, bgColor }: CardProp) => {
  const colors = () => {
    switch (bgColor) {
      case "naranja":
        return {
          bg: "bg-[#FDEFE6]",
          text: "text-[#F36703]",
        };
      case "violeta":
        return {
          bg: "bg-[#F4EFFD]",
          text: "text-[#7921E0]",
        };
      case "verde":
        return {
          bg: "bg-[#E3F7EC]",
          text: "text-[#079A4D]",
        };
      case "azul":
        return {
          bg: "bg-[#ECF4FD]",
          text: "text-[#2C79EE]",
        };
    }
  };
  const theme = colors();
  return (
    <View>
      <Pressable
        className="w-[150px] h-[150px] bg-white rounded-[15px] items-center justify-center shadow-sm m-5 border-[2px] border-[#f1f0f0] active:scale-95 active:opacity-100"
        onPress={onPress}
      >
        <View className={`p-3 rounded-xl ${theme?.bg}`}>
          <Image
            source={img}
            style={{ width: 50, height: 50, marginBottom: 2 }}
          />
        </View>
        <View className="mt-1">
          <Text className="font-calibriBold text-center text-[18px]">
            {title}
          </Text>
          <Text className={`font-calibriBold text-center ${theme?.text}`}>
            {text}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Card;
