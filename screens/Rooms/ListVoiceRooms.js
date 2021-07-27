import React from 'react';
import PropTypes from 'prop-types';

import { Text, View, StyleSheet, Button } from 'react-native';

export default function ListVoiceRoomsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Voice Rooms</Text>
      <Button
        title='Voice Room'
        onPress={() =>
          navigation.navigate('VoiceRoom', {
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

ListVoiceRoomsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};
