/* eslint-disable react/display-name */
import React from 'react';
import { Linking, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import shallow from 'zustand/shallow';

import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './RootNavigator';
import { useStore } from '../components/Provider';

const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';

export default function Navigation() {
  const { navigationState, setInitialState } = useStore(
    (store) => store.navigationStore,
    shallow
  );
  const [isReady, setIsReady] = React.useState(Platform.OS === 'web');

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== 'web' || initialUrl === null) {
          const savedState = await AsyncStorage?.getItem(
            NAVIGATION_PERSISTENCE_KEY
          );

          const state = savedState ? JSON.parse(savedState) : undefined;
          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    restoreState();
  }, []);

  if (!isReady) return null;

  return (
    <NavigationContainer
      initialState={navigationState}
      onStateChange={(state) =>
        AsyncStorage?.setItem(NAVIGATION_PERSISTENCE_KEY, JSON.stringify(state))
      }
    >
      <RootNavigator />
    </NavigationContainer>
  );
}
