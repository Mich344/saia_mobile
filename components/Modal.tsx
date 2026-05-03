import React from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  Image,
  ImageSourcePropType,
} from "react-native";

interface infomodal {
  visible: boolean;
  onClose: () => void;
  titulo: string;
  descripcion: string;
  imagen?: ImageSourcePropType;
  boton?: string;
}

const Modalcomponent = ({
  visible,
  onClose,
  titulo,
  descripcion,
  imagen,
  boton,
}: infomodal) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        className="flex-1 *
      items-center
      justify-center
      bg-black/50
      "
      >
        <View
          className="
        bg-white
        p-5
        justify-center
        items-center
        rounded-[10px] 
        gap-[12px]
        w-[80%]
        text-center
        "
        >
          <Pressable
            onPress={onClose}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-gray-200 items-center justify-center"
          >
            <Text className="font-bold">X</Text>
          </Pressable>

          {imagen && (
            <Image source={imagen} className="w-[51px] h-[49px] rounded-lg" />
          )}

          <Text
            className="text-black 
          font-calibriBold
              text-[19px]
             "
          >
            {titulo}
          </Text>
          <Text
            className="text-black
          font-calibri
             text-[13px]
            text-center
            
             "
          >
            {descripcion}
          </Text>
        </View>
      </View>
    </Modal>
  );


  {
 
  }
};

export default Modalcomponent;
