import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// Importamos el AppNavigator desde la ruta relativa.
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    // Es crucial que NavigationContainer envuelva al AppNavigator
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}