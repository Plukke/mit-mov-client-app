/* eslint-disable react/jsx-key */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListContactsScreen from '../screens/Contacts/ListContactsScreen';
import DetailContactScreen from '../screens/Contacts/DetailContact';
const Stack = createStackNavigator();

const SCREENS = {
  ListPayments: {
    title: 'Metodo de pago',
    component: ListContactsScreen
  },
  NewPayment: {
    title: 'Agregar pago',
    component: DetailContactScreen
  }
};

export default function PaymentNavigator() {
  return (
    <Stack.Navigator
      mode='card'
      screenOptions={{
        headerStyle: {
          backgroundColor: 'blue'
        }
      }}
    >
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
