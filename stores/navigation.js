export const navigationInitialState = {
  navigationState: null
};

const navigationStore = (set, preloadedState) => ({
  ...navigationInitialState,
  ...preloadedState,
  setInitialState: (value) =>
    set((state) => ({
      navigationStore: { ...state.navigationStore, navigationState: value }
    }))
});

export default navigationStore;
