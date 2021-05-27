import React from 'react';
import PropTypes from 'prop-types';

import { Text, View, StyleSheet, Button } from 'react-native';

export default function ListOrdersScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>List Orders Screen</Text>
      <Button
        title='Detail Order'
        onPress={() =>
          navigation.navigate('DetailOrder', {
            orderId: 205
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

ListOrdersScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};
