import React from 'react';
import PropTypes from 'prop-types';

import { Text, View, StyleSheet } from 'react-native';

export default function ChatRoomScreen({ route }) {
  const { roomId } = route.params;

  console.log('ROOM ID', roomId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat Room Screen</Text>
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

ChatRoomScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      roomId: PropTypes.string.isRequired
    })
  })
};
