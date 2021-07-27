import React from 'react';
import { Provider, DefaultTheme } from '@draftbit/core';
import { StatusBar } from 'expo-status-bar';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import Amplify from 'aws-amplify';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { StoreProvider } from './components/Provider';
import { useHydrate } from './stores';
import config from './aws-exports';
// import { USER_POOL_ID, USER_POOL_WEB_CLIENT } from '@env';

Amplify.configure(config);

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    error: '#EF4444',
    errorLight: '#FEE2E2',
    background: '#F8FAFC',
    light: '#94A3B8',
    medium: '#475569',
    strong: '#1E293B'
  }
};

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const store = useHydrate();

  if (!isLoadingComplete) return null;
  console.log('theme', theme);
  return (
    <Provider theme={theme}>
      <StoreProvider store={store}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </StoreProvider>
    </Provider>
  );
}
