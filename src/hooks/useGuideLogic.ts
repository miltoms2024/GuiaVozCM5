// Archivo: src/hooks/useGuideLogic.ts (FINAL Y COMPLETO)

import React from 'react'; // Revertimos a importación simple para evitar errores TS
import { useNavigation } from '@react-navigation/native';
import * as Speech from 'expo-speech';

// ----------------------------------------------------------------------
// 1. DATA: PASOS DE LA GUÍA 
// ----------------------------------------------------------------------
const guideSteps = [
  { text: "Iniciando la fase de instrucción CM5. Los pasos se leerán en voz alta. Pulse 'INICIAR GUÍA' para comenzar." },
  { text: "Paso 1. Conecte el cable de alimentación principal (rojo) a la unidad CM5." },
  { text: "Paso 2. Active el interruptor de encendido del panel de control. Verifique que el indicador LED de estado se ilumine en verde." },
  { text: "Paso 3. En la interfaz de diagnóstico, seleccione 'Prueba de Sistema' y espere la confirmación." },
  { text: "GUÍA FINALIZADA. Guía completada. Unidad CM5 lista para la siguiente fase." },
];

// ----------------------------------------------------------------------
// 2. Hook de Lógica Central
// ----------------------------------------------------------------------

export const useGuideLogic = () => {
  const navigation = useNavigation();

  // ESTADOS 
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);
  const [guideText, setGuideText] = React.useState(guideSteps[0].text);
  const [isSpeaking, setIsSpeaking] = React.useState(false); // ESTADO CRÍTICO
  const [isMuted, setIsMuted] = React.useState(false); 
  const [isMenuVisible, setIsMenuVisible] = React.useState(false); 
  const [seconds, setSeconds] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);
  const [showTimer, setShowTimer] = React.useState(false);

  const isFinalStep = currentStepIndex === guideSteps.length - 1;

  // FUNCIÓN DE VOZ
  const speak = React.useCallback((text: string) => {
    if (isMuted) return;
    Speech.stop();
    setIsSpeaking(true);
    
    Speech.speak(text, {
      language: 'es-ES',
      rate: 0.9, 
      pitch: 1.0, 
      onDone: () => setIsSpeaking(false),
      onError: (e) => {
        console.error('Error al hablar:', e);
        setIsSpeaking(false);
      },
    });
  }, [isMuted]);

  // EFECTO DE CRONÓMETRO
  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => setSeconds(prevSeconds => prevSeconds + 1), 1000);
    } else if (!isRunning && seconds !== 0) {
      clearInterval(interval as NodeJS.Timeout);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isRunning, seconds]);

  // EFECTO DE PASO DE GUÍA
  React.useEffect(() => {
    setGuideText(guideSteps[currentStepIndex].text);
    const textToSpeak = guideSteps[currentStepIndex].text;

    if (!isMuted) {
      Speech.stop();
      speak(textToSpeak);
    }
    
    // Control del cronómetro
    if (currentStepIndex === 0 || isFinalStep) {
      setIsRunning(false); 
    } else {
      setIsRunning(true); 
    }
    
  }, [currentStepIndex, isMuted, isFinalStep, speak]);

  // FUNCIÓN PARA AVANZAR/RETROCEDER
  const changeStep = (direction: 'next' | 'prev') => {
    Speech.stop();
    setIsSpeaking(false);

    setCurrentStepIndex(prevIndex => {
      if (direction === 'next' && prevIndex < guideSteps.length - 1) return prevIndex + 1;
      if (direction === 'prev' && prevIndex > 0) return prevIndex - 1;
      return prevIndex;
    });
  };

  // FUNCIÓN PARA PAUSAR/REANUDAR CRONÓMETRO
  const toggleTimerPause = () => {
    if (currentStepIndex === 0 || isFinalStep) return; 
    setIsRunning(prev => !prev);
  };
  
  // FUNCIÓN PARA VOLVER AL INICIO DE LA GUÍA
  const resetGuide = () => {
    setCurrentStepIndex(0);
    setSeconds(0);
    setIsRunning(false);
    Speech.stop();
    setIsSpeaking(false);
    setIsMenuVisible(false); 
  };
  
  // LÓGICA DEL ENCABEZADO Y TEXTO
  const headerText = isFinalStep 
    ? "GUÍA FINALIZADA" 
    : currentStepIndex === 0 
      ? "FASE DE INSTRUCCIÓN" 
      : `Paso ${currentStepIndex} de ${guideSteps.length - 1}`;


  // FUNCIÓN PARA MANEJAR EL MENÚ
  const handleMenu = () => {
    Speech.stop();
    setIsSpeaking(false);
    setIsMenuVisible(true);
  };
  
  const toggleMute = () => {
      setIsMuted(prev => {
          if (!prev) Speech.stop();
          else speak(guideText);
          return !prev;
      });
  };
  
  // FUNCIÓN PARA REPETIR INSTRUCCIÓN
  const repeatInstruction = () => {
      speak(guideText);
  };
  
  // Retorna todas las variables y funciones necesarias
  return {
    // ESTADOS Y DATOS (isSpeaking incluido)
    guideText, isFinalStep, isMuted, isMenuVisible, seconds, isRunning, showTimer, currentStepIndex, headerText, isSpeaking,
    // Setters (para escribir)
    setIsMenuVisible, setShowTimer,
    // Funciones de acción
    toggleTimerPause, toggleMute, handleMenu, changeStep, resetGuide, repeatInstruction, speak,
    // Navegación
    navigation
  };
};