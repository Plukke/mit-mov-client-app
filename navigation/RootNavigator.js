import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import NotFoundScreen from '../screens/NotFound';
import { useStore } from '../components/Provider';
import useAuth from '../hooks/useAuth';

import shallow from 'zustand/shallow';

const Stack = createStackNavigator();

export default function RootNavigator() {
  useAuth();

  const { loading, authenticated } = useStore(
    (store) => store.authStore,
    shallow
  );

  if (loading) return null;

  return (
    <Stack.Navigator>
      {authenticated ? (
        <>
          <Stack.Screen
            name='Main'
            component={MainNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='NotFound'
            component={NotFoundScreen}
            options={{ title: 'Oops!' }}
          />
        </>
      ) : (
        <Stack.Screen
          name='Auth'
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}
