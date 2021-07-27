import React from 'react';
import { Touchable, withTheme } from '@draftbit/ui';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons';

import PropTypes from 'prop-types';

function BackButton({ theme }) {
  const navigation = useNavigation();
  return (
    <Touchable
      style={[styles.touchableO6, { backgroundColor: 'transparent' }]}
      onPress={() => navigation.goBack()}
    >
      <Ionicons name='md-chevron-back' color={theme.colors.strong} size={26} />
    </Touchable>
  );
}

const styles = StyleSheet.create({
  touchableO6: {
    borderRadius: 22,
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

BackButton.propTypes = {
  theme: PropTypes.shape({
    colors: PropTypes.object
  })
};

export default withTheme(BackButton);
