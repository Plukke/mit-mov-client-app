import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

export const getHeaderTitle = (route) => {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getRouteName(route) ?? 'Feed';
  switch (routeName) {
    case 'ListProducts':
      return 'Inicio';
    case 'Favorites':
      return 'Favoritos';
    case 'Orders':
      return 'Pedidos';
    case 'Coupons':
      return 'Cupones';
    case 'Profile':
      return 'Perfil';
  }
};

export const getRouteName = (route) => getFocusedRouteNameFromRoute(route);
