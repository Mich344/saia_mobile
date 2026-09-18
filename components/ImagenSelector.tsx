import { View, Image, Pressable, ImageSourcePropType } from "react-native";
import * as ImagePicker from "expo-image-picker";
import css from "@/styles/StylesComponent";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import ipconfig from "@/sql/ipconfig"; // convertir ruta de la DB en URL para mostrar img

type PlaceholderType = "avatar" | "item";

interface ArchivoImagen {
  uri: string;
  name: string;
  type: string;
}

type ImageSelectorProps = {
  size?: number;
  form?: "circle" | "square" | "rounded";
  cameraSize?: number;
  placeholder?: PlaceholderType;
  showCameraIcon?: boolean;
  showShadow?: boolean;

  mode?: "default" | "upload";

  uploadWidth?: number;
  uploadHeight?: number;

  image?: string | null;

  onImageSelected?: (imagen: ArchivoImagen) => void;
};

export default function ImageSelector({
  size = 120,
  form = "circle",
  cameraSize = 22,
  placeholder = "avatar",
  showCameraIcon = true,
  showShadow = true,
  mode = "default",
  uploadWidth = 140,
  uploadHeight = 150,
  image: initialImage,
  onImageSelected,
}: ImageSelectorProps) {
  const [image, setImage] = useState<string | null>(initialImage ?? null);

  useEffect(() => {
    setImage(initialImage ?? null);
  }, [initialImage]);

  // ==========================================
  // CONVERTIR RUTA DE BD A URL COMPLETA
  // ==========================================

  const obtenerUriImagen = (imagen: string | null) => {
    if (!imagen) {
      return null;
    }

    // 1. Si es una URL remota o un esquema de archivo local/cache (file://, content://, data:)
    if (
      imagen.startsWith("http") ||
      imagen.startsWith("file:") ||
      imagen.startsWith("content:") ||
      imagen.startsWith("data:")
    ) {
      return imagen;
    }

    // 2. Si viene desde la base de datos (ej: /uploads/perfiles/imagen.jpg)
    return `${ipconfig}${imagen.replace(/^\/+/, "")}`;
  };

  const uriImagen = obtenerUriImagen(image);

  // ==========================================
  // SELECCIONAR IMAGEN
  // ==========================================

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Se necesitan permisos para acceder a la galería");
      return;
    }

    // SOLUCIÓN AL WARN: Se usa ['images'] en lugar de MediaTypeOptions.Images
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      const asset = result.assets[0];

      // Guardar URI local
      setImage(asset.uri);

      // Determinar nombre y tipo MIME con fallbacks seguros
      const filename = asset.fileName ?? asset.uri.split("/").pop() ?? `imagen_${Date.now()}.jpg`;
      const match = /\.(\w+)$/.exec(filename);
      const ext = match ? match[1].toLowerCase() : "jpg";
      const mimeType = asset.mimeType ?? `image/${ext === "jpg" ? "jpeg" : ext}`;

      onImageSelected?.({
        uri: asset.uri,
        name: filename,
        type: mimeType,
      });
    }
  };

  // ==========================================
  // PLACEHOLDERS
  // ==========================================

  const placeholders: Record<PlaceholderType, ImageSourcePropType> = {
    avatar: require("../img/avatar-placeholder.png"),
    item: require("../img/item-placeholder.png"),
  };

  // ==========================================
  // BORDE
  // ==========================================

  const getBorderRadius = () => {
    if (form === "circle") return size / 2;
    if (form === "rounded") return 25;
    return 0;
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <View>
      {mode === "upload" ? (
        <Pressable onPress={pickImage}>
          <View
            style={[
              css.imagenSelectorUpload,
              {
                width: uploadWidth,
                height: uploadHeight,
              },
            ]}
          >
            <Image
              style={{
                width: uploadWidth - 16,
                height: uploadHeight * 0.65,
              }}
              source={
                uriImagen ? { uri: uriImagen } : placeholders[placeholder]
              }
              resizeMode="contain"
            />

            <View className="w-full h-px bg-[#EBEBEB] mt-2" />

            <View className="items-center mt-2">
              <View className="flex-row items-center gap-2 -mt-[5px]">
                <Ionicons
                  name="cloud-upload-outline"
                  size={22}
                  color="#3DE1B9"
                />
              </View>
            </View>
          </View>
        </Pressable>
      ) : (
        <View>
          <View
            style={[
              showShadow ? css.sombraNegra : { backgroundColor: "#fff" },
              {
                borderRadius: getBorderRadius(),
              },
            ]}
          >
            <Image
              style={[
                showShadow ? css.sombraDifuminada : {},
                {
                  borderRadius: getBorderRadius(),
                  width: size,
                  height: size,
                },
              ]}
              source={
                uriImagen ? { uri: uriImagen } : placeholders[placeholder]
              }
            />
          </View>

          {showCameraIcon && (
            <Pressable onPress={pickImage}>
              <Ionicons
                className="self-end"
                name="camera-outline"
                size={cameraSize}
                style={[css.iconoShadowStyle]}
              />
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}