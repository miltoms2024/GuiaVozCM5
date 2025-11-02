import React from 'react';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import GuideScreen from '../screens/GuideScreen';

export type RootStackParamList = {
  Home: undefined;
  Guide: undefined;
};

export type NavigationProps = StackScreenProps<RootStackParamList, 'Home'>['navigation'];

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false } as never}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Guide" component={GuideScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;