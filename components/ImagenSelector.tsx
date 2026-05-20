import { View, Image, Pressable, ImageSourcePropType, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import css from "@/styles/StylesComponent";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

type PlaceholderType = "avatar" | "item";

/*
size:
Tamaño de la imagen.

form:
Forma de la imagen:
- circle
- square
- rounded

cameraSize:
Tamaño del icono de cámara.

placeholder:
Imagen predeterminada que se mostrará.

showCameraIcon:
Permite mostrar u ocultar el icono de cámara.
*/
type ImageSelectorProps = {
  size?: number;
  form?: "circle" | "square" | "rounded";
  cameraSize?: number;
  placeholder?: PlaceholderType;
  showCameraIcon?: boolean;
  // Muestra u oculta la sombra de la imagen (por defecto true)
  showShadow?: boolean;
  /*
  mode:
  - "default" → comportamiento original (imagen con sombra + ícono cámara)
  - "upload"  → recuadro con borde, imagen centrada y botón "Cargar Imagen" abajo
  */
  mode?: "default" | "upload";
  // Ancho del recuadro upload (solo aplica en mode="upload")
  uploadWidth?: number;
  // Alto del recuadro upload (solo aplica en mode="upload")
  uploadHeight?: number;
};

//funcion que genera de forma predeterminada el componente
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
}: ImageSelectorProps) {
  /*
  useState
  Hook que almacena la imagen seleccionada por el usuario.
  image:
  Contiene la URI de la imagen.
  setImage:
  Función que actualiza el estado.
  Inicialmente es null porque aún no hay imagen.
  */
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    /*
    Solicita permisos de galería
    Retorna un objeto con información del permiso.
    */
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    /*
    Validación de permisos
    Si el usuario rechaza el permiso:
    - Se muestra alerta
    - Se detiene la función
    */
    if (!permission.granted) {
      alert("Se necesitan permisos para acceder a la galeria");
      return;
    }

    /*
    --------------------------------------------------------------------------
    | Abrir galería del dispositivo
    --------------------------------------------------------------------------
    | launchImageLibraryAsync abre la galería.
    | Configuración:
    | mediaTypes:
    | Solo permite imágenes.
    | quality:
    | Calidad máxima.
    | allowsEditing:
    | Permite recortar la imagen.
    | aspect:
    | Mantiene relación 1:1 (cuadrado).
    */
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      aspect: [1, 1],
    });
    /*
    | Validar selección
    | Si el usuario sí seleccionó una imagen:
    | - Obtiene la URI
    | - Guarda la imagen en el estado
    */
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | placeholders
  |--------------------------------------------------------------------------
  | Objeto que almacena las imágenes predeterminadas.
  |
  | Record:
  | Relaciona cada tipo con una imagen.
  |
  | avatar -> avatar-placeholder.png
  | item -> item-placeholder.png
  */
  const placeholders: Record<
    PlaceholderType,
    ImageSourcePropType
  > = {
    avatar: require("../img/avatar-placeholder.png"),
    item: require("../img/item-placeholder.png"),
  };

  /*
  getBorderRadius()
  funcion que genera el borde dinamicamente
  
  circle:
  Hace la imagen completamente circular.
  
  rounded:
  Bordes redondeados.
  
  square:
  Bordes cuadrados.
  */
  const getBorderRadius = () => {
    if (form === "circle") return size / 2;
    if (form === "rounded") return 25;
    return 0;
  };

  return (
    <View>
      {/* ── Modo upload: recuadro con borde + imagen grande + texto abajo ── */}
      {mode === "upload" ? (
        <Pressable onPress={pickImage}>
          <View
            style={[
              css.imagenSelectorUpload,
              { width: uploadWidth, height: uploadHeight },
            ]}
          >
            {/* Imagen ocupa la parte superior del recuadro */}
            <Image
              style={{
                width: uploadWidth - 16,
                height: uploadHeight * 0.65,
              }}
              source={image ? { uri: image } : placeholders[placeholder]}
              resizeMode="contain"
            />

            {/* Separador */}
            <View className="w-full h-px bg-[#EBEBEB] mt-2" />

            {/* Texto "Cambiar Imagen" centrado abajo */}
            <View className="items-center mt-2">
              <View className="flex-row items-center gap-2">
                <Ionicons name="cloud-upload-outline" size={22} color="#3DE1B9" />
                <Text className="text-teal-sena text-[16] font-bold">
                  {image ? "Cambiar Imagen" : "Cargar Imagen"}
                </Text>
              </View>
              <Text className="text-[#ABABAB] text-[12] mt-0.5">
                PNG, JPG Hasta 5MB
              </Text>
            </View>
          </View>
        </Pressable>
      ) : (
        /* ── Modo default: comportamiento original ── */
        <View>
          <View
            style={[
              showShadow ? css.sombraNegra : { backgroundColor: "#fff" },
              { borderRadius: getBorderRadius() },
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
              source={image ? { uri: image } : placeholders[placeholder]}
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