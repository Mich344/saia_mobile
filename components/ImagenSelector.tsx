import { View, Image, Pressable, ImageSourcePropType } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

type PlaceholderType = "avatar" | "item";

type ImageSelectorProps = {
  size?: number;
  form?: "circle" | "square" | "rounded";
  cameraSize?: number;
  placeholder: PlaceholderType;
};

export default function ImageSelector({
  size = 120,
  form = "circle",
  cameraSize = 22,
  placeholder = "avatar",
}: ImageSelectorProps) {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Se necesitan permisos para acceder a la galeria");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const placeholders: Record<PlaceholderType, ImageSourcePropType> = {
    avatar: require("../img/avatar-placeholder.png"),
    item: require("../img/item-placeholder.png"),
  };

  const getBorderRadius = () => {
    if (form === "circle") return size / 2;
    if (form === "rounded") return 20;
    return 0;
  };

  const iconBoxSize = cameraSize + 10;

  return (
    <View style={{ width: size, height: size }}>

      {/*imagen con sombra*/}
      <View
        style={{
          width: size,
          height: size,
          borderRadius: getBorderRadius(),
          elevation: 6,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.4,
          shadowRadius: 6,
          backgroundColor: "#B3B3B3",
        }}
      >
        <Image
          source={image ? { uri: image } : placeholders[placeholder]}
          style={{
            width: size,
            height: size,
            borderRadius: getBorderRadius(),
          }}
        />
      </View>

      {/*icono cam*/}
      <Pressable
        onPress={pickImage}
        hitSlop={20}
        android_ripple={{ color: "#ccc", radius: iconBoxSize / 2 }}
        style={({ pressed }) => ({
          position: "absolute",
          bottom: 0,
          right: 0,
          width: iconBoxSize,
          height: iconBoxSize,
          borderRadius: iconBoxSize / 2,
          backgroundColor: pressed ? "#DDDDE0" : "#F5F5F6",
          borderWidth: 2,
          borderColor: "#FFFFFF",
          alignItems: "center",
          justifyContent: "center",
          elevation: 4,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.5,
          shadowRadius: 3,
        })}
      >
        <Ionicons name="camera-outline" size={cameraSize} color="#333" />
      </Pressable>

    </View>
  );
}