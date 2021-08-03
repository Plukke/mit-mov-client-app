import React from 'react';
import PropTypes from 'prop-types';

import { Text, View, StyleSheet, Button } from 'react-native';

export default function ListContactsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>List Contacts</Text>
      <Button
        title='Detail Contact'
        onPress={() =>
          navigation.navigate('DetailContact', {
            roomId: '205'
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

ListContactsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};
