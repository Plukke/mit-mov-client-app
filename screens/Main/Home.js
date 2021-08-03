import React from 'react';
import { ScreenContainer, withTheme } from '@draftbit/ui';
import { View, StyleSheet } from 'react-native';
import FindRoom from '../../components/Room/FindRoom';

function HomeScreen() {
  return (
    <ScreenContainer
      style={styles.screenContainerGk}
      scrollable={false}
      hasSafeArea={true}
    >
      <View
        accessible={true}
        importantForAccessibility='auto'
        hitSlop={{}}
        pointerEvents='auto'
      />
      <FindRoom />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screenContainerGk: {
    justifyContent: 'space-between',
    marginBottom: 16
  }
});

export default withTheme(HomeScreen);
