// LIBRERIAS //
import { View, Image, Text, Pressable } from "react-native";
import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  ZoomIn,
  SlideInDown,
  withRepeat,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

// COMPONENTES //
import Input from "@/components/inputs/Input";
import ColorGrandient from "@/components/GradientP";
import Container from "@/components/Container";
import Button from "@/components/Button";
import InputPass from "@/components/inputs/InputPassword";
import InputOpcion from "@/components/inputs/InputOption";
import Modalcomponent from "@/components/Modal";
import socket from "@/sql/socket";

// SQL //
import iniciarSesion from "@/sql/Login";

const LandingPage = () => {
  const { num_doc, tip_doc } = useLocalSearchParams();

  const [error, setError] = useState(false);
  const [modal, setModal] = useState(false);

  // Agregamos propiedades para el icono dinámico en Ionicons
  const [mensajeModal, setMensajeModal] = useState<{
    titulo: string;
    descripcion: string;
    textButton: string;
    iconName: keyof typeof Ionicons.glyphMap;
    iconColor: string;
  }>({
    titulo: "",
    descripcion: "",
    textButton: "Continuar",
    iconName: "alert-circle-outline",
    iconColor: "#EAB308",
  });

  const [formulario, setFormulario] = useState({
    num_doc: (num_doc as string) || "",
    tip_doc: (tip_doc as string) || "",
    password: "",
  });

  // ANIMACIÓN DECORATIVA
  const floating = useSharedValue(0);
  floating.value = withRepeat(
    withTiming(1, { duration: 3500 }),
    -1,
    true
  );

  const floatingStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floating.value * 8 }],
  }));

  // LOGIN Y VALIDACIONES
  const enviar = async () => {
    const { tip_doc, num_doc, password } = formulario;

    // Error 1: Falta SOLO Tipo de Documento
    if (!tip_doc && num_doc && password) {
      setError(true);
      setMensajeModal({
        titulo: "Tipo de documento requerido",
        descripcion: "Por favor selecciona tu tipo de documento para continuar.",
        textButton: "Seleccionar",
        iconName: "card-outline",
        iconColor: "#F59E0B", // Ámbar / Advertencia
      });
      setModal(true);
      return;
    }

    // Error 2: Falta SOLO Número de Documento
    if (tip_doc && !num_doc && password) {
      setError(true);
      setMensajeModal({
        titulo: "Número de documento requerido",
        descripcion: "Por favor ingresa tu número de documento para continuar.",
        textButton: "Ingresar número",
        iconName: "id-card-outline",
        iconColor: "#F59E0B",
      });
      setModal(true);
      return;
    }

    // Error 3: Falta SOLO Contraseña
    if (tip_doc && num_doc && !password) {
      setError(true);
      setMensajeModal({
        titulo: "Contraseña requerida",
        descripcion: "Por favor escribe tu contraseña para poder iniciar sesión.",
        textButton: "Ingresar contraseña",
        iconName: "lock-closed-outline",
        iconColor: "#F59E0B",
      });
      setModal(true);
      return;
    }

    // Error 4: Faltan múltiples o TODOS los campos
    if (!tip_doc || !num_doc || !password) {
      setError(true);
      setMensajeModal({
        titulo: "Campos incompletos",
        descripcion: "Por favor completa todos los datos del formulario para poder ingresar.",
        textButton: "Completar datos",
        iconName: "warning-outline",
        iconColor: "#EF4444", // Rojo / Error grave
      });
      setModal(true);
      return;
    }

    try {
      const respuesta = await iniciarSesion({
        num_doc: formulario.num_doc,
        tip_doc: formulario.tip_doc,
        password: formulario.password,
      });

      // Error 5: Credenciales Incorrectas
      if (!respuesta.ok) {
        setError(true);
        setMensajeModal({
          titulo: "Datos incorrectos",
          descripcion:
            (respuesta as any).data?.message ||
            (respuesta as any).message ||
            "El tipo de documento, número o contraseña no coinciden. Por favor verifica tus datos.",
          textButton: "Reintentar",
          iconName: "close-circle-outline",
          iconColor: "#EF4444",
        });
        setModal(true);
        return;
      }

      await AsyncStorage.setItem("token", respuesta.data.token);
      await AsyncStorage.setItem("usuario", JSON.stringify(respuesta.data.usuario));

      socket.connect();
      socket.emit("registrar_sesion", {
        num_doc: respuesta.data.usuario.num_doc,
        sesion_id: respuesta.data.sesion_id,
      });

      const rol = respuesta.data.usuario.id_rol;

      switch (rol) {
        case 1:
          router.replace("/vistaUsuarioApp/homeUser");
          break;
        case 3:
          router.replace("/vistaGuardaApp/home");
          break;
        default:
          setMensajeModal({
            titulo: "Acceso no autorizado",
            descripcion: "Tu rol de usuario no tiene permisos para ingresar a esta aplicación.",
            textButton: "Entendido",
            iconName: "shield-disclaimer-outline" as any,
            iconColor: "#DC2626",
          });
          setModal(true);
          break;
      }
    } catch (error) {
      setError(true);
      setMensajeModal({
        titulo: "Error de conexión",
        descripcion: "No fue posible conectar con el servidor. Revisa tu conexión a internet.",
        textButton: "Entendido",
        iconName: "wifi-outline",
        iconColor: "#6B7280", // Gris / Problema de red
      });
      setModal(true);
    }
  };

  return (
    <Container>
      {/* FONDO DECORATIVO */}
      <Animated.View
        entering={FadeIn.duration(1000)}
        className="absolute top-[-70px] right-[-60px] w-[180px] h-[180px] rounded-full bg-teal-sena/10"
      />
      <Animated.View
        entering={FadeIn.delay(300).duration(1000)}
        className="absolute top-[260px] left-[-90px] w-[180px] h-[180px] rounded-full bg-teal-sena/5"
      />
      <Animated.View
        entering={FadeIn.delay(500).duration(1000)}
        className="absolute bottom-[-80px] right-[-50px] w-[180px] h-[180px] rounded-full bg-teal-sena/10"
      />

      {/* MODAL CON ICONO DE IONICONS */}
      <Modalcomponent
        titulo={mensajeModal.titulo}
        descripcion={mensajeModal.descripcion}
        textButton={mensajeModal.textButton}
        visible={modal}
        onClose={() => setModal(false)}
        iconName={mensajeModal.iconName}
        iconColor={mensajeModal.iconColor}
      />

      {/* ENCABEZADO */}
      <View className="items-center pt-7">
        <Animated.View
          entering={ZoomIn.duration(700)}
          style={floatingStyle}
          className="items-center justify-center"
        >
          <View className="bg-white rounded-full p-3 shadow-sm">
            <Image
              className="w-[115px] h-[125px] -ml-3"
              resizeMode="contain"
              source={require("@/img/logo_SAIA.png")}
            />
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInUp.delay(350).duration(700)}
          className="items-center mt-2"
        >
          <ColorGrandient
            text="INICIAR SESIÓN"
            fontWeight="bold"
            fontSize={25}
          />
          <Text className="text-gray-500 text-[13px] mt-1 text-center">
            Bienvenido a SAIA
          </Text>
        </Animated.View>
      </View>

      {/* TARJETA LOGIN */}
      <Animated.View
        entering={SlideInDown.delay(450).duration(700)}
        className="bg-white rounded-[28px] px-5 py-6 mt-7"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.08,
          shadowRadius: 15,
          elevation: 5,
        }}
      >
        <Animated.View
          entering={FadeIn.delay(700).duration(500)}
          className="mb-5"
        >
          <Text className="text-gray-800 text-[19px] font-bold">
            Accede a tu cuenta
          </Text>
          <Text className="text-gray-400 text-[12px] mt-1">
            Ingresa tus datos para continuar
          </Text>
        </Animated.View>

        {/* TIPO DOCUMENTO */}
        <Animated.View
          entering={FadeInDown.delay(750).duration(500)}
          className="mb-4"
        >
          <View className="flex-row items-center mb-2 ml-1">
            <Ionicons name="card-outline" size={16} color="#4B5563" />
            <Text className="text-gray-600 text-[12px] font-semibold ml-1.5">
              Tipo de documento
            </Text>
          </View>

          <InputOpcion
            placeholder="Selecciona tu tipo de documento"
            placeholderColor="#ABABAB"
            error={error && !formulario.tip_doc}
            opciones={[
              "Cédula de Ciudadanía",
              "Tarjeta de Identidad",
              "Cédula de Extranjería",
              "Permiso por Protección Temporal",
            ]}
            onSelect={(valor) => {
              setFormulario({ ...formulario, tip_doc: valor });
              setError(false);
            }}
          />
        </Animated.View>

        {/* NÚMERO DOCUMENTO */}
        <Animated.View
          entering={FadeInDown.delay(850).duration(500)}
          className="mb-4"
        >
          <View className="flex-row items-center mb-2 ml-1">
            <Ionicons name="id-card-outline" size={16} color="#4B5563" />
            <Text className="text-gray-600 text-[12px] font-semibold ml-1.5">
              Número de documento
            </Text>
          </View>

          <Input
            placeholder="Ingresa tu número de documento"
            inputMode="numeric"
            keyboardType="numeric"
            error={error && !formulario.num_doc}
            value={formulario.num_doc}
            onChangeText={(texto) => {
              setFormulario({ ...formulario, num_doc: texto.slice(0, 13) });
              setError(false);
            }}
          />
        </Animated.View>

        {/* CONTRASEÑA */}
        <Animated.View entering={FadeInDown.delay(950).duration(500)}>
          <View className="flex-row items-center mb-2 ml-1">
            <Ionicons name="lock-closed-outline" size={16} color="#4B5563" />
            <Text className="text-gray-600 text-[12px] font-semibold ml-1.5">
              Contraseña
            </Text>
          </View>

          <InputPass
            placeholder="Ingresa tu contraseña"
            value={formulario.password}
            error={error && !formulario.password}
            onChangeText={(texto) => {
              setFormulario({ ...formulario, password: texto });
              setError(false);
            }}
          />
        </Animated.View>

        {/* RESTABLECER CONTRASEÑA */}
        <Animated.View
          entering={FadeIn.delay(1050).duration(500)}
          className="items-end mt-3"
        >
          <Pressable
            onPress={() => router.push("/restablecerPass")}
            className="flex-row items-center"
          >
            <Ionicons name="key-outline" size={13} color="#00897B" />
            <Text className="text-[12px] font-semibold text-teal-sena ml-1">
              ¿Olvidaste tu contraseña?
            </Text>
          </Pressable>
        </Animated.View>

        {/* BOTÓN INGRESAR */}
        <Animated.View
          entering={FadeInUp.delay(1100).duration(600)}
          className="items-center mt-6"
        >
          <Button text="Ingresar" onPress={enviar} />
        </Animated.View>
      </Animated.View>

      {/* REGISTRO */}
      <Animated.View
        entering={FadeInUp.delay(1250).duration(600)}
        className="items-center mt-10"
      >
        <Text className="text-[13px] text-gray-500">
          ¿No tienes una cuenta?
        </Text>

        <Pressable
          onPress={() => router.push("./registrarCuenta")}
          className="mt-1 flex-row items-center"
        >
          <Ionicons name="person-add-outline" size={15} color="#00897B" />
          <Text className="text-[13px] font-bold text-teal-sena ml-1.5">
            Registrar tu cuenta
          </Text>
        </Pressable>
      </Animated.View>

      {/* FOOTER */}
      <Animated.View
        entering={FadeIn.delay(1400).duration(700)}
        className="items-center mt-auto pb-5 pt-6"
      >
        <View className="w-[45px] h-[2px] bg-teal-sena/20 rounded-full mb-3" />
        <Text className="text-gray-400 text-[10px] text-center">
          © 2026 SAIA
        </Text>
        <Text className="text-gray-400 text-[9px] text-center mt-1">
          Sistema de Autogestión de Aprendices
        </Text>
      </Animated.View>
    </Container>
  );
};

export default LandingPage;