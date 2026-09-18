import React from "react";
import { View, ScrollView, Modal, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import Container from "@/components/Container";
import Button from "@/components/Button";
import Back from "@/components/molecules/Back";

import { useEditarPerfilState } from "@/hooks/editar_Perfil";
import { SeccionFoto } from "@/components/Editar_Perfil/Foto";
import { SeccionDatosFijos } from "@/components/Editar_Perfil/Datos_Perfil_Disabled";
import { SeccionDatosEditables } from "@/components/Editar_Perfil/Datos_Perfil_Editable";
import { SeccionSeguridad } from "@/components/Editar_Perfil/Password_Section";

export default function EditarPerfil() {
  const {
    imagen,
    setImagen,
    imagenActual,
    nombre,
    documento,
    numDoc,
    sangre,
    correo,
    setCorreo,
    celular,
    setCelular,
    genero,
    setGenero,
    obtenerUrlImagen,
    editar,
    modalAlerta,
    cerrarAlerta,
    cargando,
  } = useEditarPerfilState();

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 35 }}
      >
        <Back
          className="mb-5"
          onPress={() => router.replace("/vistaUsuarioApp/perfil")}
          title="Editar Perfil"
          subtitle="Actualiza tu información personal"
        />

        <View className="bg-white rounded-[24px] border border-[#E7ECEF] p-5">
          <SeccionFoto
            imagen={imagen}
            imagenActual={imagenActual}
            nombre={nombre}
            obtenerUrlImagen={obtenerUrlImagen}
            onImageSelected={setImagen}
          />

          <SeccionDatosFijos
            nombre={nombre}
            documento={documento}
            numDoc={numDoc}
            sangre={sangre}
          />

          <SeccionDatosEditables
            correo={correo}
            setCorreo={setCorreo}
            celular={celular}
            setCelular={setCelular}
            genero={genero}
            setGenero={setGenero}
          />

          <SeccionSeguridad />

          <View className="items-center mt-6">
            <Button
              text={cargando ? "Actualizando..." : "Actualizar perfil"}
              onPress={editar}
              disabled={cargando}
            />
          </View>
        </View>
      </ScrollView>

      {/* MODAL DE ALERTA PERSONALIZADO */}
      <Modal
        visible={modalAlerta.visible}
        transparent
        animationType="fade"
        onRequestClose={cerrarAlerta}
      >
        <View className="flex-1 bg-black/50 justify-center px-5">
          <View className="bg-white rounded-3xl p-6 items-center shadow-lg">
            <View
              className={`w-16 h-16 rounded-full items-center justify-center mb-4 ${
                modalAlerta.tipo === "exito"
                  ? "bg-emerald-100"
                  : modalAlerta.tipo === "error"
                  ? "bg-red-100"
                  : modalAlerta.tipo === "advertencia"
                  ? "bg-amber-100"
                  : "bg-blue-100"
              }`}
            >
              <Ionicons
                name={
                  modalAlerta.tipo === "exito"
                    ? "checkmark-circle-outline"
                    : modalAlerta.tipo === "error"
                    ? "alert-circle-outline"
                    : modalAlerta.tipo === "advertencia"
                    ? "warning-outline"
                    : "information-circle-outline"
                }
                size={34}
                color={
                  modalAlerta.tipo === "exito"
                    ? "#00BF63"
                    : modalAlerta.tipo === "error"
                    ? "#DC2626"
                    : modalAlerta.tipo === "advertencia"
                    ? "#D97706"
                    : "#3B82F6"
                }
              />
            </View>

            <Text className="text-gray-900 text-xl font-bold text-center">
              {modalAlerta.titulo}
            </Text>

            <Text className="text-gray-500 text-sm text-center mt-3 leading-5">
              {modalAlerta.mensaje}
            </Text>

            <Pressable
              className="w-full bg-gray-900 rounded-2xl py-4 items-center mt-6 active:opacity-90"
              onPress={cerrarAlerta}
            >
              <Text className="text-white font-bold text-base">Aceptar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </Container>
  );
}