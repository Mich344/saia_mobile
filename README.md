# 🚀 SAIA App

Aplicación móvil desarrollada con **React Native + Expo + TypeScript + NativeWind**.
Este proyecto esta enfocado en mejorar la densidad de los peatones a la hora de ingresos institucionales, permitiendo un acceso mas rapido y seguro.

---

# 📦 Tecnologías utilizadas

- ⚛️ React Native
- 🚀 Expo
- 🔷 TypeScript
- 🎨 NativeWind (Tailwind para React Native)
- 📦 Node.js
- 🔁 Git + GitHub

---

# 🛠️ Requisitos previos

Antes de ejecutar el proyecto debes tener instalado:

- Node.js
- npm o yarn (Especificamente utilizamos en pack_NPM)
- Git
- VS Code
- Expo Go (Siempre trabajar con el servidor web y mobile al tiempo para evitar deformaciones)

---

# ⚙️ Instalación del proyecto

1. Clonar el repositorio:

```bash
git clone https://github.com/Mich344/saia_mobile.git
cd TU-REPO
```

2. Instalar dependencias:

```bash
npm install,
npm i
```

3. Ejecutar el proyecto:

```bash
npx expo start,
npm start web
```

4. Escanear el QR con **Expo Go** @REQUERIDO TENER EXPO GO en tu dispositivo movil

---

# 🎨 Configuración del entorno (IMPORTANTE)

Este proyecto usa:

## TypeScript

En proceso

---

# 🌿 Flujo de trabajo con Git

No trabajar directamente en `main`, el acceso al main es prohibido ya que es la rama que esta ejecutando nuestra aplicacion final,
cada 1 trabajar sobre una rama inicial asignada dependiendo de la tarea a entregar.

## Ramas:

- `main` → producción ⚠️
- `develop` → desarrollo ⚠️
- `feature/*` → nuevas funcionalidades

## Comandos Git

## Trabajar con la el gitbash ejecutando desde la terminal VSCODE para un trabajo paralelo. (OPCIONAL).

---

## Algunos comandos no se identifican con git en otras terminales para evitar errores usar GitBash.

```
git branch  → Visualizar ramas de trabajo.
git branch -d "Nombre_RAMA" → eliminar cualquier rama de trabajo.
git branch -D "Nombre_RAMA" → Forzar una rama para eliminarse.
git branch name → Crear una rama de trabajo.
git checkout name → Entrar a una rama de trabajo
git push -u origin nombre_rama → Finalizado el trabajo solicitar subir tus cambios a la rama asignada

---------------


---------------

mkdir nombre desde consola → Crear una carpeta
cd name . → Entrar a una carpeta
cd .. → Retroceder entre carpetas
dir → Ejecutar todos los archivos creados en una carpeta especifica
touch name → Crear un archivo txt, js, jsx, tsx, ts, etc..
rm nanme → Eliminar un archivo
rmdir → Elminar una carpeta

---

# 🧰 Extensiones recomendadas (VS Code)

Para trabajar correctamente en Visual Studio Code instalar:

- GitHub Copilot → Autocompletado con IA
- Tailwind CSS IntelliSense → Clases Tailwind
- ES7+ React Snippets → Atajos React
- Path Intellisense → Autocompletar rutas
- Prettier → Formateo automático
- ESLint → Calidad de código
- GitLens → Control de cambios
- Error Lens → Mostrar errores en línea
- Import Cost → Tamaño de librerías
- Material Icon Theme → Iconos de carpetas
- TypeScript Toolbox → Lecutra typescript
- JavaScript and TypeScript Nightly → Lecutra typescript
---

# ⚠️ Buenas prácticas

- No subir `node_modules`
- Usar `.gitignore`
- Hacer commits claros
- Usar ramas para cada funcionalidad
- Crear Pull Requests antes de mergear

```
