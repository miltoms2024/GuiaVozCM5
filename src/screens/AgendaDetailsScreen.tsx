import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { AgendaStackParamList } from '../navigation/AgendaStackParamList';

export default function AgendaDetailsScreen() {
  const route = useRoute<RouteProp<AgendaStackParamList, 'AgendaDetailsScreen'>>();
  const { id } = route.params ?? { id: undefined };

  // Simulación de datos adicionales
  const nombre = 'Carlos';
  const ctc = 'CTC-001';

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Detalles de Agenda</Text>
      <Text style={styles.text}>ID recibido: {id}</Text>
      <Text style={styles.text}>Nombre: {nombre}</Text>
      <Text style={styles.text}>CTC: {ctc}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
});