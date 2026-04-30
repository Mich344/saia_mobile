import { Stack } from "expo-router";
import "./global.css";
import { useFonts } from "expo-font";

export default function RoutesLayout() {
  const [fontsLoaded] = useFonts({
    Calibri_BoldRegular: require("@/assets/fonts/calibri-bold-italic.ttf"),
    Calibri_Bold: require("@/assets/fonts/calibri-bold.ttf"),
    Calibri_Regular: require("@/assets/fonts/calibri-regular.ttf"),
    Calibri_Italic: require("@/assets/fonts/calibri-italic.ttf"),
  });
  if (!fontsLoaded) return null;
  return <Stack screenOptions={{ headerShown: false }} />;
}
