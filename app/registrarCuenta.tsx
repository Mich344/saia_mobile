import { Link, router } from "expo-router";
import { View, Image, ScrollView, Text } from "react-native";

import ColorGrandient from "@/components/GradientP";
import Container from "@/components/Container";
import Modalcomponent from "@/components/Modal";
import Back from "@/components/molecules/Back";
import themeModal from "@/atoms/MensajeModal";

import { useRegistroForm } from "@/hooks/registro_Validacion_Cuenta";
import Paso1Informacion from "@/components/Register_Form/Paso1_Registro_Cuenta";
import Paso2Contacto from "@/components/Register_Form/Paso2_Registro_Cuenta";
import Paso3Contraseña from "@/components/Register_Form/Paso3_Registro_Cuenta";

export default function RegistrarCuenta() {
  const {
    paso,
    formulario,
    error,
    modalMsg,
    setModalMsg,
    cumple8,
    cumpleMayuscula,
    cumpleNumero,
    cumpleEspecial,
    coincide,
    actualizarFormulario,
    siguientePaso,
    anteriorPaso,
    enviarRegistro,
  } = useRegistroForm();

  return (
    <Container>
      {modalMsg && (
        <Modalcomponent
          titulo={modalMsg.titulo}
          descripcion={modalMsg.descripcion}
          textButton={modalMsg.textButton}
          visible={true}
          onClose={() => {
            if (modalMsg === themeModal.usuarioExitoso) {
              router.replace({
                pathname: "/",
                params: {
                  num_doc: formulario.num_doc,
                  tip_doc: formulario.tip_doc,
                },
              });
            } else {
              setModalMsg(null);
            }
          }}
          imagen={modalMsg.imagen}
        />
      )}

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="pt-5">
          <Link href="/">
            <Back title="Registrar Cuenta" subtitle="Crear cuenta en SAIA" onPress={() => router.back()}  />
          </Link>
        </View>

        <View className="items-center mt-2">
          <Image
            className="w-[130px] h-[140px]"
            source={require("@/img/logo_SAIA.png")}
          />
          <ColorGrandient text="REGISTRAR CUENTA" fontWeight="bold" fontSize={27} />
          <Text className="text-gray-500 text-center mt-3 px-10">
            Completa la información para crear tu cuenta de aprendiz.
          </Text>
        </View>

        <View className="px-6 mt-8">
          <View className="flex-row justify-between items-center">
            <Text className="text-slate-700 font-bold text-lg">Paso {paso} de 3</Text>
            <Text className="text-blue-600 font-semibold">
              {paso === 1 ? "Información" : paso === 2 ? "Contacto" : "Seguridad"}
            </Text>
          </View>

          <View className="bg-gray-200 h-3 rounded-full mt-4 overflow-hidden">
            <View
              className={`bg-blue-600 h-full rounded-full ${
                paso === 1 ? "w-1/3" : paso === 2 ? "w-2/3" : "w-full"
              }`}
            />
          </View>
        </View>

        <View className="bg-white mx-5 mt-5 p-1">
          {paso === 1 && (
            <Paso1Informacion
              formulario={formulario}
              error={error}
              onChange={actualizarFormulario}
              onNext={siguientePaso}
            />
          )}

          {paso === 2 && (
            <Paso2Contacto
              formulario={formulario}
              error={error}
              onChange={actualizarFormulario}
              onNext={siguientePaso}
              onBack={anteriorPaso}
            />
          )}

          {paso === 3 && (
            <Paso3Contraseña
              formulario={formulario}
              cumple8={cumple8}
              cumpleMayuscula={cumpleMayuscula}
              cumpleNumero={cumpleNumero}
              cumpleEspecial={cumpleEspecial}
              coincide={coincide}
              onChange={actualizarFormulario}
              onSubmit={enviarRegistro}
              onBack={anteriorPaso}
            />
          )}
        </View>
      </ScrollView>
    </Container>
  );
}