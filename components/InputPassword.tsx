import React, { useState } from "react";
import { View, TextInput, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import css from "@/styles/StylesComponent";

interface PassProp {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  disable?: boolean;
}

const InputPass = ({
  placeholder = "Contraseña *",
  value,
  onChangeText,
  disable = false,
}: PassProp) => {
  const [visible, setVisible] = useState(false);

  return (
    <View
      className={`flex-row items-center rounded-2xl px-4 py-3 ${
        disable ? "bg-input-disabled" : "bg-input-bg"
      }`}
    >
      <Ionicons
        name="lock-closed-outline"
        size={22}
        color="#ABABAB"
        style={css.inputIconMargin}
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#ABABAB"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!visible}
        editable={!disable}
        className="flex-1 text-[15] text-black font-calibri"
      />
      <Pressable onPress={() => setVisible((v) => !v)} className="ml-2">
        <Ionicons
          name={visible ? "eye-outline" : "eye-off-outline"}
          size={22}
          color="#ABABAB"
        />
      </Pressable>
    </View>
  );
};

export default InputPass;
