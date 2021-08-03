import React from 'react';
import PropTypes from 'prop-types';
import * as IntentLauncher from 'expo-intent-launcher';

import { Button, Touchable, withTheme } from '@draftbit/ui';
import { View, Text, StyleSheet, Linking, Platform } from 'react-native';
import SvgLocationMap from '../svgs/LocationMap';
import useLocation from '../../hooks/useLocation';

function Findroom({ theme }) {
  const {
    location,
    permissionStatus,
    isSearching,
    insideZone,
    promptDialogPermission,
    startGeoFacing,
    stopGeoFacing
  } = useLocation();

  const askLocationPersmission = async () => {
    if (permissionStatus !== 'permanent_denied') {
      promptDialogPermission();
      return;
    }
    if (Platform.OS == 'ios') {
      Linking.openURL('app-settings:');
    } else {
      IntentLauncher.startActivityAsync(
        IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS
      );
    }
  };

  return (
    <>
      <View
        style={styles.viewLJ}
        accessible={true}
        importantForAccessibility='auto'
        hitSlop={{}}
        pointerEvents='auto'
      >
        <SvgLocationMap width={150} height={150} />
        <Text
          style={StyleSheet.flatten([
            theme.typography.headline4,
            { color: theme.colors.strong }
          ])}
        >
          Encontrar Zona.
        </Text>
        <Text
          style={StyleSheet.flatten([
            theme.typography.subtitle1,
            { color: theme.colors.strong, textAlign: 'center' }
          ])}
        >
          Unete a una conversación y conoce nuevas personas cerca de ti.
        </Text>
        <Text>Lat: {location?.coords?.latitude}</Text>
        <Text>Lon: {location?.coords?.longitude}</Text>
        <Text style={{ fontWeight: 'bold' }}>
          {insideZone ? 'ADENTRO' : 'AFUERA'}
        </Text>
      </View>
      <View
        style={styles.viewWY}
        accessible={true}
        importantForAccessibility='auto'
        hitSlop={{}}
        pointerEvents='auto'
      >
        {permissionStatus !== 'granted' && permissionStatus !== 'undetermined' && (
          <Touchable
            style={styles.touchableEp}
            onPress={askLocationPersmission}
          >
            <Text
              style={StyleSheet.flatten([
                styles.textVb,
                theme.typography.button,
                { color: theme.colors.light }
              ])}
            >
              {permissionStatus === 'denied'
                ? 'Habilitar ubicación'
                : 'Ajustes'}
            </Text>
          </Touchable>
        )}
        <Button
          style={[
            styles.button1A,
            {
              backgroundColor: isSearching
                ? theme.colors.error
                : theme.colors.primary
            }
          ]}
          type='solid'
          disabled={permissionStatus !== 'granted'}
          onPress={isSearching ? stopGeoFacing : startGeoFacing}
        >
          {isSearching ? 'Detener busqueda' : 'Encontrar zona'}
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screenContainerGk: {
    justifyContent: 'space-between'
  },
  textVb: {
    height: 20,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  touchableEp: {
    marginBottom: 24
  },
  button1A: {
    width: '100%',
    height: 48,
    borderRadius: 24,
    textTransform: 'uppercase'
  },
  viewLJ: {
    alignItems: 'center',
    marginLeft: 16,
    marginRight: 16
  },
  viewWY: {
    marginLeft: 16,
    marginRight: 16
  }
});

Findroom.propTypes = {
  theme: PropTypes.object.isRequired
};

export default withTheme(Findroom);
