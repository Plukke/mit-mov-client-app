import React from 'react';
import { Auth, Hub } from 'aws-amplify';
import shallow from 'zustand/shallow';
import * as SplashScreen from 'expo-splash-screen';

import { isAuthenticated } from '../lib/authService';
import { useStore } from '../components/Provider';

const handleSignIn = async (setUser) => {
  const user = await Auth.currentAuthenticatedUser();
  setUser(user);
};

export default function useAuth() {
  const { loading, setLoading, authenticated, setAuthenticated, setUser } =
    useStore((store) => store.authStore, shallow);
  React.useEffect(() => {
    const handleRedirect = async () => {
      Hub.listen('auth', async ({ payload: { event } }) => {
        switch (event) {
          case 'signIn':
            console.log('signin event');
            // checar si el usuario existe o crear
            await handleSignIn(setUser);
            break;
          case 'signOut':
            console.log('signout event');
            setLoading(true);
            setAuthenticated(false);
            handleRedirect();
            break;
        }
      });

      const isAuth = await isAuthenticated();
      setAuthenticated(isAuth);

      if (isAuth) {
        try {
          const user = await Auth.currentAuthenticatedUser();
          console.log('authenticated user', user);
        } catch (error) {
          console.log('check & getUser exception', error);
        }
      }

      setLoading(false);
      SplashScreen.hideAsync();
    };

    handleRedirect();
  }, []);

  return { loading, authenticated };
}
