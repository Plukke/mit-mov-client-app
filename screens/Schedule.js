import React from 'react';
import PropTypes from 'prop-types';

import { Text, View, StyleSheet, Button } from 'react-native';

export default function ScheduleScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schedule Screen</Text>
      <Button
        title='Direcciones'
        onPress={() => navigation.navigate('Addresses')}
      />
      <Button title='Pagos' onPress={() => navigation.navigate('Payments')} />
      <Button
        title='Cupones'
        onPress={() =>
          navigation.push('Tab', {
            screen: 'Coupons',
            params: { tabBarVisible: false }
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});

ScheduleScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired
  }).isRequired
};
