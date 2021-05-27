import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import NotFoundScreen from '../screens/NotFound';

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName='Main'>
      <Stack.Screen
        name='Main'
        component={MainNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name='Auth' component={AuthNavigator} />
      <Stack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </Stack.Navigator>
  );
}
