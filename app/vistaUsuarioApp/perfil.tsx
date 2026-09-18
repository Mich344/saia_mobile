import { useState, useEffect, useCallback } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import Svg, {
  Defs,
  LinearGradient as SvgGradient,
  Stop,
  Text as SvgText,
} from "react-native-svg";

import css from "@/styles/StylesComponent";

import Button from "@/components/Button";
import Container from "@/components/Container";
import ImageSelector from "@/components/ImagenSelector";
import Back from "@/components/molecules/Back";

import Perfil from "@/sql/Perfil";
import { emitiCambioFoto } from "@/hooks/utils/eventos";

export default function ProfileScreen() {
  const [perfil, setPerfil] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const cargarPerfil = async () => {
    try {
      const respuesta = await Perfil();

      if (respuesta.ok) {
        setPerfil(respuesta.data);
        // Notifica a otros componentes (CustomHeader, CustomDrawer) que la foto/perfil cambió
        emitiCambioFoto();
      } else {
        alert(respuesta.data?.mensaje || "No se pudo cargar el perfil");
      }
    } catch (error) {
      console.log("Error cargando perfil:", error);
      alert("No se pudo cargar la información del perfil");
    } finally {
      setLoading(false);
    }
  };

  // Carga inicial
  useEffect(() => {
    cargarPerfil();
  }, []);

  // REFRESCAR EN VIVO CADA VEZ QUE LA PANTALLA RECIBE EL FOCO (ej: al volver de Editar Perfil)
  useFocusEffect(
    useCallback(() => {
      cargarPerfil();
    }, [])
  );

  if (loading) {
    return (
      <Container>
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500 text-[15px]">Cargando perfil...</Text>
        </View>
      </Container>
    );
  }

  if (!perfil) {
    return (
      <Container>
        <View className="flex-1 items-center justify-center px-8">
          <Ionicons name="person-circle-outline" size={70} color="#B8B8B8" />

          <Text className="text-[18px] font-bold text-gray-700 mt-4 text-center">
            No se pudo cargar el perfil
          </Text>

          <Text className="text-gray-500 text-center mt-2">
            Intenta nuevamente más tarde.
          </Text>
        </View>
      </Container>
    );
  }

  const persona = perfil.persona;
  const academico = perfil.academico;

  const CAMPOS = [
    {
      icon: "water-outline" as const,
      label: "Tipo de sangre",
      value: persona.tip_sang || "No registrado",
    },

    {
      icon: "mail-outline" as const,
      label: "Correo electrónico",
      value: persona.email || "No registrado",
    },

    {
      icon: "call-outline" as const,
      label: "Teléfono",
      value: persona.tel || "No registrado",
    },

    {
      icon: "card-outline" as const,
      label: "Documento",
      value: persona.num_doc || "No registrado",
    },
  ];

  return (
    <Container>
      <Back
        className=""
        onPress={() => router.back()}
        title="Perfil Institucional"
        subtitle="Tu información académica y personal"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
      >
        {/* ===================================================== */}
        {/* ENCABEZADO DEL PERFIL */}
        {/* ===================================================== */}

        <View style={css.perfil.cardShadow} className="bg-white rounded-[24px]">
          <View style={css.perfil.cardInner}>
            {/* FOTO CON REFRESH DE CACHÉ */}
            <View className="items-center pt-5">
              <View style={css.perfil.avatarWrapper}>
                <View style={css.perfil.avatarRingOuter}>
                  <View style={css.perfil.avatarRingInner}>
                    <ImageSelector
                      image={
                        persona.imagen
                          ? `${persona.imagen}?timestamp=${new Date().getTime()}`
                          : null
                      }
                      showCameraIcon={false}
                      showShadow={false}
                    />
                  </View>
                </View>
              </View>
            </View>

            {/* NOMBRE */}
            <View className="items-center px-5 pt-4">
              <Text className="text-[19px] font-WorkSansExtraBold text-[#172033] text-center">
                {persona.nombres} {persona.p_ape}
              </Text>

              {/* ROL */}
              <Svg width={180} height={32} className="mt-1">
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
                  x="90"
                  y="22"
                  textAnchor="middle"
                >
                  S.A.I.A
                </SvgText>
              </Svg>
            </View>

            {/* ================================================= */}
            {/* DATOS PRINCIPALES */}
            {/* ================================================= */}

            <View className="px-5 pt-3 pb-5">
              <View className="w-full h-px bg-gray-200 mb-5" />

              <View className="flex-row items-center mb-4">
                <View className="w-9 h-9 rounded-full bg-[#E9FBF7] items-center justify-center">
                  <Ionicons name="person-outline" size={19} color="#20BFA8" />
                </View>

                <View className="ml-3">
                  <Text className="font-WorkSansExtraBold text-[19px] text-[#172033]">
                    Datos principales
                  </Text>

                  <Text className="text-[11px] text-gray-500 mt-0.5">
                    Información personal registrada
                  </Text>
                </View>
              </View>

              {/* CAMPOS */}
              <View className="flex-row flex-wrap justify-between">
                {CAMPOS.map((campo, i) => (
                  <View
                    key={i}
                    className="w-[48%] bg-[#F8FAFC] border border-[#EEF1F4] rounded-[16px] p-3 mb-3"
                  >
                    <View className="flex-row items-center">
                      <View className="w-8 h-8 rounded-full bg-[#E9FBF7] items-center justify-center">
                        <Ionicons name={campo.icon} size={17} color="#3ADBB8" />
                      </View>

                      <Text
                        className="text-[10px] text-gray-500 ml-2 flex-1"
                        numberOfLines={1}
                      >
                        {campo.label}
                      </Text>
                    </View>

                    <Text
                      className="font-bold text-[13px] text-[#172033] mt-3"
                      numberOfLines={2}
                    >
                      {campo.value}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* ================================================= */}
            {/* INFORMACIÓN ACADÉMICA */}
            {/* ================================================= */}

            <View className="px-5 pb-5">
              <View className="w-full h-px bg-gray-200 mb-5" />

              <View className="flex-row items-center mb-4">
                <View className="w-9 h-9 rounded-full bg-[#E9FBF7] items-center justify-center">
                  <Ionicons name="school-outline" size={20} color="#20BFA8" />
                </View>

                <View className="ml-3">
                  <Text className="font-WorkSansExtraBold text-[19px] text-[#172033]">
                    Información académica
                  </Text>

                  <Text className="text-[11px] text-gray-500 mt-0.5">
                    Información de tu formación SENA
                  </Text>
                </View>
              </View>

              {academico.registrado ? (
                <View className="bg-[#F8FAFC] rounded-[18px] border border-[#E8EDF1] overflow-hidden">
                  {/* PROGRAMA */}
                  <View className="bg-[#EFFBF8] px-4 py-4">
                    <Text className="text-[10px] text-[#5D7773] uppercase font-bold">
                      Programa de formación
                    </Text>

                    <Text className="text-[16px] font-bold text-[#172033] mt-1">
                      {academico.programa}
                    </Text>
                  </View>

                  {/* DATOS */}
                  <View className="px-4 py-4">
                    {/* TIPO */}
                    <View className="flex-row items-start mb-4">
                      <Ionicons name="book-outline" size={19} color="#20BFA8" />

                      <View className="ml-3 flex-1">
                        <Text className="text-[10px] text-gray-500">
                          Tipo de formación
                        </Text>

                        <Text className="font-semibold text-[14px] text-[#172033] mt-1">
                          {academico.tipo}
                        </Text>
                      </View>
                    </View>

                    {/* CENTRO */}
                    <View className="flex-row items-start mb-4">
                      <Ionicons
                        name="business-outline"
                        size={19}
                        color="#20BFA8"
                      />

                      <View className="ml-3 flex-1">
                        <Text className="text-[10px] text-gray-500">
                          Centro de formación
                        </Text>

                        <Text className="font-semibold text-[14px] text-[#172033] mt-1">
                          {academico.centro}
                        </Text>
                      </View>
                    </View>

                    {/* FICHA + ESTADO */}
                    <View className="flex-row">
                      <View className="flex-1">
                        <Text className="text-[10px] text-gray-500">Ficha</Text>

                        <Text className="font-bold text-[15px] text-[#172033] mt-1">
                          {academico.ficha}
                        </Text>
                      </View>

                      <View className="flex-1">
                        <Text className="text-[10px] text-gray-500">
                          Estado
                        </Text>

                        <View
                          className={`self-start rounded-full px-3 py-1 mt-1 ${
                            academico.estado === 1
                              ? "bg-[#DCF8E2]"
                              : "bg-[#FFF1DD]"
                          }`}
                        >
                          <Text
                            className={`text-[11px] font-bold ${
                              academico.estado === 1
                                ? "text-[#35A94A]"
                                : "text-[#E58A00]"
                            }`}
                          >
                            {academico.estado === 1
                              ? "Aprendiz activo"
                              : "Aprendiz inactivo"}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              ) : (
                <View className="bg-[#FFF8E8] border border-[#F6D48A] rounded-[18px] p-5">
                  <View className="flex-row items-center">
                    <View className="w-10 h-10 rounded-full bg-[#FFF0C7] items-center justify-center">
                      <Ionicons
                        name="warning-outline"
                        size={22}
                        color="#F59E0B"
                      />
                    </View>

                    <Text className="ml-3 font-bold text-[15px] text-[#A16207] flex-1">
                      Sin formación registrada
                    </Text>
                  </View>

                  <Text className="text-[#A16207] text-[13px] mt-3 leading-5">
                    Este usuario no registra actualmente una formación activa en
                    el SENA.
                  </Text>
                </View>
              )}
            </View>

            {/* ================================================= */}
            {/* TARJETA QR / RESUMEN ACADÉMICO */}
            {/* ================================================= */}

            <View className="px-5 pb-5">
              <View className="bg-[#45CFD3] rounded-[20px] overflow-hidden">
                <View className="flex-row items-center px-3 py-3">
                  {/* QR */}
                  <View className="bg-white p-2 rounded-[10px]">
                    <Image
                      source={require("@/img/qr.png")}
                      style={{
                        width: 68,
                        height: 68,
                      }}
                      resizeMode="contain"
                    />
                  </View>

                  {/* SEPARADOR */}
                  <View className="w-px h-[70px] bg-white/40 mx-4" />

                  {/* INFORMACIÓN */}
                  <View className="flex-1">
                    <View className="flex-row items-center">
                      <Ionicons name="school-outline" size={15} color="white" />

                      <Text className="text-white text-[11px] ml-1">
                        Formación
                      </Text>
                    </View>

                    <Text
                      className="text-white font-bold text-[13px] mt-1"
                      numberOfLines={2}
                    >
                      {academico.registrado
                        ? academico.programa
                        : "Sin programa"}
                    </Text>

                    <Text className="text-white/90 text-[11px] mt-2">
                      {academico.registrado
                        ? `Ficha ${academico.ficha}`
                        : "No registra ficha"}
                    </Text>
                  </View>
                </View>

                {/* CENTRO */}
                <View className="border-t border-white/20 px-4 py-3">
                  <View className="flex-row items-center">
                    <Ionicons name="location-outline" size={15} color="white" />

                    <Text className="text-white text-[11px] ml-2">
                      {academico.registrado
                        ? academico.centro
                        : "Sin centro de formación"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* ===================================================== */}
        {/* BOTÓN EDITAR */}
        {/* ===================================================== */}

        <View className="items-center mt-4">
          <Button
            text="Editar Perfil"
            size="sm"
            onPress={() => router.push("./editarPerfil")}
          />
        </View>
      </ScrollView>
    </Container>
  );
}