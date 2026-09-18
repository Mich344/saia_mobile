// Librerias
import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useCallback } from "react";
import Vista_Recordatorio from "@/sql/Vista_Recordatorio";
import { useFocusEffect } from "@react-navigation/native";
import socket from "@/sql/socket";

// Componentes
import Container from "@/components/Container";
import Card from "@/components/card's/Card";
import CardQR from "@/components/card's/CardButtonQR";
import Recordatorio from "@/components/Recordatorio";
import { Ionicons } from "@expo/vector-icons";

const HomeUsuario = () => {

  useEffect(() => {
  const manejarSesionCerrada = async () => {
    console.log("🚨 SESIÓN CERRADA POR OTRO DISPOSITIVO");

    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("usuario");

    socket.disconnect();

    alert(
      "Tu sesión fue cerrada porque se inició sesión desde otro dispositivo."
    );

    router.replace("/");
  };

  socket.on("sesion_cerrada", manejarSesionCerrada);

  return () => {
    socket.off("sesion_cerrada", manejarSesionCerrada);
  };
}, []);
  const [recordatorios, setRecordatorios] = useState([]);

  const cargarRecordatorios = async () => {
    const respuesta = await Vista_Recordatorio();

    console.log("RESPUESTA:", respuesta);

    if (respuesta.ok) {
      console.log("DATOS:", respuesta.data);

      setRecordatorios(respuesta.data.recordatorios);
    }
  };

  useFocusEffect(
    useCallback(() => {
      cargarRecordatorios();
    }, []),
  );

  useEffect(() => {
    const cargarSesion = async () => {
      const token = await AsyncStorage.getItem("token");
      const usuario = await AsyncStorage.getItem("usuario");

      console.log("TOKEN:", token);
      console.log("USUARIO:", JSON.parse(usuario || "{}"));
    };

    cargarSesion();
  }, []);
  const router = useRouter();
  return (
    <Container>
      {/* ===================================================== */}
      {/* BIENVENIDA SAIA */}
      {/* ===================================================== */}

      <View className="bg-[#EFFFFA] rounded-[24px] border border-[#CFF5EA] p-5 mb-5">
        <View className="flex-row items-center justify-between">
          <View className="flex-1 pr-3">
            <Text className="text-[12px] font-WorkSansBold text-[#159F89] tracking-[1px]">
              SAIA
            </Text>

            <Text className="text-[25px] font-WorkSansExtraBold text-[#172033] mt-1">
              ¡Bienvenido!
            </Text>

            <Text className="text-[14px] text-[#59636E] mt-2 leading-5">
              Todo lo que necesitas para gestionar tus accesos, consultar tus
              reportes y mantener tu información académica en un solo lugar.
            </Text>
          </View>

          {/* ICONO DECORATIVO */}

          <View className="w-[68px] h-[68px] rounded-full bg-[#3ADBB8] items-center justify-center">
            <View className="w-[54px] h-[54px] rounded-full bg-[#45CFD3] items-center justify-center">
              <Ionicons
                name="shield-checkmark-outline"
                size={32}
                color="white"
              />
            </View>
          </View>
        </View>

        {/* SEPARADOR */}

        <View className="h-[1px] bg-[#CFEDE5] mt-5 mb-4" />

        {/* MENSAJE INFERIOR */}

        <View className="flex-row items-center">
          <View className="w-[34px] h-[34px] rounded-full bg-white items-center justify-center">
            <Ionicons name="sparkles-outline" size={18} color="#19B89F" />
          </View>

          <View className="flex-1 ml-3">
            <Text className="text-[13px] font-WorkSansBold text-[#172033]">
              Tu experiencia comienza aquí
            </Text>

            <Text className="text-[12px] text-[#6B7280] mt-0.5">
              Explora las herramientas disponibles para ti.
            </Text>
          </View>
        </View>
      </View>
      <CardQR />
      <View
        className="border-t border-b border-gray-100 w-[10%] pl-3 shadow shadow-teal-400 elevation"
        style={{
          marginHorizontal: -24,
          width: "auto",
        }}
      >
        <Text className="font-calibriBold text-xl mt-5">
          <Image
            source={require("@/img/flash.png")}
            style={{ width: 25, height: 25 }}
          />
          Accesos Rapidos
        </Text>

        <View className="flex-row mt-1 justify-between mb-4">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Card
              img={require("@/img/scanner.png")}
              text="Nuevo Ingreso"
              title="Codigo QR"
              bgColor="violeta"
              onPress={() => router.push("/vistaUsuarioApp/userQR")}
            />

            <Card
              img={require("@/img/insumosUser.png")}
              text="Ver y consultar"
              title="Insumos"
              bgColor="azul"
              onPress={() => router.push("/vistaUsuarioApp/Insumo")}
            />

            <Card
              img={require("@/img/reportesUser.png")}
              text="Consultar"
              title="Reportes"
              bgColor="naranja"
              onPress={() => router.push("/vistaUsuarioApp/reportes_Aprendiz")}
            />

            <Card
              img={require("@/img/user.png")}
              text="Consultar y editar"
              title="Perfil"
              bgColor="verde"
              onPress={() => router.push("/vistaUsuarioApp/perfil")}
            />

            <Card
              img={require("@/img/scanner.png")}
              text="Cambia tu clave"
              title="Contraseña"
              bgColor="violeta"
              onPress={() => router.push("/vistaUsuarioApp/cambiarPass")}
            />
          </ScrollView>
        </View>
      </View>
      <View className="mt-5">
        <View className="border-2 border-green-200 rounded-lg p-3">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center gap-2">
              <Ionicons name="calendar-outline" size={24} color="black" />
              <Text className="font-calibriBold text-base">
                Próximos talleres
              </Text>
            </View>

            <Text
              className="text-teal-sena"
              onPress={() => router.push("/vistaUsuarioApp/recordatorio_View")}
            >
              Mis Recordatorios
            </Text>
          </View>
          {recordatorios.length === 0 ? (
            <View className="items-center py-10">
              <Ionicons
                name="calendar-clear-outline"
                size={45}
                color="#9CA3AF"
              />

              <Text className="mt-4 text-gray-500">
                No tienes recordatorios registrados.
              </Text>
            </View>
          ) : (
            recordatorios
              .slice(0, 3)
              .map((item: any) => (
                <Recordatorio
                  onDelete={cargarRecordatorios}
                  id={item.id_recordatorio}
                  key={item.id_recordatorio}
                  titulo={item.titulo}
                  descripcion={item.descripcion}
                  fecha={item.fecha_limite}
                  hora={item.hora_limite}
                  prioridad={item.prioridad}
                  url={item.url}
                />
              ))
          )}
        </View>
      </View>

      <Pressable
        className="mt-5"
        onPress={() =>
          router.replace("http://senasofiaplus.edu.co/sofia-public/index.jsp")
        }
      >
        <View className="bg-[#EDFFED] rounded-2xl p-5 border border-[#BBFFBB]">
          <Text className="text-[20px] font-WorkSansBold color-complement text-center">
            ¿Necesitas actualizar tus datos?
          </Text>

          <Text className="text-center text-gray-600 mt-2">
            Los datos personales se administran desde la plataforma oficial del
            SENA.
          </Text>

          <Link
            href="http://senasofiaplus.edu.co/sofia-public/index.jsp"
            asChild
          >
            <Pressable className="bg-[#007A4E] rounded-xl py-3 mt-5 flex-row justify-center items-center active:opacity-80">
              <Ionicons name="open-outline" size={20} color="white" />

              <Text className="text-white font-bold ml-2">
                Abrir SOFIA Plus
              </Text>
            </Pressable>
          </Link>
        </View>
      </Pressable>
      {/* ===================================================== */}
{/* POSIBLES MEJORAS FUTURAS */}
{/* ===================================================== */}

<View className="mt-5">
  <View className="flex-row items-center mb-3">
    <Ionicons name="rocket-outline" size={24} color="#16B7B7" />

    <View className="ml-2">
      <Text className="font-calibriBold text-base">
        Posibles mejoras futuras
      </Text>

      <Text className="text-gray-500 text-xs mt-1">
        Nuevas funciones que podrían llegar a SAIA
      </Text>
    </View>
  </View>

  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingRight: 10 }}
  >
    {/* TARJETA 1 */}
    <View className="w-[230px] bg-white rounded-2xl border border-[#DDF3EF] mr-3 overflow-hidden">
      <View className="h-[110px] bg-[#E9FAF7] items-center justify-center">
        <Ionicons
          name="stats-chart-outline"
          size={55}
          color="#16B7B7"
        />
      </View>

      <View className="p-4">
        <Text className="font-WorkSansBold text-[16px] text-[#172033]">
          Estadísticas de acceso
        </Text>

        <Text className="text-gray-500 text-[12px] mt-2 leading-5">
          Consulta estadísticas sobre tus ingresos, salidas y movimientos.
        </Text>
      </View>
    </View>

    {/* TARJETA 2 */}
    <View className="w-[230px] bg-white rounded-2xl border border-[#E5E9FF] mr-3 overflow-hidden">
      <View className="h-[110px] bg-[#EEF0FF] items-center justify-center">
        <Ionicons
          name="notifications-outline"
          size={55}
          color="#6366F1"
        />
      </View>

      <View className="p-4">
        <Text className="font-WorkSansBold text-[16px] text-[#172033]">
          Notificaciones inteligentes
        </Text>

        <Text className="text-gray-500 text-[12px] mt-2 leading-5">
          Recibe avisos importantes y novedades relacionadas con SAIA.
        </Text>
      </View>
    </View>

    {/* TARJETA 3 */}
    <View className="w-[230px] bg-white rounded-2xl border border-[#FFE8D8] mr-3 overflow-hidden">
      <View className="h-[110px] bg-[#FFF4EA] items-center justify-center">
        <Ionicons
          name="id-card-outline"
          size={55}
          color="#F97316"
        />
      </View>

      <View className="p-4">
        <Text className="font-WorkSansBold text-[16px] text-[#172033]">
          Credencial digital
        </Text>

        <Text className="text-gray-500 text-[12px] mt-2 leading-5">
          Una identificación digital para complementar el acceso mediante QR.
        </Text>
      </View>
    </View>

    {/* TARJETA 4 */}
    <View className="w-[230px] bg-white rounded-2xl border border-[#E2F0FF] mr-3 overflow-hidden">
      <View className="h-[110px] bg-[#EDF7FF] items-center justify-center">
        <Ionicons
          name="map-outline"
          size={55}
          color="#1683E8"
        />
      </View>

      <View className="p-4">
        <Text className="font-WorkSansBold text-[16px] text-[#172033]">
          Mapa del SENA
        </Text>

        <Text className="text-gray-500 text-[12px] mt-2 leading-5">
          Consulta porterías, ambientes y puntos importantes dentro del centro.
        </Text>
      </View>
    </View>

    {/* TARJETA 5 */}
    <View className="w-[230px] bg-white rounded-2xl border border-[#EDE2FF] mr-3 overflow-hidden">
      <View className="h-[110px] bg-[#F6EEFF] items-center justify-center">
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={55}
          color="#9333EA"
        />
      </View>

      <View className="p-4">
        <Text className="font-WorkSansBold text-[16px] text-[#172033]">
          Asistente SAIA
        </Text>

        <Text className="text-gray-500 text-[12px] mt-2 leading-5">
          Un asistente para ayudarte a consultar información dentro de SAIA.
        </Text>
      </View>
    </View>
  </ScrollView>
</View>
    </Container>
  );
};

export default HomeUsuario;
