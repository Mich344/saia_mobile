import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Linking,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import Container from "@/components/Container";
import Back from "@/components/molecules/Back";

interface FAQItem {
  id: number;
  pregunta: string;
  respuesta: string;
  icono: keyof typeof Ionicons.glyphMap;
}

export default function AyudaAprendizScreen() {
  const [expandido, setExpandido] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      id: 1,
      pregunta: "¿Cómo presento mi código QR para ingresar?",
      respuesta:
        "Accede a la pantalla de 'Mi QR' o 'Carnet Digital' en la app y preséntalo frente al lector del guarda en la portería. Asegúrate de tener el brillo de tu pantalla alto para facilitar la lectura.",
      icono: "qr-code-outline",
    },
    {
      id: 2,
      pregunta: "¿Qué hago si mi código QR no funciona o expiró?",
      respuesta:
        "Reinicia tu sesión desde la app o verifica que tu sesión esté activa. Si el inconveniente persiste, preséntate con tu documento de identidad físico ante el guarda de seguridad.",
      icono: "refresh-circle-outline",
    },
    {
      id: 3,
      pregunta: "¿Cómo registro mi computador portátil o elementos?",
      respuesta:
        "Ingresa al módulo de 'Mis Insumos' y registra la marca, modelo y serial de tu dispositivo antes de ingresar al centro. Al salir, el guarda verificará que el serial coincida.",
      icono: "laptop-outline",
    },
    {
      id: 4,
      pregunta: "¿Puedo actualizar mis datos?",
      respuesta:
        "Los datos actualizados son solo por parte de nuestro sistema. Si necesitas cambiar información personal, comunícate con la coordinación de tu programa o con el área de bienestar institucional.",
      icono: "person-circle-outline",
    },
    {
      id: 5,
      pregunta: "¿Que puedo hacer si pierdo mi equipo?",
      respuesta:
        "Reporta la pérdida en la portería principal para verificar si el equipo está registrado en el ingreso para dar un reporte sobre lo sucedido.",
      icono: "card-outline",
    },
  ];

  const toggleFAQ = (id: number) => {
    setExpandido(expandido === id ? null : id);
  };

  const contactarCoordinacion = (numero: string) => {
    Linking.openURL(`tel:${numero}`).catch(() => {
      Alert.alert(
        "Error",
        "No se pudo realizar la llamada desde este dispositivo.",
      );
    });
  };

  const enviarCorreoSoporte = (email: string) => {
    const asunto = encodeURIComponent("Soporte SAIA - Aprendiz SENA");
    Linking.openURL(`mailto:${email}?subject=${asunto}`).catch(() => {
      Alert.alert("Error", "No se pudo abrir la aplicación de correo.");
    });
  };

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* ENCABEZADO DE PANTALLA */}
       <Back subtitle="Dudas sobre SAIA" title="Soporte - Ayuda" className="mb-10" onPress={() => router.back()} />

        {/* BANNER DE SOPORTE INSTITUCIONAL / BIENESTAR */}
        <View className="bg-emerald-600 rounded-3xl p-5 mb-6 shadow-md shadow-emerald-900/20">
          <View className="flex-row items-center mb-3">
            <View className="w-10 h-10 rounded-2xl bg-white/10 items-center justify-center border border-white/20">
              <Ionicons name="school-outline" size={22} color="#FFFFFF" />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-white font-extrabold text-[16px]">
                ¿Necesitas ayuda con tu acceso?
              </Text>
              <Text className="text-emerald-100 text-[11px] mt-0.5">
                Atención a inquietudes sobre carnetización e ingreso
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between mt-3 gap-2">
            <Pressable
              onPress={() => contactarCoordinacion("+573122288971")}
              className="flex-1 bg-white py-3 rounded-2xl flex-row items-center justify-center active:bg-emerald-50"
            >
              <Ionicons name="call-outline" size={16} color="#059669" />
              <Text className="text-emerald-800 font-bold text-[12px] ml-2">
                Telefonico
              </Text>
            </Pressable>

            <Pressable
              onPress={() => enviarCorreoSoporte("saiaoficial03@gmail.com")}
              className="flex-1 bg-emerald-800 py-3 rounded-2xl flex-row items-center justify-center border border-emerald-500 active:bg-emerald-900"
            >
              <Ionicons name="mail-outline" size={16} color="#34D399" />
              <Text className="text-white font-bold text-[12px] ml-2">
                Enviar Correo
              </Text>
            </Pressable>
          </View>
        </View>

        {/* SECCIÓN PREGUNTAS FRECUENTES DEL APRENDIZ */}
        <Text className="text-[16px] font-bold text-slate-800 mb-3 px-1">
          Dudas Frecuentes
        </Text>

        <View className="space-y-3 mb-6">
          {faqs.map((faq) => {
            const isOpen = expandido === faq.id;

            return (
              <Pressable
                key={faq.id}
                onPress={() => toggleFAQ(faq.id)}
                className={`bg-white rounded-2xl p-4 border transition-all ${
                  isOpen
                    ? "border-emerald-200 bg-emerald-50/20"
                    : "border-slate-100"
                }`}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1 pr-3">
                    <View className="w-8 h-8 rounded-xl bg-emerald-50 items-center justify-center mr-3">
                      <Ionicons name={faq.icono} size={18} color="#059669" />
                    </View>

                    <Text className="text-[13px] font-bold text-slate-800 flex-1">
                      {faq.pregunta}
                    </Text>
                  </View>

                  <Ionicons
                    name={isOpen ? "chevron-up" : "chevron-down"}
                    size={18}
                    color="#64748B"
                  />
                </View>

                {isOpen && (
                  <View className="mt-3 pt-3 border-t border-slate-100">
                    <Text className="text-slate-600 text-[12px] leading-5">
                      {faq.respuesta}
                    </Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>

        {/* PIE DE PANTALLA */}
        <View className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60 items-center">
          <Ionicons name="shield-checkmark-outline" size={24} color="#10B981" />
          <Text className="text-slate-700 font-bold text-[12px] mt-1">
            Sistema de Autogestion de Ingreso y Acceso  
          </Text>
          <Text className="text-slate-400 text-[10px] mt-0.5">
           SAIA
          </Text>
        </View>
      </ScrollView>
    </Container>
  );
}
