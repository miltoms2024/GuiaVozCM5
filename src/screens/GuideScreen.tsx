import React from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'; 
import * as Speech from 'expo-speech';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../navigation/AppNavigator'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Importación de Iconos

// Mensajes de la Guía
const INITIAL_GUIDE_TEXT = 
  "Iniciando la fase de instrucción CM5. Los pasos se leerán en voz alta. Pulse 'INICIAR GUÍA' para comenzar.";

const GUIDE_STEPS = [
  "PASO 1: Coloca el fusible principal en la posición de APAGADO. Confirma pulsando 'AVANZAR'.",
  "PASO 2: Abre la tapa de acceso. Confirma pulsando 'AVANZAR'.",
  "PASO 3: Verifica la tensión del cable rojo. El valor debe ser 12 voltios. Pulsa 'AVANZAR' para continuar."
];

const GuideScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  
  const [guideText, setGuideText] = React.useState(INITIAL_GUIDE_TEXT);
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(0); 
  
  // LÓGICA DE SILENCIO
  const [isMuted, setIsMuted] = React.useState(false); 

  const toggleMute = () => {
    Speech.stop(); 
    setIsSpeaking(false);
    setIsMuted(prev => !prev); 
  };
  
  // Función para que la App hable (con chequeo de muteo)
  const speak = (text: string) => {
    if (isMuted) { 
      return; 
    }
    
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
    Speech.stop(); 
    setIsSpeaking(false);

    Alert.alert(
      "Menú de Opciones",
      "Selecciona una acción:",
      [
        {
          text: "🔁 Repetir Instrucción",
          onPress: () => {
            speak(guideText);
          },
        },
        {
          text: "🏠 Volver a Inicio",
          onPress: () => {
            navigation.navigate('Home'); 
          },
        },
        { text: "Cerrar Menú", style: 'cancel' },
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
    if (isSpeaking) {
      return; 
    }
    
    if (currentStep > GUIDE_STEPS.length) {
      setCurrentStep(0);
      return; 
    }
    
    const nextIndex = currentStep + 1;
    nextStep(nextIndex);
  };

  // Lógica para retroceder un paso
  const handlePrevStep = () => {
    if (currentStep > 1 && !isSpeaking) {
      const prevIndex = currentStep - 1;
      setCurrentStep(prevIndex);
      const newText = GUIDE_STEPS[prevIndex - 1];
      setGuideText(newText);
      speak(newText);
    } else if (currentStep === 1 && !isSpeaking) {
      // Si estamos en el Paso 1, regresamos al mensaje de bienvenida (Paso 0)
      setCurrentStep(0);
      setGuideText(INITIAL_GUIDE_TEXT);
      speak(INITIAL_GUIDE_TEXT);
    }
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
  }, []); 
  
  const isFinalStep = currentStep > GUIDE_STEPS.length;
  
  const buttonText = currentStep === 0 ? "INICIAR GUÍA" : 
                       isFinalStep ? "REINICIAR GUÍA" : 
                       "AVANZAR (PASO COMPLETADO)";
  return (
    <View style={styles.container}>
      
      {/* FILA SUPERIOR: TÍTULO y BOTONES */}
      <View style={styles.header}>
        <Text style={styles.phaseTitle}>FASE DE INSTRUCCIÓN</Text>
        
        {/* CONTENEDOR DE BOTONES (A LA DERECHA) */}
        <View style={styles.headerButtons}> 
          {/* BOTÓN DE SILENCIO/ACTIVAR */}
          <TouchableOpacity onPress={toggleMute} style={styles.menuButton}>
            <MaterialCommunityIcons 
              name={isMuted ? "volume-off" : "volume-high"} 
              size={20} 
              color="white" 
            />
          </TouchableOpacity>
        
          {/* BOTÓN DE MENÚ EXISTENTE */}
          <TouchableOpacity onPress={handleMenu} style={styles.menuButton}>
            <Text style={styles.menuButtonText}>MENÚ</Text> 
          </TouchableOpacity>
        </View>
      </View>
      
      {/* CUERPO CENTRAL DE LA GUÍA */}
      <View style={styles.textContainer}>
        <Text style={styles.guideText}>{guideText}</Text>
      </View>
      
      {/* CONTENEDOR DE 3 BOTONES EN LA PARTE INFERIOR */}
      <View style={styles.buttonRowWrapper}> 
        
        {/* BOTÓN IZQUIERDO: RETROCEDER (Flecha) */}
        <TouchableOpacity 
          style={styles.arrowButton} // Usa el estilo base, sin errores de referencia
          onPress={handlePrevStep} 
          disabled={currentStep === 0 || isSpeaking || isFinalStep} 
        >
          <MaterialCommunityIcons name="arrow-left" size={30} color="white" />
        </TouchableOpacity>
        
        {/* BOTÓN CENTRAL: AVANZAR/INICIAR/REINICIAR */}
        <TouchableOpacity 
          style={styles.nextButton} 
          onPress={handleButtonPress} 
          disabled={isSpeaking}
        >
          <Text style={styles.nextButtonText}>{buttonText}</Text>
        </TouchableOpacity>
        
        {/* BOTÓN DERECHO: AVANZAR (Flecha) */}
        <TouchableOpacity 
          style={styles.arrowButton} // Usa el estilo base, sin errores de referencia
          onPress={handleButtonPress} 
          disabled={isSpeaking || isFinalStep} 
        >
          <MaterialCommunityIcons name="arrow-right" size={30} color="white" />
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

// Estilos de la aplicación
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000', paddingTop: 40, paddingHorizontal: 20, justifyContent: 'space-between' },
  
  // FILA SUPERIOR: TÍTULO y BOTONES
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 30,
    width: '100%', 
  },
  
  // Contenedor que agrupa el icono de silencio y el botón MENÚ
  headerButtons: { 
    flexDirection: 'row', 
    alignItems: 'center',
  },
  
  // Estilo del TÍTULO
  phaseTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#FF4500',
    flexShrink: 1, 
    marginRight: 10,
  },
  
  // Estilo único para el botón de menú y silencio
  menuButton: { 
    backgroundColor: '#333333', 
    padding: 10, 
    borderRadius: 5, 
    marginLeft: 10, 
  },
  menuButtonText: { color: '#FFFFFF', fontWeight: 'bold' },
  
  textContainer: { flex: 1, justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: 0 },
  guideText: { fontSize: 28, color: '#FFFFFF', textAlign: 'left', lineHeight: 40 },
  
  // ESTILOS PARA LA FILA INFERIOR DE 3 BOTONES
  buttonRowWrapper: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingBottom: 40, 
    paddingTop: 20 
  },
  
  // Estilo para los botones de flecha (izq/der) - ¡CONTRASTE ALTO!
  arrowButton: {
    backgroundColor: '#FF4500', // Color NARANJA para alto contraste
    width: 60, // Ancho fijo para las flechas
    height: 60, // Altura fija
    borderRadius: 12, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Estilo para el botón central AVANZAR (más estrecho)
  nextButton: { 
    backgroundColor: '#007BFF', 
    flex: 1, // Toma todo el espacio restante en el centro
    marginHorizontal: 10, // Separación entre flechas y el botón central
    paddingVertical: 15, // Un poco menos de padding para hacerlo más compacto
    borderRadius: 12,
  },
  nextButtonText: { 
    color: '#FFFFFF', 
    fontWeight: 'bold', 
    fontSize: 20, 
    textAlign: 'center', 
  }, 
});

export default GuideScreen;