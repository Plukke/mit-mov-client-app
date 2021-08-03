import React from 'react';
import { Button } from '@draftbit/ui';
import { Text, View, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';

export default function ProfileScreen() {
  async function signOut() {
    try {
      await Auth.signOut({ global: true });
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <Button style={styles.buttonP2} type='outline' onPress={signOut}>
        Cerrar sesión
      </Button>
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
  },
  buttonP2: {
    marginTop: 16,
    alignSelf: 'center',
    width: '50%'
  }
});
