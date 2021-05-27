import React from 'react';
import PropTypes from 'prop-types';

import { Text, View, StyleSheet } from 'react-native';

export default function DetailOrder({ route }) {
  const { orderId } = route.params;

  console.log('ORDER ID', orderId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail Order Screen</Text>
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

DetailOrder.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      orderId: PropTypes.string.isRequired
    })
  })
};
