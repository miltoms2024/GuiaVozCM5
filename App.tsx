import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Importamos el AppNavigator desde la ruta relativa.
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  // Cargamos la fuente de los iconos para evitar que algunos iconos no se rendericen
  const [fontsLoaded] = useFonts({ ...MaterialCommunityIcons.font });

  if (!fontsLoaded) return null; // Espera a que se carguen las fuentes antes de renderizar la app

  return (
    // Es crucial que NavigationContainer envuelva al AppNavigator
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}