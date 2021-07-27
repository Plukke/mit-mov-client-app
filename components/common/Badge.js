import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from '@draftbit/core';
import { StyleSheet, View } from 'react-native';

function Badge(props) {
  const { theme } = props;

  return (
    <View
      style={[styles.Container, { backgroundColor: theme.colors.errorLight }]}
    >
      <View style={[styles.Content, { backgroundColor: theme.colors.error }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 16,
    height: 16,
    borderRadius: 8
  },
  Content: {
    height: 10,
    width: 10,
    borderRadius: 5
  }
});

Badge.propTypes = {
  theme: PropTypes.shape({
    colors: PropTypes.object.isRequired
  }).isRequired
};

export default withTheme(Badge);
