// Archivo: src/components/MenuModal.tsx

import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './MenuModalStyles.ts'; // <- IMPORTACIÓN REQUERIDA

interface MenuModalProps {
  isVisible: boolean;
  onClose: () => void;
  isRunning: boolean;
  showTimer: boolean;
  onToggleTimerPause: () => void;
  onToggleShowTimer: () => void;
  onRepeatInstruction: () => void;
  onGoHome: () => void;
}

const MenuModal: React.FC<MenuModalProps> = ({
  isVisible,
  onClose,
  isRunning,
  showTimer,
  onToggleTimerPause,
  onToggleShowTimer,
  onRepeatInstruction,
  onGoHome,
}) => {
  const MenuOption: React.FC<{ text: string; icon: string; onPress: () => void }> = ({ text, icon, onPress }) => (
    <TouchableOpacity style={styles.menuOption} onPress={onPress}>
      <MaterialCommunityIcons name={icon as any} size={22} color="#FFFFFF" style={styles.menuIcon} />
      <Text style={styles.menuOptionText}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.menuContainer}>
          
          <View style={styles.header}>
            <Text style={styles.menuTitle}>Carta de Opciones</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <MaterialCommunityIcons name="close" size={24} color="#AAAAAA" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.optionsScroll}>

            <MenuOption
              text={isRunning ? "Pausar Cronómetro" : "Reanudar Cronómetro"}
              icon={isRunning ? "pause-circle-outline" : "play-circle-outline"}
              onPress={onToggleTimerPause}
            />
            <MenuOption
              text={showTimer ? "Ocultar Cronómetro" : "Mostrar Cronómetro"}
              icon={showTimer ? "timer-off-outline" : "timer-outline"}
              onPress={onToggleShowTimer}
            />
            <MenuOption
              text="Repetir Instrucción"
              icon="repeat"
              onPress={onRepeatInstruction}
            />
            <MenuOption
              text="Volver a Inicio"
              icon="home-import-outline" 
              onPress={onGoHome}
            />
            <MenuOption
              text="⚙️ Configuración de Voz"
              icon="cog-outline"
              onPress={() => console.log("Navegar a Ajustes de Voz (PENDIENTE)")} 
            />

            <View style={styles.separator} />
            
            <MenuOption
              text="Reportar Problema (Ej.)"
              icon="alert-circle-outline"
              onPress={() => console.log("Se podría implementar un formulario de reporte.")}
            />
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default MenuModal;