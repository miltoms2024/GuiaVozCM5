import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../navigation/AppNavigator';

const APP_VERSION = "1.0.0";
const CREATOR = "Desarrollado por: MR-DEVELOPER";

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProps>();

  const handleStartGuide = () => {
    navigation.navigate('Guide');
  };

  const handleAprendizajes = () => {
    navigation.navigate('AprendizajesMenu');
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <Text style={styles.title}>Guía de Voz CM5</Text>
        <Text style={styles.subtitle}>Unidad lista para fase de instrucción</Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.startButton} onPress={handleStartGuide}>
            <Text style={styles.startButtonText}>PUESTA EN MARCHA</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.startButton} onPress={handleAprendizajes}>
            <Text style={styles.startButtonText}>APRENDIZAJES</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Versión: {APP_VERSION}</Text>
        <Text style={styles.footerText}>{CREATOR}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
    justifyContent: 'space-between',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 55,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 25,
    color: '#FFFFFF',
    marginBottom: 60,
    textAlign: 'center',
  },
  buttonGroup: {
    gap: 30,
    width: '100%',
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 55,
    paddingVertical: 30,
    borderRadius: 12,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  footerText: {
    color: '#777777',
    fontSize: 12,
    marginTop: 5,
  },
});

export default HomeScreen;