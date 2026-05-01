import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    <SafeAreaView className="flex-1 ">
      <View className="flex-1 w-full p-4 ">{children}</View>
    </SafeAreaView>
  );
}
