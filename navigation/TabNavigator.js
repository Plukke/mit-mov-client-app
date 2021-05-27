/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavoritesScreen from '../screens/Main/Favorites';
import CouponsScreen from '../screens/Main/Coupons';
import ProfileScreen from '../screens/Main/Profile';
import ListProductsScreen from '../screens/Products/ListProducts';

import ListOrdersScreen from '../screens/Orders/ListOrders';

const Tab = createBottomTabNavigator();

const TAB_SCREENS = {
  ListProducts: {
    title: 'Inicio',
    component: ListProductsScreen
  },
  Favorites: {
    title: 'Favoritos',
    component: FavoritesScreen
  },
  Orders: {
    title: 'Pedidos',
    component: ListOrdersScreen
  },
  Coupons: {
    title: 'Cupones',
    component: CouponsScreen
  },
  Profile: {
    title: 'Perfil',
    component: ProfileScreen
  }
};
const TabBarIcon = ({ color, size, route }) => {
  const icons = {
    ListProducts: 'home-outline',
    Favorites: 'heart-outline',
    Orders: 'clipboard-outline',
    Coupons: 'ticket-percent-outline',
    Profile: 'account-outline'
  };
  return (
    <MaterialCommunityIcons
      name={icons[route.name]}
      color={color}
      size={size}
    />
  );
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
            options={{
              title
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
