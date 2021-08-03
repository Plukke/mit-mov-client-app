import React from 'react';
import { ScreenContainer } from '@draftbit/ui';
import { KeyboardAvoidingView, StyleSheet, Platform } from 'react-native';
import SignUpForm from '../../components/Login/SignUpForm';

const MagicLinkLoginScreen = () => {
  return (
    <ScreenContainer scrollable={true} hasSafeArea={true}>
      <KeyboardAvoidingView
        style={styles.KeyboardAvoidingViewl4}
        enabled={true}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={60}
      >
        <SignUpForm />
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  KeyboardAvoidingViewl4: {
    flexGrow: 1,
    justifyContent: 'space-between'
  }
});

export default MagicLinkLoginScreen;
