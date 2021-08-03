export const authInitialState = {
  user: null,
  credentials: null,
  loading: true,
  authenticated: false,
  step: 'signin' // signin, signup, secretcode
};

const authStore = (set, preloadedState) => ({
  ...authInitialState,
  ...preloadedState,
  setLoading: (value) =>
    set((state) => ({
      authStore: { ...state.authStore, loading: value }
    })),
  setAuthenticated: (value) =>
    set((state) => ({
      authStore: { ...state.authStore, authenticated: value }
    })),
  setUser: (value) =>
    set((state) => ({
      authStore: { ...state.authStore, user: value }
    })),
  setCredentials: (value) =>
    set((state) => ({
      authStore: { ...state.authStore, credentials: value }
    })),
  setStep: (value) =>
    set((state) => ({
      authStore: { ...state.authStore, step: value }
    })),
  clean: () => set({ authStore: { ...authInitialState } }, true)
});

export default authStore;
