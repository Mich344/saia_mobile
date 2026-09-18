import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ReactNode, useCallback, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";

import Footer from "@/components/Footer";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function Container({
  children,
  className,
}: ContainerProps) {
  const scrollRef = useRef<ScrollView>(null);

  useFocusEffect(
    useCallback(() => {
      // Cada vez que la vista recibe el foco,
      // regresar automáticamente al inicio.
      scrollRef.current?.scrollTo({
        y: 0,
        animated: false,
      });
    }, []),
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          className={`flex-1 bg-white rounded-t-[24px] ${className ?? ""}`}
        >
          <ScrollView
            ref={scrollRef}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              paddingHorizontal: 24,
              paddingVertical: 16,
              paddingBottom: 5,
            }}
          >
            {children}

            <Footer />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}