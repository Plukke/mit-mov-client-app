/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/Main/Profile';
import ListVoiceRoomsScreen from '../screens/Rooms/ListVoiceRooms';
import ListChatsScreen from '../screens/Rooms/ListChats';

const Tab = createBottomTabNavigator();

const TAB_SCREENS = {
  Home: {
    title: 'Inicio',
    component: ListVoiceRoomsScreen
  },
  /**
   * !Cambiar a lista de personas agregadas
   */
  Chats: {
    title: 'Chats',
    component: ListChatsScreen
  },
  Profile: {
    title: 'Perfil',
    component: ProfileScreen
  }
};
const TabBarIcon = ({ color, size, route }) => {
  const icons = {
    Home: 'home-outline',
    Chats: 'chatbubble-outline',
    Profile: 'person-outline'
  };
  return <Ionicons name={icons[route.name]} color={color} size={size} />;
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName='ListProducts'
      screenOptions={({ route }) => {
        const { tabBarVisible = true } = route.params || {};
        return {
          tabBarIcon: (props) => <TabBarIcon {...props} route={route} />,
          tabBarVisible
        };
      }}
    >
      {Object.keys(TAB_SCREENS).map((name) => {
        const { title, component } = TAB_SCREENS[name];
        return (
          <Tab.Screen
            key={name}
            name={name}
            getComponent={() => component}
            options={{ title }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

TabBarIcon.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  route: PropTypes.object
};
