import React from 'react';
import PropTypes from 'prop-types';
import { FieldSearchBarFull, withTheme } from '@draftbit/ui';
import { StyleSheet, View } from 'react-native';

function SearchBar(props) {
  const { theme } = props;
  return (
    <View
      style={styles.Viewyk}
      accessible={true}
      importantForAccessibility='auto'
      hitSlop={{}}
      pointerEvents='auto'
    >
      <FieldSearchBarFull
        style={StyleSheet.flatten([
          styles.FieldSearchBarFullhv,
          {
            borderRadius: theme.borderRadius.global,
            borderColor: theme.colors.divider
          }
        ])}
        // onChange={(searchBarValue) => setSearchBarValue(searchBarValue)}
        placeholder='Search products.'
        // value={searchBarValue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Viewyk: {
    marginTop: 30,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  FieldSearchBarFullhv: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    width: '100%',
    borderRightWidth: 1,
    borderLeftWidth: 1
  }
});

SearchBar.propTypes = {
  theme: PropTypes.shape({
    colors: PropTypes.object.isRequired,
    borderRadius: PropTypes.object.isRequired
  }).isRequired
};

export default withTheme(SearchBar);
