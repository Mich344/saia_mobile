import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Modal,
} from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  visible: boolean;
  esMayorDeEdad: boolean;
  cargando: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ModalHabeasData({
  visible,
  esMayorDeEdad,
  cargando,
  onClose,
  onConfirm,
}: Props) {
  const [aceptoTerminos, setAceptoTerminos] = useState(false);

  // Resetear el checkbox cada vez que se abre/cierra el modal
  useEffect(() => {
    if (visible) setAceptoTerminos(false);
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/60 justify-center items-center px-4">
        <View
          className={`bg-white rounded-3xl p-6 w-full max-h-[85%] items-center shadow-xl ${
            !esMayorDeEdad ? "border-2 border-amber-400" : ""
          }`}
        >
          {/* ICONO Y TÍTULO SEGÚN EDAD */}
          {esMayorDeEdad ? (
            <>
              <View className="w-14 h-14 bg-teal-50 rounded-full justify-center items-center mb-3">
                <Ionicons
                  name="document-text-outline"
                  size={32}
                  color="#00897B"
                />
              </View>
              <Text className="text-xl font-bold text-gray-800 text-center">
                Tratamiento de Datos Personales
              </Text>
            </>
          ) : (
            <>
              <View className="w-14 h-14 bg-amber-50 rounded-full justify-center items-center mb-3">
                <Ionicons name="people-outline" size={32} color="#F59E0B" />
              </View>
              <Text className="text-xl font-bold text-gray-800 text-center">
                Observación para Menores de Edad
              </Text>
              <View className="w-full my-3 p-3 bg-amber-50 rounded-xl border border-amber-200 flex-row items-center">
                <Ionicons name="alert-circle" size={20} color="#D97706" />
                <Text className="text-xs font-bold text-amber-800 ml-2 flex-1">
                  Aviso importante: Usuario entre 13 y 17 años.
                </Text>
              </View>
            </>
          )}

          {/* TEXTO DE TÉRMINOS */}
          <ScrollView className="w-full my-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
            {esMayorDeEdad ? (
              <Text className="text-xs text-gray-600 leading-5">
                De conformidad con la Ley 1581 de 2012 de Protección de Datos
                Personales (Habeas Data), al presionar aceptar autorizas
                explícitamente a SAIA para recolectar, almacenar y procesar tus
                datos de contacto e identificación.
                {"\n\n"}
                Tus datos serán utilizados exclusivamente con fines de gestión
                institucional, control de acceso y seguridad dentro de la
                plataforma. SAIA garantiza la confidencialidad y no compartirá
                tu información con terceros sin previa autorización.
                {"\n\n"}
                {"\n\n"}
                POLÍTICA DE TRATAMIENTO DE DATOS PERSONALES Y AVISO DE
                PRIVACIDAD SISTEMA DE CONTROL DE ACCESO E IDENTIFICACIÓN
                INTEGRAL (SAIA) 1. IDENTIFICACIÓN DEL RESPONSABLE DEL
                TRATAMIENTO Razón Social / Proyecto: SAIA - Sistema de Control
                de Acceso e Identificación Integral Domicilio y Dirección:
                Santiago de Cali, Valle del Cauca, Colombia Correo Electrónico
                de Contacto / Protección de Datos: soporte.saia@sena.edu.co
                Canal de Atención Habilitado: Módulo de soporte dentro de la
                aplicación móvil SAIA. 2. MARCO LEGAL APLICABLE La presente
                política se rige bajo la normatividad colombiana vigente en
                materia de protección de datos personales: Constitución Política
                de Colombia: Artículo 15 (Derecho al Habeas Data). Ley 1581 de
                2012: Por la cual se dictan disposiciones generales para la
                protección de datos personales. Decreto 1377 de 2013: Por el
                cual se reglamenta parcialmente la Ley 1581 de 2012. Ley 1266 de
                2008: Disposiciones especiales para el manejo de datos
                crediticios y comerciales (en lo aplicable). 3. DATOS PERSONALES
                RECOLECTADOS SAIA recolecta y almacena datos de carácter
                personal y sensible estrictamente necesarios para el
                funcionamiento de la plataforma: Datos de Identificación
                Personal: Nombres, apellidos, tipo de documento, número de
                documento de identidad (num_doc), fecha de nacimiento. Datos de
                Contacto: Correo electrónico (email), número de teléfono celular
                (tel). Datos de Salud y Emergencia (Sensibles): Tipo de sangre
                (tip_sang), EPS o contacto de emergencia. Datos Biométricos y de
                Control: Código QR asignado, registros de fecha, hora y
                ubicación de accesos a las instalaciones institucionales. 4.
                FINALIDAD DEL TRATAMIENTO DE LOS DATOS Los datos personales
                recolectados por SAIA serán utilizados para las siguientes
                finalidades institucionales y operativas: Validar la identidad
                de los usuarios y controlar el ingreso/salida vehicular y
                peatonal a las instalaciones mediante escaneo de código QR.
                Gestionar la seguridad física, prevención de riesgos e
                identificación rápida del tipo de sangre en situaciones de
                emergencia médica dentro de la sede. Enviar notificaciones de
                seguridad, alertas de acceso y comunicados relacionados con la
                cuenta del usuario. Generar reportes estadísticos e indicadores
                de aforo y permanencia de personal. 5. TRATAMIENTO DE DATOS
                SENSIBLES Y DE MENORES DE EDAD A. Datos Sensibles (Tipo de
                Sangre) El usuario otorga su consentimiento expreso para la
                recolección de su tipo de sangre. Esta información tiene la
                categoría de dato sensible y será protegida bajo los más altos
                estándares de seguridad, utilizándose únicamente para protocolos
                de primeros auxilios y emergencias médicas. B. Menores de Edad
                (Entre 13 y 17 años) De acuerdo con la legislación colombiana:
                SAIA autoriza el registro de usuarios a partir de los 13 años de
                edad. Queda expresamente prohibido el registro de menores de 13
                años. El tratamiento de datos de menores entre 13 y 17 años
                responderá al respeto de sus derechos fundamentales y contará
                con la autorización explícita conferida bajo el conocimiento y
                supervisión de su padre, madre, acudiente o tutor legal. 6.
                DERECHOS DE LOS TITULARES (DERECHOS ARCO) Como titular de los
                datos personales, tienes derecho a: Acceder / Conocer: Solicitar
                información sobre los datos personales que reposan en las bases
                de datos de SAIA. Actualizar / Rectificar: Solicitar la
                corrección de datos inexactos, incompletos o desactualizados.
                Cancela / Suprimir: Solicitar la eliminación de tus datos cuando
                consideres que no se están tratando conforme a la ley o cuando
                finalice el vínculo institucional. Revocar la Autorización:
                Revocar el consentimiento otorgado para el tratamiento de tus
                datos personales. Para ejercer cualquiera de estos derechos, el
                titular podrá enviar una solicitud al correo
                soporte.saia@sena.edu.co especificando su número de documento,
                pretensión y datos de contacto. La respuesta se emitirá en un
                plazo máximo de diez (10) días hábiles. 7. SEGURIDAD DE LA
                INFORMACIÓN SAIA adopta medidas técnicas, humanas y
                administrativas necesarias para otorgar seguridad a los
                registros, evitando su adulteración, pérdida, consulta, uso o
                acceso no autorizado o fraudulento. Los datos son almacenados en
                bases de datos con cifrado de conexión y autenticación
                restringida. 8. VIGENCIA Y MODIFICACIONES La presente Política
                de Tratamiento de Datos Personales rige a partir de su
                aceptación e integración en la plataforma. SAIA se reserva el
                derecho de modificar esta política en cualquier momento.
                Cualquier cambio sustancial será notificado a través de la
                aplicación móvil o por correo electrónico antes de su puesta en
                aplicación.
              </Text>
            ) : (
              <Text className="text-xs text-gray-600 leading-5">
                Al ser menor de edad, antes de realizar cualquier registro o
                compartir tus datos personales en SAIA,{" "}
                <Text className="font-bold">
                  debes leer los presentes términos acompañado por tu padre,
                  madre, acudiente o tutor legal responsable
                </Text>
                .{"\n\n"}
                Al marcar la casilla inferior, declaras y confirmas que estás
                completando este proceso bajo la supervisión y con el
                conocimiento de un adulto responsable de tu tutela legal.
                {"\n\n"}
                <Text className="font-bold text-center">
                  POLÍTICA DE TRATAMIENTO DE DATOS PERSONALES Y AVISO DE
                  PRIVACIDAD SISTEMA DE CONTROL DE ACCESO E IDENTIFICACIÓN
                  INTEGRAL (SAIA) 1. IDENTIFICACIÓN DEL RESPONSABLE DEL
                  TRATAMIENTO Razón Social / Proyecto: SAIA - {"\n\n"} Sistema de Control
                  de Acceso e Identificación Integral Domicilio y Dirección:
                  Santiago de Cali, Valle del Cauca, Colombia Correo Electrónico
                  de Contacto / Protección de Datos: soporte.saia@sena.edu.co
                  Canal de Atención Habilitado: Módulo de soporte dentro de la
                  aplicación móvil SAIA.
                  {"\n\n"} 
                  {"\n\n"} 
                  2. MARCO LEGAL APLICABLE La presente
                  política se rige bajo la normatividad colombiana vigente en
                  materia de protección de datos personales: Constitución
                  Política de Colombia: Artículo 15 (Derecho al Habeas Data).
                  Ley 1581 de 2012: Por la cual se dictan disposiciones
                  generales para la protección de datos personales. Decreto 1377
                  de 2013: Por el cual se reglamenta parcialmente la Ley 1581 de
                  2012. Ley 1266 de 2008: Disposiciones especiales para el
                  manejo de datos crediticios y comerciales (en lo aplicable).
                  3. DATOS PERSONALES RECOLECTADOS SAIA recolecta y almacena
                  datos de carácter personal y sensible estrictamente necesarios
                  para el funcionamiento de la plataforma: Datos de
                  Identificación Personal: Nombres, apellidos, tipo de
                  documento, número de documento de identidad (num_doc), fecha
                  de nacimiento. Datos de Contacto: Correo electrónico (email),
                  número de teléfono celular (tel). Datos de Salud y Emergencia
                  (Sensibles): Tipo de sangre (tip_sang), EPS o contacto de
                  emergencia. Datos Biométricos y de Control: Código QR
                  asignado, registros de fecha, hora y ubicación de accesos a
                  las instalaciones institucionales. 4. FINALIDAD DEL
                  TRATAMIENTO DE LOS DATOS Los datos personales recolectados por
                  SAIA serán utilizados para las siguientes finalidades
                  institucionales y operativas: Validar la identidad de los
                  usuarios y controlar el ingreso/salida vehicular y peatonal a
                  las instalaciones mediante escaneo de código QR. Gestionar la
                  seguridad física, prevención de riesgos e identificación
                  rápida del tipo de sangre en situaciones de emergencia médica
                  dentro de la sede. Enviar notificaciones de seguridad, alertas
                  de acceso y comunicados relacionados con la cuenta del
                  usuario. Generar reportes estadísticos e indicadores de aforo
                  y permanencia de personal. 5. TRATAMIENTO DE DATOS SENSIBLES Y
                  DE MENORES DE EDAD A. Datos Sensibles (Tipo de Sangre) El
                  usuario otorga su consentimiento expreso para la recolección
                  de su tipo de sangre. Esta información tiene la categoría de
                  dato sensible y será protegida bajo los más altos estándares
                  de seguridad, utilizándose únicamente para protocolos de
                  primeros auxilios y emergencias médicas. B. Menores de Edad
                  (Entre 13 y 17 años) De acuerdo con la legislación colombiana:
                  SAIA autoriza el registro de usuarios a partir de los 13 años
                  de edad. Queda expresamente prohibido el registro de menores
                  de 13 años. El tratamiento de datos de menores entre 13 y 17
                  años responderá al respeto de sus derechos fundamentales y
                  contará con la autorización explícita conferida bajo el
                  conocimiento y supervisión de su padre, madre, acudiente o
                  tutor legal. 6. DERECHOS DE LOS TITULARES (DERECHOS ARCO) Como
                  titular de los datos personales, tienes derecho a: Acceder /
                  Conocer: Solicitar información sobre los datos personales que
                  reposan en las bases de datos de SAIA. Actualizar /
                  Rectificar: Solicitar la corrección de datos inexactos,
                  incompletos o desactualizados. Cancela / Suprimir: Solicitar
                  la eliminación de tus datos cuando consideres que no se están
                  tratando conforme a la ley o cuando finalice el vínculo
                  institucional. Revocar la Autorización: Revocar el
                  consentimiento otorgado para el tratamiento de tus datos
                  personales. Para ejercer cualquiera de estos derechos, el
                  titular podrá enviar una solicitud al correo
                  soporte.saia@sena.edu.co especificando su número de documento,
                  pretensión y datos de contacto. La respuesta se emitirá en un
                  plazo máximo de diez (10) días hábiles. 7. SEGURIDAD DE LA
                  INFORMACIÓN SAIA adopta medidas técnicas, humanas y
                  administrativas necesarias para otorgar seguridad a los
                  registros, evitando su adulteración, pérdida, consulta, uso o
                  acceso no autorizado o fraudulento. Los datos son almacenados
                  en bases de datos con cifrado de conexión y autenticación
                  restringida. 8. VIGENCIA Y MODIFICACIONES La presente Política
                  de Tratamiento de Datos Personales rige a partir de su
                  aceptación e integración en la plataforma. SAIA se reserva el
                  derecho de modificar esta política en cualquier momento.
                  Cualquier cambio sustancial será notificado a través de la
                  aplicación móvil o por correo electrónico antes de su puesta
                  en aplicación.
                </Text>
              </Text>
            )}
          </ScrollView>

          {/* CHECKBOX */}
          <Pressable
            onPress={() => setAceptoTerminos(!aceptoTerminos)}
            disabled={cargando}
            className="flex-row items-center w-full my-2 px-1"
          >
            <Ionicons
              name={aceptoTerminos ? "checkbox" : "square-outline"}
              size={24}
              color={aceptoTerminos ? "#00897B" : "#9CA3AF"}
            />
            <Text className="text-xs font-semibold text-gray-700 ml-2 flex-1">
              {esMayorDeEdad
                ? "Acepto el tratamiento de mis datos personales y los términos del servicio."
                : "He leído la observación junto a un adulto responsable y autorizo continuar."}
            </Text>
          </Pressable>

          {/* BOTONES */}
          <View className="flex-row w-full mt-3 justify-between">
            <Pressable
              onPress={onClose}
              disabled={cargando}
              className="w-[48%] py-3.5 bg-gray-100 rounded-xl items-center"
            >
              <Text className="text-gray-600 font-bold text-sm">Cancelar</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                if (aceptoTerminos) {
                  onConfirm();
                }
              }}
              disabled={cargando || !aceptoTerminos}
              style={{
                backgroundColor: aceptoTerminos ? "#00897B" : "#9CA3AF",
              }}
              className="w-[48%] py-3.5 rounded-xl items-center flex-row justify-center"
            >
              {cargando ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text className="text-white font-bold text-sm">Continuar</Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
