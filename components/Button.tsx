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
}

const Button = ({
  text,
  //valor por defecto del color
  color = ['#2EE7B3', '#32C7D3'],
  onPress,
}: Props) => {
  return (
    //pressable maneja la interaccion del boton
    <Pressable className="rounded-[25px] overflow-hidden" onPress={onPress}>

      {/*lineargradient reemplaza un view normal para pintar el fondo degradado */}
      <LinearGradient
        colors={color}

        // Define la direccion del degradado
        // (0,0) = izquierda, (1,0) = derecha -> horizontal
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{borderRadius:24}} //para que se visualice en dispositivos fisicos
        //tailwind:
        //mt-5 = margen superior
        //rounded-3xl = bordes redondeados
        //w/h = tamaño fijo del boton
        //justify-center = centra verticalmente el contenido
        //active:opacity-80 = efecto al presionar
        className={`mt-[35] w-[246px] h-[60px] justify-center active:opacity-80 paddin`}
      >
        <Text
          //text-center -> centra horizontalmente el texto
          className={`text-background text-center font-bold text-[18px]`}
        >
          {text}
        </Text>

      </LinearGradient>
    </Pressable>
  );
};

export default Button;