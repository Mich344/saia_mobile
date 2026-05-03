import { Image, Pressable, Text } from "react-native";

type CardProp = {
  img: any;
  text: string;
  onPress?: any;
};

const Card = ({ img, text, onPress }: CardProp) => {
  return (
    <Pressable
      className="w-[157px] h-[121px] bg-white rounded-[20px] items-center justify-center shadow-xl mb-5"
      onPress={onPress}
    >
      <Image source={img} style={{ width: 50, height: 50 }} />

      <Text className="font-calibriBold mt-4 text-center text-[18px]">
        {text}
      </Text>
    </Pressable>
  );
};

export default Card;