import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AgendaScreen from '../screens/AgendaScreen';
import AgendaDetailsScreen from '../screens/AgendaDetailsScreen';
import type { AgendaStackParamList } from './AgendaStackParamList';

const Stack = createNativeStackNavigator<AgendaStackParamList>();

export default function AgendaStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="AgendaScreen">
      <Stack.Screen
        name="AgendaScreen"
        component={AgendaScreen}
        options={{ title: 'Agenda' }}
      />
      <Stack.Screen
        name="AgendaDetailsScreen"
        component={AgendaDetailsScreen}
        options={{ title: 'Detalles de Agenda' }}
      />
    </Stack.Navigator>
  );
}