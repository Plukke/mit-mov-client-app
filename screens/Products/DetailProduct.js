import React from 'react';
import PropTypes from 'prop-types';

import { Text, View, StyleSheet } from 'react-native';

export default function DetailProduct({ route }) {
  const { productId } = route.params;

  console.log('PRODUCT ID', productId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail Product Screen</Text>
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

DetailProduct.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      productId: PropTypes.string.isRequired
    })
  })
};
