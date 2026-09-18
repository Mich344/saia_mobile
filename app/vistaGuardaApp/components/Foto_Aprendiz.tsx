import { View, Image } from "react-native";
import { useState, useEffect } from "react";
import ipconfig from "@/sql/ipconfig";

interface Props {
  aprendiz?: {
    imagen?: string | null;
  } | null;
}

export default function FotoAprendiz({ aprendiz }: Props) {
  const [errorImagen, setErrorImagen] = useState(false);

  // Reiniciar el estado de error cada vez que cambie la propiedad de la imagen
  useEffect(() => {
    setErrorImagen(false);
  }, [aprendiz?.imagen]);

  // Formatear correctamente la URL final
  const construirUrlImagen = () => {
    const ruta = aprendiz?.imagen;
    if (!ruta) return null;

    // Si ya incluye el dominio/protocolo completo
    if (ruta.startsWith("http://") || ruta.startsWith("https://")) {
      return `${ruta}?t=${new Date().getTime()}`;
    }

    // Limpiar barras iniciales repetidas antes de concatenar con ipconfig
    const rutaLimpia = ruta.replace(/^\/+/, "");
    return `${ipconfig}${rutaLimpia}?t=${new Date().getTime()}`;
  };

  const urlImagen = construirUrlImagen();

  return (
    <View className="items-center">
      <View className="w-28 h-28 rounded-full border-[3px] border-teal-sena p-1 justify-center items-center bg-gray-100">
        <Image
          source={
            urlImagen && !errorImagen
              ? { uri: urlImagen }
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