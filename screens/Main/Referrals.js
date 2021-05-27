import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function ReferralsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Referrals Screen</Text>
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
