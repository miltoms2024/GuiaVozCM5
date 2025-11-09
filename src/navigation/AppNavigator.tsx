import React from 'react';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import GuideScreen from '../screens/GuideScreen';

import AprendizajesMenu from '../screens/AprendizajesMenu';
import AprendizajeHueco from '../screens/AprendizajeHueco';
import AprendizajePesacargas from '../screens/AprendizajePesacargas';
import AprendizajeBotoneras from '../screens/AprendizajeBotoneras';

export type RootStackParamList = {
  Home: undefined;
  Guide: undefined;
  AprendizajesMenu: undefined;
  AprendizajeHueco: undefined;
  AprendizajePesacargas: undefined;
  AprendizajeBotoneras: undefined;
  Agenda: undefined; // ← Añadido

};

export type NavigationProps = StackScreenProps<RootStackParamList, 'Home'>['navigation'];

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false } as never}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Guide" component={GuideScreen} />
     
      <Stack.Screen name="AprendizajesMenu" component={AprendizajesMenu} />
      <Stack.Screen name="AprendizajeHueco" component={AprendizajeHueco} />
      <Stack.Screen name="AprendizajePesacargas" component={AprendizajePesacargas} />
      <Stack.Screen name="AprendizajeBotoneras" component={AprendizajeBotoneras} />
    </Stack.Navigator>
  );
};

export default AppNavigator;