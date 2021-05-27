import React from 'react';
import PropTypes from 'prop-types';

import { Text, View, StyleSheet, Button } from 'react-native';

export default function NewAddressScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Address Screen</Text>
      <Button
        title='Ubicación'
        onPress={() => navigation.navigate('Location')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  }
});

NewAddressScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};
