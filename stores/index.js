import React from 'react';
import create from 'zustand';
import authStore, { authInitialState } from './auth';
import locationStore, { locationInitialState } from './location';
import navigationStore, { navigationInitialState } from './navigation';

let store;

function initStore(preloadedState = {}) {
  return create((set) => ({
    navigationStore: navigationStore(
      set,
      preloadedState?.navigationStore ?? navigationInitialState
    ),
    authStore: authStore(set, preloadedState?.authStore ?? authInitialState),
    locationStore: locationStore(
      set,
      preloadedState?.locationStore ?? locationInitialState
    )
  }));
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Zustand state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useHydrate(initialState) {
  const state =
    typeof initialState === 'string' ? JSON.parse(initialState) : initialState;
  const store = React.useMemo(() => initializeStore(state), [state]);
  return store;
}
