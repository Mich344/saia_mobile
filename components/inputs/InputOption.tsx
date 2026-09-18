import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import css from "@/styles/StylesComponent";

interface InputOpcionProps {
  placeholder: string;
  opciones: string[];
  value?: string;
  onSelect?: (item: string) => void;
  iconName?: any;
  placeholderColor?: string;
  optionsColor?: string;
  error?: boolean;
  color?: string;
}

const InputOpcion = ({
  placeholder,
  opciones,
  value,
  onSelect,
  iconName,
  placeholderColor = "#ABABAB",
  optionsColor = "#1A1A1A",
  error,
  color,
}: InputOpcionProps) => {
  const [abierto, setAbierto] = useState(false);
  const [seleccion, setSeleccion] = useState(value ?? "");

  const [posicion, setPosicion] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setSeleccion(value ?? "");
  }, [value]);

  const abrirOpciones = () => {
    setAbierto(true);
  };

  const cerrarOpciones = () => {
    setAbierto(false);
  };

  const handleSelect = (item: string) => {
    setSeleccion(item);
    setAbierto(false);

    onSelect?.(item);
  };

  const obtenerPosicion = () => {
    if (inputRef.current) {
      inputRef.current.measureInWindow((x, y, width, height) => {
        setPosicion({
          x,
          y,
          width,
          height,
        });

        setAbierto(true);
      });
    }
  };

  const inputRef = React.useRef<View>(null);

  return (
    <>
      {/* ==================================================
          INPUT PRINCIPAL
      ================================================== */}

      <View ref={inputRef}>
        <TouchableOpacity
          onPress={obtenerPosicion}
          activeOpacity={0.8}
          className={`flex-row items-center w-full rounded-[12px] p-[13px] border-[1px] ${
            error ? "border-red-600" : "border-[#ACA9A9]"
          } ${color || ""}`}
        >
          {iconName && (
            <Ionicons
              name={iconName}
              size={22}
              color="#ABABAB"
              style={css.inputIconMargin}
            />
          )}

          <Text
            className="flex-1 text-[15px] font-calibri"
            style={[
              css.inputOptionText,
              {
                color: seleccion ? "#000" : placeholderColor,
              },
            ]}
          >
            {seleccion || placeholder}
          </Text>

          <Ionicons
            name={abierto ? "chevron-up" : "chevron-down"}
            size={20}
            color="#ABABAB"
          />
        </TouchableOpacity>
      </View>

      {/* ==================================================
          MODAL DE OPCIONES
      ================================================== */}

     <Modal
  visible={abierto}
  transparent={true}
  animationType="fade"
  statusBarTranslucent={false}
  navigationBarTranslucent={false}
  onRequestClose={cerrarOpciones}
>
  <Pressable
    className="flex-1"
    style={{
      backgroundColor: "transparent",
    }}
    onPress={cerrarOpciones}
  >
    <View
      className="absolute bg-white rounded-2xl overflow-hidden border border-[#E5E5E5]"
      style={{
        top: posicion.y + posicion.height + 5,
        left: posicion.x,
        width: posicion.width,
        elevation: 5,
      }}
    >
      {opciones.map((item, i) => (
        <TouchableOpacity
          key={`${item}-${i}`}
          onPress={() => handleSelect(item)}
          activeOpacity={0.7}
          className={`px-4 py-4 ${
            i !== opciones.length - 1
              ? "border-b-[0.8px] border-[#EAEAEA]"
              : ""
          }`}
        >
          <Text
            className="text-[15px] font-calibri"
            style={{
              color: optionsColor,
            }}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </Pressable>
</Modal>
    </>
  );
};

export default InputOpcion;