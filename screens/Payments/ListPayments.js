import React from 'react';
import PropTypes from 'prop-types';

import { Text, View, StyleSheet, Button } from 'react-native';

export default function ListPaymentsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>List Payments Screen</Text>
      <Button
        title='Agregar metodo de pago'
        onPress={() => navigation.navigate('NewPayment')}
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

ListPaymentsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};
