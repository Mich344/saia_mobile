#  SAIA — Sistema de Autogestión de Ingreso

Aplicación móvil desarrollada para apoyar la **gestión, control y optimización del proceso de ingreso institucional**, proporcionando herramientas para administrar usuarios, información académica, insumos y diferentes procesos relacionados con el acceso a la institución.

SAIA busca ofrecer una plataforma centralizada que permita realizar los procesos de manera más **ágil, organizada y segura**, reduciendo procesos manuales y facilitando el acceso a la información.

---

#  Descripción

**SAIA (Sistema de Autogestión de Ingreso)** es una solución de software orientada a la gestión del ingreso institucional mediante una aplicación móvil.

El sistema integra un frontend desarrollado con React Native y Expo, un backend basado en Node.js y Express, y una base de datos MySQL.

La aplicación permite gestionar diferentes procesos relacionados con los usuarios y los recursos institucionales, manteniendo una comunicación entre el aplicativo móvil, los servicios del backend y la base de datos.

---

#  Propósito del proyecto

El propósito del proyecto es desarrollar un sistema que permita **optimizar y organizar el proceso de ingreso institucional**, facilitando la gestión de usuarios, información relacionada con su vinculación académica y administrativa, recursos e insumos, además de proporcionar mecanismos de autenticación y recuperación de acceso.

SAIA busca centralizar información y procesos que pueden realizarse de forma manual, proporcionando una plataforma móvil que permita mejorar la organización y disponibilidad de la información.

---

#  Objetivos

## Objetivo general

Desarrollar una aplicación móvil para la gestión y autogestión de los procesos relacionados con el ingreso institucional, integrando mecanismos de autenticación, administración de información y gestión de recursos.

## Objetivos específicos

* Implementar un sistema de autenticación mediante número de documento y contraseña.
* Permitir el registro de nuevos usuarios.
* Gestionar la información personal de los usuarios.
* Integrar información relacionada con aprendices y aspirantes.
* Consultar información académica asociada al usuario.
* Permitir la gestión de insumos institucionales.
* Implementar estados activos e inactivos para los insumos.
* Mantener información histórica relacionada con los movimientos de los recursos.
* Implementar recuperación de contraseña mediante correo electrónico.
* Incorporar mecanismos de seguridad para proteger las credenciales.
* Facilitar la consulta de información mediante una aplicación móvil.
* Proporcionar una estructura modular que permita ampliar el sistema posteriormente.

---

#  Alcance

El proyecto comprende el desarrollo de una aplicación móvil y los servicios necesarios para soportar sus principales funcionalidades.

El sistema contempla:

* Registro de usuarios.
* Inicio de sesión.
* Autenticación mediante número de documento y contraseña.
* Gestión de información personal.
* Consulta de información relacionada con formación.
* Integración con información de aprendices y aspirantes.
* Gestión de insumos.
* Registro de nuevos insumos.
* Consulta de insumos activos e inactivos.
* Cambio de estado de los insumos.
* Conservación del historial de los recursos.
* Recuperación de contraseña.
* Comunicación con servicios backend.
* Persistencia de información mediante MySQL.
* Navegación entre las diferentes vistas de la aplicación.
* Manejo de errores y mensajes al usuario.
* Preparación del aplicativo para pruebas en dispositivos móviles.

El sistema se encuentra en desarrollo, por lo que algunas funcionalidades pueden continuar siendo ampliadas o modificadas durante las siguientes etapas del proyecto.

---

#  Tecnologías utilizadas

##  Frontend

*  **React Native**
*  **Expo**
*  **TypeScript**
*  **NativeWind**
*  **Expo Router**
*  **ESLint**
*  **Git**
*  **GitHub**

##  Backend

*  **Node.js**
*  **Express**
*  **JWT**
*  **bcrypt**
*  **Nodemailer**
*  **Socket.IO**
*  **CORS**
*  **Multer**

##  Base de datos

*  **MySQL**
*  **mysql2**

##  Herramientas de desarrollo

* **Visual Studio Code**
* **Git**
* **GitHub**
* **Expo Go**
* **ngrok**

---

#  Funcionalidades

Entre las principales funcionalidades desarrolladas para SAIA se encuentran:

## Autenticación

* Registro de cuentas.
* Inicio de sesión.
* Validación de credenciales.
* Autenticación mediante número de documento y contraseña.
* Generación y validación de tokens.
* Protección de rutas mediante middleware.

## Gestión de usuarios

* Registro de información personal.
* Asociación de una cuenta con los datos personales.
* Manejo de roles.
* Consulta de información del usuario autenticado.

## Información académica

El sistema contempla la integración de información relacionada con:

* Aprendices.
* Aspirantes.
* Programas de formación.
* Cursos.
* Fichas.
* Sedes.

Cuando un usuario se encuentra registrado dentro de la información académica correspondiente, el sistema puede asociar dicha información a su cuenta.

En caso contrario, el usuario puede ingresar al sistema sin contar necesariamente con información de formación asociada.

---

#  Registro de usuarios

El proceso de registro permite crear una cuenta asociada a la información personal del usuario.

Entre los datos contemplados se encuentran:

* Número de documento.
* Nombres.
* Primer apellido.
* Segundo apellido.
* Teléfono.
* Correo electrónico.
* Tipo de documento.
* Tipo de sangre.
* Sexo.
* Fecha de nacimiento.
* Contraseña.
* Confirmación de contraseña.

Durante el proceso se realizan validaciones para evitar información incompleta, correos inválidos, contraseñas que no coincidan y registros duplicados.

---

#  Seguridad

Durante el desarrollo se implementaron diferentes mecanismos orientados a proteger la información del sistema:

* Contraseñas almacenadas mediante **bcrypt**.
* Autenticación mediante **JWT**.
* Middleware para verificar tokens.
* Variables de entorno para información sensible.
* Validación de datos recibidos.
* Control de acceso a rutas protegidas.
* Control de tokens de recuperación.
* Manejo de estados de los recursos.

Las credenciales y secretos del proyecto no deben almacenarse directamente dentro del código fuente.

---

# Requisitos previos

Antes de ejecutar SAIA es necesario contar con:

* **Node.js**
* **npm**
* **Git**
* **Visual Studio Code**
* **MySQL**
* **Expo Go**
* Un dispositivo móvil Android/iOS o un emulador compatible.

---

#  Pruebas en dispositivo móvil

SAIA puede ejecutarse utilizando **Expo Go**.

Proceso básico:

1. Instalar Expo Go.
2. Iniciar el frontend.
3. Ejecutar:

```bash
npx expo start
```

4. Escanear el código QR generado.
5. Esperar a que Expo Go cargue la aplicación.

Cuando existen problemas de conexión entre el dispositivo y el equipo de desarrollo, se puede utilizar:

```bash
npx expo start --tunnel
```

El modo túnel utiliza ngrok para facilitar la comunicación entre el dispositivo y el entorno de desarrollo.

Estado del servicio:

https://status.ngrok.com/

---

# Consideraciones de conexión

Durante las pruebas de SAIA se debe verificar que:

* El backend se encuentre activo.
* El dispositivo pueda acceder al servidor.
* La dirección IP configurada corresponda al equipo donde se ejecuta el backend.
* El puerto `PORT` esté disponible.
* La configuración de CORS permita las solicitudes necesarias.
* Las variables de entorno estén correctamente configuradas.

En pruebas mediante dispositivo físico, utilizar `localhost` desde el celular no apunta al computador de desarrollo. Se debe utilizar la dirección de red correspondiente o un túnel como ngrok.

---

# Desarrollo y pruebas

Durante el desarrollo se realizaron pruebas de:

* Registro de usuarios.
* Inicio de sesión.
* Validación de credenciales.
* Navegación entre pantallas.
* Comunicación frontend/backend.
* Consultas a MySQL.
* Gestión de insumos.
* Cambio de estados.
* Manejo de imágenes.
* Recuperación de contraseña.
* Validación de tokens.
* Conexión desde dispositivos móviles.
* Ejecución mediante Expo Go.
* Conexión mediante LAN y túnel.

---

#  Control de versiones

El proyecto utiliza **Git** para el control de versiones y **GitHub** como plataforma para alojar el código fuente.

Los commits deben utilizar mensajes descriptivos que permitan identificar claramente el cambio realizado.

Ejemplos:

```bash
feat: agrega gestión de insumos
feat: implementa recuperación de contraseña
fix: corrige autenticación de usuario
fix: corrige cambio de estado de insumos
docs: actualiza documentación del proyecto
refactor: reorganiza servicios del frontend
chore: configura estructura inicial del proyecto
```

---

# Estado actual del proyecto

**Estado: En desarrollo**

SAIA se encuentra en una etapa de desarrollo progresivo. Se han implementado diferentes módulos relacionados con autenticación, registro, recuperación de acceso, información de usuarios y gestión de insumos.

La arquitectura actual permite continuar incorporando nuevas funcionalidades como reportes, recordatorios y otros módulos definidos dentro de los requerimientos del sistema.

---

#  Proyecto

**SAIA — Sistema de Autogestión de Ingreso**

Proyecto de desarrollo de software orientado a la gestión y optimización de procesos relacionados con el ingreso institucional.

El sistema integra una aplicación móvil, servicios backend y una base de datos relacional para proporcionar una solución centralizada y escalable.

---

# 📄 Licencia

Este proyecto ha sido desarrollado con **fines académicos y de formación**.

Su uso, distribución o modificación se encuentra sujeto a las condiciones establecidas por los responsables del proyecto.
