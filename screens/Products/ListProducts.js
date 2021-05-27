import React from 'react';
import PropTypes from 'prop-types';

import { Text, View, StyleSheet, Button } from 'react-native';

export default function ListProductsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>List Products Screen</Text>
      <Button
        title='Detail Product'
        onPress={() =>
          navigation.navigate('DetailProduct', {
            productId: 101
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

ListProductsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};
