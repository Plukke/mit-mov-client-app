import { useRef, useEffect } from 'react';
import { AppState } from 'react-native';
import * as Location from 'expo-location';
import shallow from 'zustand/shallow';
import { isPointInPolygon } from 'geolib';
import { useStore } from '../components/Provider';

export default function useLocation() {
  const appState = useRef(AppState.currentState);

  const {
    permissionStatus,
    isSearching,
    askAgain,
    location,
    insideZone,
    setLocation,
    setStatus,
    setSearching,
    setAskAgain,
    setInsideZone
  } = useStore((store) => store.locationStore, shallow);

  const _getPermissionStatus = async () => {
    const { status, canAskAgain } =
      await Location.getForegroundPermissionsAsync();

    if (status === 'denied' && !canAskAgain) {
      setStatus('permanent_denied');
      return;
    }

    setStatus(status);
  };

  const _handleAppStateChange = async (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      await _getPermissionStatus();
    }
    appState.current = nextAppState;
  };

  const startGeoFacing = async () => {
    setSearching(true);
  };

  const stopGeoFacing = () => {
    Location.stopGeofencingAsync('GEOFENCE_LOCATION');
    setSearching(false);
  };

  const promptDialogPermission = () => {
    setAskAgain(true);
  };

  useEffect(() => {
    const askPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      setAskAgain(false);

      if (status !== 'granted') {
        console.log('Request permission denied');
        return;
      }

      await Location.requestBackgroundPermissionsAsync();
      setStatus(status);
    };
    if (askAgain) askPermission();
  }, [askAgain]);

  useEffect(() => {
    const searchingZone = async () => {
      let isLocationServicesEnabled = await Location.hasServicesEnabledAsync();
      // let locationProviderStatus = await Location.getProviderStatusAsync();
      // console.log(`loc status: ${JSON.stringify(locationProviderStatus)}`);

      setSearching(true);

      if (isLocationServicesEnabled) {
        //Get loc
        let loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest
        });
        if (loc.coords !== null) {
          setLocation(loc);
        }

        //Watch loc
        await Location.watchPositionAsync(
          {
            enableHighAccuracy: true,
            distanceInterval: 5,
            timeInterval: 5000
          },
          (newLoc) => {
            const { latitude, longitude } = newLoc.coords;
            const enter = isPointInPolygon({ latitude, longitude }, [
              { longitude: -99.21923518180847, latitude: 19.431866950061796 },
              { longitude: -99.21842515468597, latitude: 19.432049068516996 },
              { longitude: -99.21807646751404, latitude: 19.429777632063306 },
              { longitude: -99.21885967254639, latitude: 19.429585393221746 },
              { longitude: -99.21922981739044, latitude: 19.431831538116228 }
            ]);
            setInsideZone(enter);
            setLocation(newLoc);
          }
        );
      }
    };
    if (isSearching) searchingZone();
  }, [isSearching]);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  return {
    permissionStatus,
    location,
    insideZone,
    isSearching,
    startGeoFacing,
    stopGeoFacing,
    promptDialogPermission
  };
}
