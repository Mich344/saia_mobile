import { View, Image } from "react-native";
import { useState, useEffect } from "react";
import ipconfig from "@/sql/ipconfig";

interface Props {
  aprendiz: {
    imagen: string | null;
  };
}

export default function FotoAprendiz({ aprendiz }: Props) {
  const [errorImagen, setErrorImagen] = useState(false);

  // Reinicia el estado de error cada vez que cambia el aprendiz o la foto
  useEffect(() => {
    setErrorImagen(false);
  }, [aprendiz?.imagen]);

  // Formateo dinámico de la URL de la imagen
  const obtenerUrlImagen = () => {
    if (!aprendiz?.imagen) return null;

    const ruta = aprendiz.imagen;

    // Si ya incluye protocolo http/https, se usa directamente
    if (ruta.startsWith("http://") || ruta.startsWith("https://")) {
      return `${ruta}?t=${new Date().getTime()}`;
    }

    // Si es una ruta relativa, se limpia la barra inicial y se une con ipconfig
    const rutaLimpia = ruta.replace(/^\/+/, "");
    return `${ipconfig}${rutaLimpia}?t=${new Date().getTime()}`;
  };

  const urlFinal = obtenerUrlImagen();

  return (
    <View className="items-center">
      <View className="w-28 h-28 rounded-full border-[3px] border-teal-sena p-1 justify-center items-center bg-gray-100">
        <Image
          source={
            urlFinal && !errorImagen
              ? { uri: urlFinal }
              : require("@/img/avatar-placeholder.png")
          }
          onError={() => setErrorImagen(true)}
          style={{ width: 96, height: 96, borderRadius: 48 }}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}