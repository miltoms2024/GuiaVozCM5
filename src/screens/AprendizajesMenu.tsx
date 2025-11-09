// Archivo: src/screens/AprendizajesMenu.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type RootNavProp = StackNavigationProp<RootStackParamList>;

const AprendizajesMenu = () => {
  const navigation = useNavigation<RootNavProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona un Aprendizaje</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AprendizajeHueco')}>
        <Text style={styles.buttonText}>Aprendizaje de Hueco</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AprendizajePesacargas')}>
        <Text style={styles.buttonText}>Aprendizaje de Pesacargas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AprendizajeBotoneras')}>
        <Text style={styles.buttonText}>Aprendizaje de Botoneras</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  title: { fontSize: 28, color: '#fff', marginBottom: 40 },
  button: { backgroundColor: '#007BFF', padding: 20, borderRadius: 10, marginVertical: 10, width: '80%' },
  buttonText: { color: '#fff', fontSize: 18, textAlign: 'center' },
});

export default AprendizajesMenu;