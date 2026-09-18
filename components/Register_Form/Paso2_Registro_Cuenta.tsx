import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Input from "@/components/inputs/Input";
import Label from "@/components/inputs/InputLabel";
import Calendario from "@/components/inputs/inputCalender";
import Modalcomponent from "@/components/Modal";
import ModalHabeasData from "@/components/ModalHabeasData";
import {
  FormularioState,
  FormularioKey,
} from "@/hooks/utils/validacion_Registro_SAIA";
import { registrarHabeasData } from "@/sql/HabeasData";

interface Props {
  formulario: FormularioState;
  error: Record<string, boolean>;
  onChange: (campo: FormularioKey, valor: string | boolean | any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Paso2Contacto({
  formulario,
  error,
  onChange,
  onNext,
  onBack,
}: Props) {
  const tiposSangre = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];

  const [cargandoHabeas, setCargandoHabeas] = useState(false);

  // ESTADO MODAL HABEAS DATA
  const [modalLegalVisible, setModalLegalVisible] = useState(false);
  const [esMayorDeEdad, setEsMayorDeEdad] = useState(true);

  // MODAL ALERTAS DE ERRORES
  const [modalError, setModalError] = useState(false);
  const [infoModal, setInfoModal] = useState<{
    titulo: string;
    descripcion: string;
    iconName: keyof typeof Ionicons.glyphMap;
    iconColor: string;
  }>({
    titulo: "",
    descripcion: "",
    iconName: "warning-outline",
    iconColor: "#F59E0B",
  });

  const obtenerEdad = (fechaString: string): number => {
    if (!fechaString) return -1;
    const partes = fechaString.split("-");
    if (partes.length !== 3) return -1;

    const anioNac = parseInt(partes[0], 10);
    const mesNac = parseInt(partes[1], 10) - 1;
    const diaNac = parseInt(partes[2], 10);

    const hoy = new Date();
    let edad = hoy.getFullYear() - anioNac;
    const mesDiferencia = hoy.getMonth() - mesNac;

    if (mesDiferencia < 0 || (mesDiferencia === 0 && hoy.getDate() < diaNac)) {
      edad--;
    }
    return edad;
  };

  const esEdadPermitida = (fechaString: string): boolean => {
    return obtenerEdad(fechaString) >= 13;
  };

  // Función para parsear la fecha guardada (string YYYY-MM-DD) a Date local sin desfase
  const parsearFechaGuardada = (fechaStr: string): Date | undefined => {
    if (!fechaStr) return undefined;
    const partes = fechaStr.split("-");
    if (partes.length !== 3) return undefined;
    return new Date(
      parseInt(partes[0], 10),
      parseInt(partes[1], 10) - 1,
      parseInt(partes[2], 10)
    );
  };

  const manejarSiguiente = () => {
    if (!formulario.fecha_nac) {
      setInfoModal({
        titulo: "Fecha requerida",
        descripcion:
          "Por favor selecciona tu fecha de nacimiento para continuar.",
        iconName: "calendar-outline",
        iconColor: "#F59E0B",
      });
      setModalError(true);
      return;
    }

    const edadActual = obtenerEdad(formulario.fecha_nac);

    if (edadActual < 13) {
      setInfoModal({
        titulo: "Edad no permitida",
        descripcion: `Registras ${
          edadActual < 0 ? 0 : edadActual
        } años. Debes tener al menos 13 años de edad para registrarte en SAIA.`,
        iconName: "alert-circle-outline",
        iconColor: "#EF4444",
      });
      setModalError(true);
      return;
    }

    // Validación de coherencia entre tipo de documento y edad sin alterar datos del usuario
    if (edadActual >= 18 && formulario.tip_doc === "Tarjeta de Identidad") {
      setInfoModal({
        titulo: "Documento no coincidente",
        descripcion:
          "Registras 18 años o más pero seleccionaste Tarjeta de Identidad (TI). Por favor regresa al Paso 1 y selecciona Cédula de Ciudadanía.",
        iconName: "card-outline",
        iconColor: "#F59E0B",
      });
      setModalError(true);
      return;
    }

    if (edadActual < 18 && formulario.tip_doc === "Cédula de Ciudadanía") {
      setInfoModal({
        titulo: "Documento no coincidente",
        descripcion:
          "Registras menos de 18 años pero seleccionaste Cédula de Ciudadanía. Por favor regresa al Paso 1 y selecciona Tarjeta de Identidad.",
        iconName: "card-outline",
        iconColor: "#F59E0B",
      });
      setModalError(true);
      return;
    }

    if (!formulario.tip_sang) {
      setInfoModal({
        titulo: "Tipo de sangre requerido",
        descripcion: "Por favor selecciona tu tipo de sangre.",
        iconName: "water-outline",
        iconColor: "#F59E0B",
      });
      setModalError(true);
      return;
    }

    if (!formulario.email) {
      setInfoModal({
        titulo: "Correo requerido",
        descripcion: "Por favor ingresa tu correo electrónico para continuar.",
        iconName: "mail-outline",
        iconColor: "#F59E0B",
      });
      setModalError(true);
      return;
    }

    if (!formulario.tel || formulario.tel.length < 10) {
      setInfoModal({
        titulo: "Teléfono inválido",
        descripcion:
          "Por favor ingresa un número de teléfono válido de 10 dígitos.",
        iconName: "call-outline",
        iconColor: "#F59E0B",
      });
      setModalError(true);
      return;
    }

    setEsMayorDeEdad(edadActual >= 18);
    setModalLegalVisible(true);
  };

  const enviarHabeasData = async () => {
    setCargandoHabeas(true);
    try {
      const respuesta = await registrarHabeasData({
        num_doc: formulario.num_doc,
        aceptado: true,
      });

      setCargandoHabeas(false);

      if (respuesta.ok) {
        setModalLegalVisible(false);
        onNext();
      } else {
        setInfoModal({
          titulo: "Error al registrar",
          descripcion:
            respuesta.data.mensaje ||
            "No se pudo registrar la autorización de Habeas Data.",
          iconName: "alert-circle-outline",
          iconColor: "#EF4444",
        });
        setModalError(true);
      }
    } catch (err) {
      setCargandoHabeas(false);
      setInfoModal({
        titulo: "Error de conexión",
        descripcion: "Ocurrió un inconveniente al conectar con el servidor.",
        iconName: "wifi-outline",
        iconColor: "#EF4444",
      });
      setModalError(true);
    }
  };

  const formatearFechaLocal = (valor: any): string => {
    if (valor instanceof Date) {
      const year = valor.getFullYear();
      const month = String(valor.getMonth() + 1).padStart(2, "0");
      const day = String(valor.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return String(valor ?? "");
  };

  return (
    <>
      {/* MODAL LEGAL DE HABEAS DATA */}
      <ModalHabeasData
        visible={modalLegalVisible}
        esMayorDeEdad={esMayorDeEdad}
        cargando={cargandoHabeas}
        onClose={() => setModalLegalVisible(false)}
        onConfirm={enviarHabeasData}
      />

      {/* MODAL DE ERRORES */}
      <Modalcomponent
        visible={modalError}
        onClose={() => setModalError(false)}
        titulo={infoModal.titulo}
        descripcion={infoModal.descripcion}
        textButton="Entendido"
        iconName={infoModal.iconName}
        iconColor={infoModal.iconColor}
      />

      {/* VISTA PRINCIPAL */}
      <View className="w-full h-[1px] bg-gray-300 my-4" />
      <Text className="text-2xl font-bold text-slate-800 text-center">
        Información adicional
      </Text>
      <Text className="text-gray-500 mt-2 mb-6 text-center">
        Completa tu información de contacto.
      </Text>

      {/* FECHA DE NACIMIENTO */}
  {/* FECHA DE NACIMIENTO */}
<View className="mt-5">
  <Label title="Fecha de nacimiento" />
  <Calendario
    placeholder="2000-04-16"
    value={formulario.fecha_nac || undefined}
    error={
      error["fecha_nac"] ||
      (Boolean(formulario.fecha_nac) &&
        !esEdadPermitida(formulario.fecha_nac))
    }
    onChangeDate={(valor: any) => {
      const fechaLimpia = formatearFechaLocal(valor);
      onChange("fecha_nac", fechaLimpia);
    }}
  />
  {formulario.fecha_nac !== "" &&
    !esEdadPermitida(formulario.fecha_nac) && (
      <View className="flex-row items-center mt-1.5 ml-1">
        <Ionicons
          name="information-circle-outline"
          size={14}
          color="#EF4444"
        />
        <Text className="text-red-500 text-xs ml-1 font-semibold">
          No permitido: Debes tener al menos 13 años de edad.
        </Text>
      </View>
    )}
</View>

      {/* TIPO DE SANGRE */}
      <View className="mt-5">
        <Label title="Tipo de sangre" />
        <View className="flex-row flex-wrap justify-between mt-1">
          {tiposSangre.map((tipo) => {
            const seleccionado = formulario.tip_sang === tipo;
            return (
              <Pressable
                key={tipo}
                onPress={() => onChange("tip_sang", tipo)}
                className={`w-[23%] py-3 mb-2 rounded-xl border flex-row items-center justify-center ${
                  seleccionado
                    ? "bg-[#00897B] border-[#00897B]"
                    : error["tip_sang"]
                      ? "bg-red-50 border-red-500"
                      : "bg-white border-gray-200"
                }`}
              >
                <Ionicons
                  name="water"
                  size={14}
                  color={seleccionado ? "#FFFFFF" : "#EF4444"}
                  style={{ marginRight: 4 }}
                />
                <Text
                  className={`font-bold text-sm ${
                    seleccionado ? "text-white" : "text-gray-700"
                  }`}
                >
                  {tipo}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* CORREO */}
      <View className="mt-3">
        <Label title="Correo electrónico" />
        <Input
          iconName="mail-outline"
          placeholder="correo@ejemplo.com"
          keyboardType="email-address"
          inputMode="email"
          autoCapitalize="none"
          error={error["email"]}
          value={formulario.email}
          onChangeText={(texto) => onChange("email", texto)}
        />
      </View>

      {/* TELÉFONO */}
      <View className="mt-3">
        <Label title="Teléfono" />
        <Input
          iconName="call-outline"
          placeholder="3001234567"
          keyboardType="numeric"
          inputMode="numeric"
          maxLength={10}
          error={error["tel"]}
          value={formulario.tel}
          onChangeText={(texto) =>
            onChange("tel", texto.replace(/\D/g, "").slice(0, 10))
          }
        />
      </View>

      {/* BOTONES DE NAVEGACIÓN */}
      <View className="flex-row justify-between mt-10">
        <View className="w-[48%]">
          <Pressable
            onPress={onBack}
            style={{ borderColor: "#47C5DE" }}
            className="w-full h-14 bg-transparent active:bg-slate-50 rounded-2xl justify-center items-center px-4 border-2"
          >
            <Text style={{ color: "#47C5DE" }} className="font-bold text-lg">
              Anterior
            </Text>
          </Pressable>
        </View>

        <View className="w-[48%]">
          <Pressable
            onPress={manejarSiguiente}
            style={{ backgroundColor: "#42EDB5" }}
            className="w-full h-14 active:opacity-90 rounded-2xl justify-center items-center px-4 shadow-sm"
          >
            <Text className="text-white font-bold text-lg">Siguiente</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}