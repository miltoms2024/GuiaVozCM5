import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Importamos los tipos de navegación con la ruta relativa correcta
import { NavigationProps } from '../navigation/AppNavigator'; 

const APP_VERSION = "1.0.0"; 
const CREATOR = "Desarrollado por [Tu Nombre/Empresa]";

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProps>();

  const handleStartGuide = () => {
    navigation.navigate('Guide');
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <Text style={styles.title}>Guía de Voz CM5</Text> 
        <Text style={styles.subtitle}>Unidad lista para fase de instrucción</Text>
        
        <TouchableOpacity style={styles.startButton} onPress={handleStartGuide}>
          <Text style={styles.startButtonText}>INICIAR INSTRUCCIÓN</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Versión: {APP_VERSION}</Text>
        <Text style={styles.footerText}>{CREATOR}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000', padding: 20, justifyContent: 'space-between' },
  mainContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 55, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 20 },
  subtitle: { fontSize: 25, color: '#FFFFFF', marginBottom: 80, textAlign: 'center' },
  startButton: { backgroundColor: '#007BFF', paddingHorizontal: 50, paddingVertical: 30, borderRadius: 12 },
  startButtonText: { color: '#FFFFFF', fontSize: 26, fontWeight: 'bold' },
  footer: { alignItems: 'center', paddingBottom: 10 },
  footerText: { color: '#777777', fontSize: 12, marginTop: 5 }
});

export default HomeScreen;