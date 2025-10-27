import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'; 

// Rutas relativas a las pantallas
import HomeScreen from '../screens/HomeScreen';
import GuideScreen from '../screens/GuideScreen';

// 1. DEFINICIÓN DE TIPOS DE RUTA
export type RootStackParamList = {
  Home: undefined; 
  Guide: undefined; 
};

// 2. EXPORTAMOS EL TIPO DE PROPS (Usado en las pantallas)
export type NavigationProps = StackNavigationProp<RootStackParamList, 'Home'>;

// 3. CREAMOS EL STACK con el tipado
const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Home"
      // Esto elimina el error 'children' y 'never' de tipado
      screenOptions={{ headerShown: false } as never} 
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Guide" component={GuideScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;