import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";

export default function FormularioLogin() {
  const [tDOcumento, setDocumento] = useState("Tipo de documento*");
  const [seltectDoc, setselectDoc] = useState(false);
  
  const [nDocumento, setNDocumento] = useState("");
  const [contraseña, setContraseña] = useState("");
}
