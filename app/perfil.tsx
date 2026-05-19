import { useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import Svg, {
  Defs,
  LinearGradient as SvgGradient,
  Stop,
  Text as SvgText,
} from "react-native-svg";
import css from "@/styles/StylesComponent";
import Button from "@/components/Button";
import Header from "@/components/Header";
import ImageSelector from "@/components/ImagenSelector";

/* ── Tipo de datos del perfil ──────────────────────────────────────────────
   Cuando conectes la BD, reemplaza el useState por una llamada a tu API
   y mapea la respuesta a esta misma interfaz.
────────────────────────────────────────────────────────────────────────── */
interface PerfilData {
  nombre: string;
  rol: string;
  programa: string;
  tipoDocumento: string;
  numeroDocumento: string;
  tipoSangre: string;
  correo: string;
  centroFormacion: string;
  fechaIngreso: string;
  regional: string;
  sede: string;
  validoHasta: string;
}

/* Valores por defecto — reemplazar con datos reales de la API */
const PERFIL_DEFAULT: PerfilData = {
  nombre: "Nombres Apellidos",
  rol: "Rol",
  programa: "Programa de Formación",
  tipoDocumento: "Tipo de documento",
  numeroDocumento: "N° de documento",
  tipoSangre: "Tipo de sangre",
  correo: "Correo electrónico",
  centroFormacion: "Centro de formación",
  fechaIngreso: "Fecha de ingreso",
  regional: "Regional",
  sede: "Sede",
  validoHasta: "DD/MM/AAAA",
};

export default function ProfileScreen() {
  // TODO: reemplazar por fetch a la API cuando esté disponible
  const [perfil] = useState<PerfilData>(PERFIL_DEFAULT);

  /* Campos dinámicos del carnet */
  const CAMPOS = [
    {
      icon: "card-outline" as const,
      label: "Tipo y N° De documento",
      value: `${perfil.tipoDocumento} ${perfil.numeroDocumento}`,
    },
    {
      icon: "water-outline" as const,
      label: "Tipo de sangre",
      value: perfil.tipoSangre,
    },
    {
      icon: "mail-outline" as const,
      label: "Correo Electrónico",
      value: perfil.correo,
    },
    {
      icon: "business-outline" as const,
      label: "Centro de formación",
      value: perfil.centroFormacion,
    },
    {
      icon: "calendar-outline" as const,
      label: "Fecha de Ingreso",
      value: perfil.fechaIngreso,
    },
  ];

  return (
    <View className="flex-1 bg-[#E2EDED]">

      {/* HEADER */}
      <Header 
      title="Mi Perfil" 
      subtitle="Carnet Institucional" 
      bottomRadius={30} 
      paddingBottom={80}
      />

      {/* SCROLL */}
      <ScrollView
        className="flex-1 -mt-[55]"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >

        {/* TARJETA */}
        <View style={css.perfil.cardShadow}>
          <View style={css.perfil.cardInner}>

            {/* Cabecera blanca — logo SENA */}
            <View style={css.perfil.cardHeaderGradient}>
              <View className="bg-white px-5 pt-5 pb-3 flex-row items-center">
                <Image
                  source={require("../img/sena.png")}
                  style={css.perfil.senaLogo}
                  resizeMode="contain"
                />
                <Text className="ml-2.5 text-[15] text-black font-semibold leading-5">
                  Servicio Nacional de{"\n"}Aprendizaje
                </Text>
              </View>
            </View>

            {/* Avatar */}
            <View style={css.perfil.avatarWrapper}>
              <View style={css.perfil.avatarRingOuter}>
                <View style={css.perfil.avatarRingInner}>
                  <ImageSelector showCameraIcon={false} showShadow={false} />
                </View>
              </View>
            </View>

            {/* DATOS PERSONALES */}
            <View className="px-6 pt-3 pb-2 items-center">

              {/* Nombre */}
              <Text className="text-xl font-bold text-center text-black leading-8">
                {perfil.nombre}
              </Text>

              {/* Rol con gradiente SVG */}
              <Svg width={200} height={30} style={css.perfil.rolSvg}>
                <Defs>
                  <SvgGradient id="rolGrad" x1="0" y1="0" x2="1" y2="0">
                    <Stop offset="0" stopColor="#3ADBB8" />
                    <Stop offset="1" stopColor="#47C5DE" />
                  </SvgGradient>
                </Defs>
                <SvgText
                  fill="url(#rolGrad)"
                  fontSize={17}
                  fontWeight="bold"
                  x="100"
                  y="22"
                  textAnchor="middle"
                >
                  {perfil.rol}
                </SvgText>
              </Svg>

              {/* Programa */}
              <Text className="text-[13] text-center text-black mt-1 leading-5">
                {perfil.programa}
              </Text>

              {/* Separador */}
              <View className="w-full h-px bg-[#d5d3d3] my-4" />

              {/* Campos */}
              {CAMPOS.map((campo, i) => (
                <View key={i} className="flex-row items-start w-full mb-4">
                  <View style={css.perfil.iconCircle}>
                    <Ionicons name={campo.icon} size={20} color="#3ADBB8" />
                  </View>
                  <View className="flex-1 justify-center">
                    <Text className="text-[11] text-grey-text">
                      {campo.label}
                    </Text>
                    <Text className="text-[14] font-bold text-black mt-0.5">
                      {campo.value}
                    </Text>
                  </View>
                </View>
              ))}

            </View>

            {/* SECCIÓN QR */}
            <View className="px-4 pb-5 pt-1">
              <LinearGradient
                colors={["#4ECFDA", "#3ADBB8"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={css.perfil.qrCard}
              >
                <Image
                  source={require("../img/qr.png")}
                  style={css.perfil.qrImage}
                />
                <View className="ml-4 flex-1">
                  <Text className="text-white text-[12] opacity-80">
                    {perfil.regional}
                  </Text>
                  <Text className="text-white text-[15] font-bold mt-0.5">
                    {perfil.sede}
                  </Text>
                  <Text className="text-white text-[12] opacity-80 mt-1">
                    Válido hasta: {perfil.validoHasta}
                  </Text>
                </View>
              </LinearGradient>
            </View>

          </View>
        </View>

        {/* BOTÓN EDITAR PERFIL */}
        <View className="items-center mt-[-10]">
          <Button
            text="Editar Perfil"
            onPress={() => router.push("/editarPerfil")}
            size="sm"
          />
        </View>

      </ScrollView>
    </View>
  );
}
