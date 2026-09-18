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

interface FAQItem {
  id: number;
  pregunta: string;
  respuesta: string;
  icono: keyof typeof Ionicons.glyphMap;
}

export default function AyudaScreen() {
  const [expandido, setExpandido] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      id: 1,
      pregunta: "¿Qué hago si el código QR no escanea?",
      respuesta:
        "Asegúrate de que la pantalla del usuario tenga el brillo al máximo y no tenga reflejos directos de luz. También verifica que la cámara del dispositivo esté limpia.",
      icono: "qr-code-outline",
    },
    {
      id: 2,
      pregunta: "¿Cómo registrar un ingreso si el sistema falla?",
      respuesta:
        "Si la lectura por QR o la red no responden, comunícate de inmediato con la central o la administración para verificar el estado de la plataforma antes de autorizar el paso manual.",
      icono: "warning-outline",
    },
    {
      id: 3,
      pregunta: "¿Qué hago si mi turno termina y la app no responde?",
      respuesta:
        "Verifica tu conexión a internet (Wi-Fi o Datos). Si el problema persiste, realiza el cierre de turno físico en la bitácora y notifica al guarda entrante.",
      icono: "time-outline",
    },
    {
      id: 4,
      pregunta: "¿Cómo reporto una novedad de un aprendiz?",
      respuesta:
        "Los reportes se hacen unicamente en el proceso de registro de ingreso. Si ocurre una novedad después de este proceso, comunícate con la central para que te indiquen el procedimiento a seguir.",
      icono: "refresh-outline",
    },
  ];

  const toggleFAQ = (id: number) => {
    setExpandido(expandido === id ? null : id);
  };

  const hacerLlamada = (numero: string) => {
    Linking.openURL(`tel:${numero}`).catch(() => {
      Alert.alert(
        "Error",
        "No se pudo realizar la llamada desde este dispositivo.",
      );
    });
  };

  const abrirWhatsApp = (numero: string) => {
    const mensaje = encodeURIComponent(
      "Hola, necesito asistencia técnica con el sistema SAIA.",
    );
    Linking.openURL(`https://wa.me/${numero}?text=${mensaje}`).catch(() => {
      Alert.alert("Error", "No se pudo abrir WhatsApp.");
    });
  };

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* ENCABEZADO DE PANTALLA */}
        <View className="flex-row items-center justify-between mt-2 mb-6">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 rounded-2xl bg-gray-100 items-center justify-center active:bg-gray-200"
          >
            <Ionicons name="arrow-back" size={20} color="#1E293B" />
          </Pressable>

          <Text className="text-[18px] font-bold text-slate-800">
            Centro de Ayuda
          </Text>

          <View className="w-10" />
        </View>

        {/* TARJETA DE SOPORTE DIRECTO */}
        <View className="bg-emerald-700 rounded-3xl p-5 mb-6 shadow-md shadow-emerald-900/20">
          <View className="flex-row items-center mb-3">
            <View className="w-10 h-10 rounded-2xl bg-white/10 items-center justify-center border border-white/20">
              <Ionicons name="headset" size={22} color="#FFFFFF" />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-white font-extrabold text-[16px]">
                Soporte en Vivo
              </Text>
              <Text className="text-emerald-100 text-[11px] mt-0.5">
                Atención rápida para novedades del servicio
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between mt-3 gap-2">
            <Pressable
              onPress={() => hacerLlamada("+573122288971")}
              className="flex-1 bg-white py-3 rounded-2xl flex-row items-center justify-center active:bg-emerald-50"
            >
              <Ionicons name="call-outline" size={16} color="#047857" />
              <Text className="text-emerald-800 font-bold text-[12px] ml-2">
                Llamar Central
              </Text>
            </Pressable>

            <Pressable
              onPress={() => abrirWhatsApp("+573122288971")}
              className="flex-1 bg-emerald-800 py-3 rounded-2xl flex-row items-center justify-center border border-emerald-600 active:bg-emerald-900"
            >
              <Ionicons name="logo-whatsapp" size={16} color="#2ECDB1" />
              <Text className="text-white font-bold text-[12px] ml-2">
                WhatsApp
              </Text>
            </Pressable>
          </View>
        </View>

        {/* GUÍA DE PREGUNTAS FRECUENTES */}
        <Text className="text-[16px] font-bold text-slate-800 mb-3 px-1">
          Preguntas Frecuentes
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
                    <View className="w-8 h-8 rounded-xl bg-slate-100 items-center justify-center mr-3">
                      <Ionicons name={faq.icono} size={18} color="#16A878" />
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

        {/* PIE DE PANTALLA CON INFORMACIÓN DEL SISTEMA */}
        <View className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60 items-center">
          <Ionicons name="shield-checkmark-outline" size={24} color="#94A3B8" />
          <Text className="text-slate-700 font-bold text-[12px] mt-1">
            Control de Acceso SAIA
          </Text>
          <Text className="text-slate-400 text-[10px] mt-0.5">
            Versión 1.0.0 • Asistencia y Seguridad
          </Text>
        </View>
      </ScrollView>
    </Container>
  );
}
