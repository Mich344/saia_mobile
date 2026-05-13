import { View, Image, Pressable, ImageSourcePropType } from "react-native";
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
};

//funcion que genera de forma predeterminada el componente
export default function ImageSelector({
  size = 120,
  form = "circle",
  cameraSize = 22,
  placeholder = "avatar",
  showCameraIcon = true,

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
      {/* 
      Aplica:
      - sombra negra
      - borderRadius dinámico
      */}
      <View
        style={[
          css.sombraNegra,
          {
            borderRadius: getBorderRadius(),
          },
        ]}
      >

        <Image
          style={[
            css.sombraDifuminada,
            {
              borderRadius: getBorderRadius(),
              width: size,
              height: size,
            },
          ]}
          source={
            image
              ? { uri: image }
              : placeholders[placeholder]
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
  );
}