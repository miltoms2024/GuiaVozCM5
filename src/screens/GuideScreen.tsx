// Archivo: src/screens/GuideScreen.tsx (VERSIÓN FINAL Y COMPLETA)

import React from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'; 
import * as Speech from 'expo-speech';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../navigation/AppNavigator'; 

// Mensajes de la Guía
const INITIAL_GUIDE_TEXT = 
  "Iniciando la fase de instrucción CM5. Los pasos se leerán en voz alta. Pulse 'INICIAR GUÍA' para comenzar.";

const GUIDE_STEPS = [
  "PASO 1: Coloca el fusible principal en la posición de APAGADO. Confirma diciendo 'LISTO'.",
  "PASO 2: Abre la tapa de acceso. Confirma diciendo 'ADELANTE'.",
  "PASO 3: Verifica la tensión del cable rojo. El valor debe ser 12 voltios. Di 'LEÍDO' para continuar."
];

const GuideScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  
  // Usamos React.useState para la compatibilidad
  const [guideText, setGuideText] = React.useState(INITIAL_GUIDE_TEXT);
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(0); 
  
  // Función para que la App hable
  const speak = (text: string) => {
    Speech.stop(); 
    setIsSpeaking(true); 
    Speech.speak(text, {
      language: 'es-ES',
      rate: 0.9, 
      pitch: 1.0, 
      onDone: () => {
        setIsSpeaking(false);
      },
      onError: () => setIsSpeaking(false)
    });
  };
  
  // FUNCIÓN PARA EL MENÚ DE OPCIONES
  const handleMenu = () => {
    Alert.alert(
      "Menú de Configuración",
      "Opciones disponibles:",
      [
        {
          text: "Volver a Inicio",
          onPress: () => {
            Speech.stop(); 
            navigation.navigate('Home'); 
          },
        },
        { text: "Cerrar", style: 'cancel' },
      ]
    );
  };
  
  // Lógica de avance de pasos
  const nextStep = (nextIndex: number) => {
    if (nextIndex <= GUIDE_STEPS.length) {
      setCurrentStep(nextIndex);
      const newText = GUIDE_STEPS[nextIndex - 1];
      setGuideText(newText);
      speak(newText);
    } else {
      const finalMessage = "Guía completada. Unidad CM5 lista para la siguiente fase.";
      setGuideText(finalMessage);
      speak(finalMessage);
      setCurrentStep(GUIDE_STEPS.length + 1); 
    }
  };

  // Función para el botón (LÓGICA AJUSTADA)
  const handleButtonPress = () => {
    // Si la App está hablando, ignoramos el clic.
    if (isSpeaking) {
        return; 
    }
    
    // Si ya es el paso final, reiniciamos el contador a 0.
    if (currentStep > GUIDE_STEPS.length) {
        setCurrentStep(0);
        return; 
    }
    
    // En cualquier otro caso, avanzamos.
    const nextIndex = currentStep + 1;
    nextStep(nextIndex);
  };

  // EFECTO 1: Inicia la voz de bienvenida una vez al montar o reiniciar.
  React.useEffect(() => {
    if (currentStep === 0) {
        speak(INITIAL_GUIDE_TEXT);
    }
  }, [currentStep]); 
  
  // EFECTO 2: Limpieza (Importante para detener la voz al salir)
  React.useEffect(() => {
    return () => {
        Speech.stop();
    };
  }, []); // Se ejecuta solo al desmontar el componente
  
  const isFinalStep = currentStep > GUIDE_STEPS.length;
  
  const buttonText = currentStep === 0 ? "INICIAR GUÍA" : 
                     isFinalStep ? "REINICIAR GUÍA" : 
                     "SIMULAR COMANDO (AVANZAR)";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.phaseTitle}>FASE DE INSTRUCCIÓN - Paso {isFinalStep ? 'Final' : currentStep}</Text>
        <TouchableOpacity onPress={handleMenu} style={styles.menuButton}>
            <Text style={styles.menuButtonText}>MENÚ</Text> 
        </TouchableOpacity>
      </View>
      
      <View style={styles.textContainer}>
        <Text style={styles.guideText}>{guideText}</Text>
      </View>
      
      <View style={styles.buttonWrapper}>
        <TouchableOpacity 
          style={styles.nextButton} 
          onPress={handleButtonPress} 
          // Deshabilitamos el botón SÓLO cuando la voz está activa.
          disabled={isSpeaking}
        >
          <Text style={styles.nextButtonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000', paddingTop: 40, paddingHorizontal: 20, justifyContent: 'space-between' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  phaseTitle: { fontSize: 24, fontWeight: 'bold', color: '#FF4500' },
  menuButton: { backgroundColor: '#333333', padding: 10, borderRadius: 5 },
  menuButtonText: { color: '#FFFFFF', fontWeight: 'bold' },
  textContainer: { flex: 1, justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: 0 },
  guideText: { fontSize: 28, color: '#FFFFFF', textAlign: 'left', lineHeight: 40 },
  buttonWrapper: { paddingBottom: 40, alignItems: 'center', paddingTop: 20 },
  nextButton: { backgroundColor: '#FF4500', paddingHorizontal: 50, paddingVertical: 20, borderRadius: 12 },
  nextButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 22 }
});

export default GuideScreen;