import React from 'react';
import { ScreenContainer, withTheme } from '@draftbit/ui';
import { KeyboardAvoidingView, StyleSheet, Platform } from 'react-native';
import SecretCodeForm from '../../components/Login/SecretCodeForm';

const SecretCodeScreen = () => {
  return (
    <ScreenContainer scrollable={true} hasSafeArea={true}>
      <KeyboardAvoidingView
        style={styles.KeyboardAvoidingView_4B}
        enabled={true}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={60}
      >
        <SecretCodeForm />
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  KeyboardAvoidingView_4B: {
    flexGrow: 1,
    justifyContent: 'space-between'
  }
});

export default withTheme(SecretCodeScreen);
