import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AgendaStackParamList } from '../navigation/AgendaStackParamList';

type AgendaNavProp = NativeStackNavigationProp<AgendaStackParamList, 'AgendaScreen'>;

export default function AgendaScreen() {
  const navigation = useNavigation<AgendaNavProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de Agenda</Text>
      <Button
        title="Ir a Detalles"
        onPress={() => navigation.navigate('AgendaDetailsScreen', { id: '123' })}
      />
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
    marginBottom: 20,
  },
});