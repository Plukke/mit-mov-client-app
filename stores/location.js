export const locationInitialState = {
  permissionStatus: 'undetermined',
  askAgain: true,
  location: {},
  isSearching: false,
  insideZone: false
};

const locationStore = (set, preloadedState) => ({
  ...locationInitialState,
  ...preloadedState,
  setLocation: (value) =>
    set((state) => ({
      locationStore: { ...state.locationStore, location: value }
    })),
  setStatus: (value) =>
    set((state) => ({
      locationStore: { ...state.locationStore, permissionStatus: value }
    })),
  setSearching: (value) =>
    set((state) => ({
      locationStore: { ...state.locationStore, isSearching: value }
    })),
  setAskAgain: (value) =>
    set((state) => ({
      locationStore: { ...state.locationStore, askAgain: value }
    })),
  setInsideZone: (value) =>
    set((state) => ({
      locationStore: { ...state.locationStore, insideZone: value }
    }))
});

export default locationStore;
