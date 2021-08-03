/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import VoiceRoomScreen from '../screens/Rooms/VoiceRoom';
import BackButton from '../components/common/BackButton';
import DetailContactScreen from '../screens/Contacts/DetailContact';

const Stack = createStackNavigator();

const SCREENS = {
  /**
   * ! Cambiar a Drawer para ver chat
   */
  VoiceRoom: {
    title: 'Sala de voz',
    component: VoiceRoomScreen,
    headerShown: true
  },
  /**
   * ! Cambiar al detalle del contacto
   */
  DetailContact: {
    title: 'Detalle del contacto',
    component: DetailContactScreen
  }
};

function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName='Tab' mode='modal'>
      <Stack.Screen
        name='Tab'
        component={TabNavigator}
        options={{ headerShown: false }}
      />
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
              headerLeft: () => <BackButton />,
              headerTransparent: true
            }}
          />
        );
      })}
    </Stack.Navigator>
  );
}

export default MainNavigator;
