import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SingInScreen from '../screens/Auth/Signin';
import SignupScreen from '../screens/Auth/Signup';
import SecretCodeScreen from '../screens/Auth/SecretCode';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Login' component={SingInScreen} />
      <Stack.Screen name='Signup' component={SignupScreen} />
      <Stack.Screen name='SecretCode' component={SecretCodeScreen} />
    </Stack.Navigator>
  );
}
