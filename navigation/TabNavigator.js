/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';

import { MaterialIcons } from '@expo/vector-icons';
import { withTheme } from '@draftbit/ui';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/Main/Profile';
import ListContactsScreen from '../screens/Contacts/ListContactsScreen';
import Home from '../screens/Main/Home';

const Tab = createBottomTabNavigator();

const TAB_SCREENS = {
  Home: {
    title: 'Inicio',
    component: Home
  },
  /**
   * !Cambiar a lista de personas agregadas
   */
  Contacts: {
    title: 'Contactos',
    component: ListContactsScreen
  },
  Profile: {
    title: 'Perfil',
    component: ProfileScreen
  }
};
const TabBarIcon = ({ color, size, route }) => {
  const icons = {
    Home: 'home',
    Contacts: 'list-alt',
    Profile: 'person'
  };
  return <MaterialIcons name={icons[route.name]} color={color} size={size} />;
};

function TabNavigator({ theme }) {
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
      tabBarOptions={{
        activeTintColor: theme.colors.primary
      }}
    >
      {Object.keys(TAB_SCREENS).map((name) => {
        const { title, component } = TAB_SCREENS[name];
        return (
          <Tab.Screen
            key={name}
            name={name}
            getComponent={() => component}
            options={{
              title,
              headerShown: false
            }}
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

TabNavigator.propTypes = {
  theme: PropTypes.object
};

export default withTheme(TabNavigator);
