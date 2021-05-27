/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';

import {
  createStackNavigator,
  HeaderBackButton
} from '@react-navigation/stack';

import DetailProduct from '../screens/Products/DetailProduct';
import { getHeaderTitle } from '../lib/util';
import ScheduleScreen from '../screens/Schedule';
import AddressNavigator from './AddressNavigator';
import DetailOrderScreen from '../screens/Orders/DetailOrder';
import ReferralsScreen from '../screens/Main/Referrals';
import PaymentNavigator from './PaymentNavigator';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

const SCREENS = {
  DetailProduct: {
    title: 'Producto',
    component: DetailProduct
  },
  DetailOrder: {
    title: 'Orden',
    component: DetailOrderScreen
  },
  Schedule: {
    title: 'Agendar',
    component: ScheduleScreen
  },
  Addresses: {
    title: 'Mis direcciones',
    component: AddressNavigator,
    headerShown: false
  },
  Payments: {
    title: 'Pagos',
    component: PaymentNavigator,
    headerShown: false
  },
  Referrals: {
    title: 'Referidos',
    component: ReferralsScreen
  }
};

export default function MainNavigator({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName='Tab'
      mode='modal'
      screenOptions={({ route }) => {
        /**
         * ? Se puede reemplazar con header para meter un componente
         */
        return {
          headerTitle: getHeaderTitle(route),
          headerTitleAlign: 'center'
          // headerRight: ScheduleButton
        };
      }}
    >
      <Stack.Screen name='Tab' component={TabNavigator} />
      {Object.keys(SCREENS).map((name) => {
        const { title, component, headerShown = true } = SCREENS[name];
        return (
          <Stack.Screen
            key={name}
            name={name}
            getComponent={() => component}
            options={{
              title,
              headerShown,
              headerLeft: (props) => (
                <HeaderBackButton
                  {...props}
                  onPress={() => navigation.goBack()}
                />
              )
            }}
          />
        );
      })}
    </Stack.Navigator>
  );
}
