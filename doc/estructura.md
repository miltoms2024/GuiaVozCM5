# 🧾 Estructura del Proyecto CM5VoiceGuide

## 🔹 Entrada
- `index.ts`: registra el componente raíz con Expo.
- `App.tsx`: inicia la navegación con `NavigationContainer`.

## 🔹 Navegación
- `AppNavigator.tsx`: define rutas `Home` y `Guide`.

## 🔹 Pantallas
- `HomeScreen.tsx`: pantalla inicial con botón para iniciar guía.
- `GuideScreen.tsx`: pantalla principal con texto, botones, temporizador, y menú.

## 🔹 Lógica
- `useGuideLogic.ts`: maneja pasos, voz, temporizador, mute, navegación y menú.
  - Contiene `guideSteps` embebido directamente.

## 🔹 Componentes
- `MenuModal.tsx`: menú flotante con opciones de control.
- `MenuModalStyles.ts`: estilos del menú.
- `GuideScreenStyles.ts`: estilos de la pantalla principal.

## 🔹 Configuración
- `babel.config.js`: presets para Expo, JSX, Flow; alias `@` para `src`.
- `app.json`: configuración visual, íconos, splash, estilo, arquitectura.

## 🔹 Datos
- `guideSteps`: array embebido en `useGuideLogic.ts`.