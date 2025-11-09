// Archivo: src/hooks/useGuideLogic.ts (FINAL Y CORREGIDO - Listo para pegar)

import React from 'react'; // Revertimos a importación simple para evitar errores TS
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
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
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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

  // FUNCIÓN DE VOZ (LA MANTENEMOS PARA 'repeatInstruction')
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
    console.log('[speak] isMuted=', isMuted, 'text=', text);
  }, [isMuted]);

  // EFECTO DE CRONÓMETRO (INTACTO)
  React.useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;
    if (isRunning) {
      interval = setInterval(() => setSeconds(prevSeconds => prevSeconds + 1), 1000);
    } else if (!isRunning && seconds !== 0) {
            if (interval) clearInterval(interval);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isRunning, seconds]);

  // 🛑 EFECTO DE PASO DE GUÍA (CORREGIDO: Ahora llama a Speech.speak directamente)
  React.useEffect(() => {
    setGuideText(guideSteps[currentStepIndex].text);
    const textToSpeak = guideSteps[currentStepIndex].text;

    // 1. Lógica de Voz (ESTABLE)
    Speech.stop(); 
    setIsSpeaking(false);

    if (!isMuted) {
        setIsSpeaking(true);
        Speech.speak(textToSpeak, {
            language: 'es-ES',
            rate: 0.9, 
            pitch: 1.0, 
            onDone: () => setIsSpeaking(false), 
            onError: () => setIsSpeaking(false),
        });
    }
    
    // 2. Control del cronómetro (INTACTO)
    if (currentStepIndex === 0 || isFinalStep) {
      setIsRunning(false); 
    } else {
      setIsRunning(true); 
    }
    
    // 3. Limpieza
    return () => {
        Speech.stop();
    };
    
// DEPENDENCIAS ESTABLES: No incluyen 'speak'
  }, [currentStepIndex, isMuted, isFinalStep]); 

  // FUNCIÓN PARA AVANZAR/RETROCEDER (INTACTA)
  const changeStep = (direction: 'next' | 'prev') => {
    Speech.stop();
    setIsSpeaking(false);

    setCurrentStepIndex(prevIndex => {
      if (direction === 'next' && prevIndex < guideSteps.length - 1) return prevIndex + 1;
      if (direction === 'prev' && prevIndex > 0) return prevIndex - 1;
      return prevIndex;
    });
  };

  // FUNCIÓN PARA PAUSAR/REANUDAR CRONÓMETRO (INTACTA)
  const toggleTimerPause = () => {
    if (currentStepIndex === 0 || isFinalStep) return; 
    setIsRunning(prev => !prev);
  };
  
  // FUNCIÓN PARA VOLVER AL INICIO DE LA GUÍA (INTACTA)
  const resetGuide = () => {
    setCurrentStepIndex(0);
    setSeconds(0);
    setIsRunning(false);
    Speech.stop();
    setIsSpeaking(false);
    setIsMenuVisible(false); 
  };
  
  // LÓGICA DEL ENCABEZADO Y TEXTO (INTACTA)
  const headerText = isFinalStep 
    ? "GUÍA FINALIZADA" 
    : currentStepIndex === 0 
      ? "FASE DE INSTRUCCIÓN" 
      : `Paso ${currentStepIndex} de ${guideSteps.length - 1}`;


  // FUNCIÓN PARA MANEJAR EL MENÚ (INTACTA)
  const handleMenu = () => {
    Speech.stop();
    setIsSpeaking(false);
    setIsMenuVisible(true);
  };
  
  // 🛑 FUNCIÓN PARA MUTE/UNMUTE (CORREGIDA: Ya no llama a 'speak')
  const toggleMute = () => {
      setIsMuted(prev => {
          if (!prev) Speech.stop();
          console.log('[toggleMute] from=', isMuted, '=>', !isMuted);
          // ELIMINAMOS la llamada a 'else speak(guideText);'
          return !prev;
      });
  };
  
  // FUNCIÓN PARA REPETIR INSTRUCCIÓN (INTACTA)
  const repeatInstruction = () => {
      speak(guideText);
  };
  
  // Retorna todas las variables y funciones necesarias (INTACTA)
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