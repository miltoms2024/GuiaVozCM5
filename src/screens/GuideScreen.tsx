import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MenuModal from "./../components/MenuModal";
import { useGuideLogic } from "./../hooks/useGuideLogic";
import styles from './GuideScreenStyles';

// ----------------------------------------------------------------------
// 1. LÓGICA DE TIEMPO Y FORMATO
// ----------------------------------------------------------------------
const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

// ----------------------------------------------------------------------
// 2. COMPONENTE PRINCIPAL (GuideScreen - Pura Vista)
// ----------------------------------------------------------------------
const GuideScreen = () => {
  const logic = useGuideLogic();

  return (
    <View style={{ flex: 1 }}>
      <MenuModal
        isVisible={logic.isMenuVisible}
        onClose={() => logic.setIsMenuVisible(false)}
        isRunning={logic.isRunning}
        showTimer={logic.showTimer}
        onToggleTimerPause={logic.toggleTimerPause}
        onToggleShowTimer={() => logic.setShowTimer(prev => !prev)}
        onRepeatInstruction={logic.repeatInstruction}
        onGoHome={() => logic.navigation.navigate('Home')}
      />

      <View style={styles.container}>
        {/* FILA SUPERIOR: TÍTULO y BOTONES */}
        <View style={styles.header}>
          <Text style={styles.phaseTitle}>{logic.headerText}</Text>
          <View style={styles.headerButtons}>
            {(() => {
              const glyphMap = (MaterialCommunityIcons as any).glyphMap || {};
              const homeName = glyphMap['home'] ? 'home' : 'home-outline';
              const menuName = glyphMap['menu'] ? 'menu' : 'dots-vertical';
              const volOn = glyphMap['volume-high'] ? 'volume-high' : 'volume-high';
              const volOff = glyphMap['volume-off'] ? 'volume-off' : 'volume-off';

              return (
                <>
                  <TouchableOpacity onPress={() => logic.navigation.navigate('Home')} style={styles.menuButton}>
                    <MaterialCommunityIcons name={homeName as any} size={20} color="white" />
                  </TouchableOpacity>
                  {logic.showTimer && (
                    <View style={styles.timerBox}>
                      <Text style={styles.timerText}>{formatTime(logic.seconds)}</Text>
                    </View>
                  )}
                  <TouchableOpacity onPress={logic.toggleMute} style={styles.menuButton}>
                    <MaterialCommunityIcons name={logic.isMuted ? (volOff as any) : (volOn as any)} size={20} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={logic.handleMenu} style={styles.menuButton}>
                    <MaterialCommunityIcons name={menuName as any} size={20} color="white" />
                  </TouchableOpacity>
                </>
              );
            })()}
          </View>
        </View>

        {/* CUERPO CENTRAL DE LA GUÍA */}
        <View style={styles.textContainer}>
          <Text style={styles.guideText}>{logic.guideText}</Text>
          {logic.isFinalStep && (
            <View style={styles.reportBox}>
              <Text style={styles.reportTitle}>TIEMPO TOTAL DE AUDITORÍA</Text>
              <Text style={styles.reportTime}>{formatTime(logic.seconds)}</Text>
            </View>
          )}
        </View>

        {/* CONTENEDOR DE 3 BOTONES EN LA PARTE INFERIOR */}
        <View style={styles.buttonRowWrapper}>
          <TouchableOpacity
            onPress={() => logic.changeStep('prev')}
            disabled={(logic.currentStepIndex === 0 && !logic.isFinalStep) || logic.isSpeaking}
            style={[styles.arrowButton, ((logic.currentStepIndex === 0 && !logic.isFinalStep) || logic.isSpeaking) && { opacity: 0.3 }]}
          >
            <MaterialCommunityIcons name="chevron-left" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={logic.isFinalStep ? logic.resetGuide : () => logic.changeStep('next')}
            disabled={logic.isSpeaking && !logic.isFinalStep}
            style={[styles.nextButton, (logic.isSpeaking && !logic.isFinalStep) && { opacity: 0.3 }]}
          >
            <Text style={styles.nextButtonText}>
              {logic.currentStepIndex === 0 ? "INICIAR GUÍA" : logic.isFinalStep ? "REINICIAR GUÍA" : "AVANZAR"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => logic.changeStep('next')}
            disabled={logic.isFinalStep || logic.isSpeaking}
            style={[styles.arrowButton, (logic.isFinalStep || logic.isSpeaking) && { opacity: 0.3 }]}
          >
            <MaterialCommunityIcons name="chevron-right" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default GuideScreen;