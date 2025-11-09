import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AprendizajePesacargas = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de Aprendizaje de Pesacargas</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  text: { fontSize: 24, color: '#fff' },
});

export default AprendizajePesacargas;