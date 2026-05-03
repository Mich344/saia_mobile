import { Pressable, PressableProps, Text } from "react-native";
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

//extiende PressableProps para que tu el boton herede TODAS las propiedades nativas
//onPress, disabled, style, etc.
interface Props extends PressableProps {
  text: string;
  //tupla de colores para el degradado
  //readonly evita que se modifique accidentalmente
  //[string, string] = 2 colores para el degradado
  color?: readonly [string, string];
  size?: 'lg' | 'sm'; //tamaño del boton lg= grande sm = pequeño
}

const Button = ({
  text,
  //valor por defecto del color
  color = ['#2EE7B3', '#32C7D3'],
  onPress,
  size = 'lg', //tamaño por defecto lg = grande
}: Props) => {

  //estilos segun tamaño
  const sizeStylesButton = {
    lg: {
      width: 246,
      height: 60,
      fontSize: 18,
      borderRadius: 25,
    },
    sm: {
      width: 174,
      height: 36,
      fontSize: 15,
      borderRadius: 25,
    },
  };
  const customSize = sizeStylesButton[size];
  return (
    //pressable maneja la interaccion del boton
    <Pressable onPress={onPress}>
      <LinearGradient
        colors={color}

        // Define la direccion del degradado
        // (0,0) = izquierda, (1,0) = derecha -> horizontal
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}

        //para que se visualice en dispositivos fisicos
        style={{
          borderRadius: customSize.borderRadius,
          width: customSize.width,
          height: customSize.height,

        }}


        //tailwind:
        //mt-5 = margen superior
        //rounded-3xl = bordes redondeados
        //w/h = tamaño fijo del boton
        //justify-center = centra verticalmente el contenido
        //active:opacity-80 = efecto al presionar
        className={`mt-[35] justify-center active:opacity-70`}
      >
        <Text
          //text-center -> centra horizontalmente el texto
          className="text-background text-center font-bold"
          style={{
            fontSize: customSize.fontSize,
          }}
        >
          {text}
        </Text>

      </LinearGradient>
    </Pressable>
  );
};

export default Button;