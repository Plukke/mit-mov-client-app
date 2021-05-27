/* eslint-disable react/jsx-key */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListAddressesScreen from '../screens/Addresses/ListAddresses';
import NewAddressScreen from '../screens/Addresses/NewAddress';
import LocationScreen from '../screens/Addresses/Location';

const Stack = createStackNavigator();

const SCREENS = {
  ListAddress: {
    title: 'Direcciones',
    component: ListAddressesScreen
  },
  Location: {
    title: 'Ubicación',
    component: LocationScreen
  },
  NewAddress: {
    title: 'Nueva dirección',
    component: NewAddressScreen
  }
};

export default function AddressNavigator() {
  return (
    <Stack.Navigator mode='card'>
      {Object.keys(SCREENS).map((name) => {
        const { title, component } = SCREENS[name];
        return (
          <Stack.Screen
            key={name}
            name={name}
            getComponent={() => component}
            options={{ title }}
          />
        );
      })}
    </Stack.Navigator>
  );
}
