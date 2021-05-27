/* eslint-disable react/jsx-key */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NewPaymentScreen from '../screens/Payments/NewPayment';
import ListPaymentsScreen from '../screens/Payments/ListPayments';
const Stack = createStackNavigator();

const SCREENS = {
  ListPayments: {
    title: 'Metodo de pago',
    component: ListPaymentsScreen
  },
  NewPayment: {
    title: 'Agregar pago',
    component: NewPaymentScreen
  }
};

export default function PaymentNavigator() {
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
