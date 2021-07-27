/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import VoiceRoomScreen from '../screens/Rooms/VoiceRoom';
import ChatRoomScreen from '../screens/Rooms/ChatRoom';
import BackButton from '../components/common/BackButton';

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
  ChatRoom: {
    title: 'Sala de chat',
    component: ChatRoomScreen
  }
};

function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName='Tab' mode='modal'>
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
              headerLeft: () => <BackButton />,
              headerTransparent: true,
              headerStyle: {
                borderBottomColor: 'transparent',
                borderBottomWidth: 0
              }
            }}
          />
        );
      })}
    </Stack.Navigator>
  );
}

export default MainNavigator;
