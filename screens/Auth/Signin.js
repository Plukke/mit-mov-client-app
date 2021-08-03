import React from 'react';
import PropTypes from 'prop-types';

import icon from '../../assets/icon.png';
import { Link, ScreenContainer, withTheme } from '@draftbit/ui';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SignInForm from '../../components/Login/SignInForm';

const SigninScreen = (props) => {
  const { theme } = props;
  const navigation = useNavigation();

  return (
    <ScreenContainer hasSafeArea={true} scrollable={true}>
      <KeyboardAvoidingView
        style={styles.KeyboardAvoidingViewxR}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled={true}
        // keyboardVerticalOffset={44}
      >
        <View style={styles.Viewwb}>
          <Image style={styles.Imagerc} resizeMode='contain' source={icon} />
          <Text
            style={[
              styles.Text_2E,
              {
                color: theme.colors.strong,
                textDecorationColor: theme.colors.primary
              }
            ]}
          >
            {'Bienvenido a mit~mov'}
          </Text>
          <Text
            style={[
              styles.SubText,
              {
                paddingTop: 14,
                color: theme.colors.light
              }
            ]}
          >
            {'¡Diviertete mientras manejas!'}
          </Text>
        </View>

        <SignInForm />

        <View style={styles.ViewPV}>
          <Text
            style={[theme.typography.subtitle2, { color: theme.colors.medium }]}
          >
            {'¿No tienes una cuenta?'}
          </Text>
          <Link
            style={[styles.LinkaZ, { color: theme.colors.primary }]}
            onPress={() => navigation.navigate('Signup')}
            title='Registrate'
          />
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

SigninScreen.propTypes = {
  theme: PropTypes.shape({
    colors: PropTypes.object.isRequired,
    typography: PropTypes.object.isRequired
  }).isRequired
};

const styles = StyleSheet.create({
  Imagerc: {
    width: 80,
    height: 80,
    marginBottom: 46
  },
  SubText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'System',
    fontWeight: '600'
  },
  Text_2E: {
    textTransform: 'none',
    fontSize: 26,
    textAlign: 'center',
    fontFamily: 'System',
    fontWeight: '700'
  },
  Viewwb: {
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 34,
    paddingTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 300,
    alignSelf: 'center'
  },
  LinkaZ: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 0,
    textAlign: 'center',
    fontFamily: 'System',
    fontWeight: '700'
  },
  ViewPV: {
    paddingBottom: 32,
    alignItems: 'center',
    paddingTop: 32
  },
  KeyboardAvoidingViewxR: {
    justifyContent: 'space-around',
    flexGrow: 1
  }
});

export default withTheme(SigninScreen);
