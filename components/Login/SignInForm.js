import React from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/core';
import { useFormik } from 'formik';
import { StyleSheet, View } from 'react-native';
import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js';

import Input from '../common/Input';
import { ButtonSolid, withTheme } from '@draftbit/ui';
import { SignInValidationSchema } from './Schema';
import { signIn } from '../../lib/authService';

const parseDigits = (string) => (string.match(/\d+/g) || []).join('');

function SignInForm(props) {
  const { theme } = props;
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();
  const formik = useFormik({
    initialValues: {
      phone_number: ''
    },
    validationSchema: SignInValidationSchema,
    onSubmit: async (values, actions) => {
      setLoading(true);
      const username = parsePhoneNumberFromString(
        `+52${values.phone_number}`
      ).number;

      try {
        await signIn(username);
        setLoading(false);
        navigation.navigate('SecretCode');
      } catch (error) {
        let err;
        if (error.code === 'NotAuthorizedException') {
          // The error happens when the incorrect password is provided
          err = 'Contraseña incorrecta';
        } else if (error.code === 'UserNotFoundException') {
          // The error happens when the supplied username/email does not exist in the Cognito user pool
          err = 'Usuario no encontrado';
        } else {
          err = 'Error al inciar sesión';
        }
        console.log('ERROR', err);
        // setLoginErrors((state) => [
        //   ...state,
        //   err ?? 'Error al iniciar sesión, intenta más tarde'
        // ]);
        setLoading(false);
        actions.setSubmitting(false);
      }
    }
  });

  const formatPhone = (value) => {
    const digits = parseDigits(`${value}`);
    return new AsYouType('MX').input(`${digits}`);
  };

  return (
    <View style={styles.ViewEB}>
      <Input
        name='phone_number'
        value={formik.values['phone_number']}
        label='Teléfono'
        keyboardType='phone-pad'
        error={formik.errors['phone_number'] && formik.touched['phone_number']}
        helperText={
          formik.errors['phone_number'] && formik.touched['phone_number']
            ? formik.errors['phone_number']
            : ''
        }
        formik={formik}
        leftIconMode='inset'
        leftIconName='MaterialCommunityIcons/phone'
        parse={formatPhone}
        placeholder='55 0011 3344'
      />
      <ButtonSolid
        onPress={formik.handleSubmit}
        style={[
          styles.ButtonSolidUF,
          { backgroundColor: theme.colors.primary }
        ]}
        title='Iniciar sesión'
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ButtonSolidUF: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    minHeight: 42,
    textAlign: 'center',
    marginTop: 16,
    fontFamily: 'System',
    fontWeight: '700'
  },
  ViewEB: {
    paddingLeft: 32,
    paddingRight: 32,
    marginBottom: 24
  }
});

SignInForm.propTypes = {
  theme: PropTypes.object.isRequired
};

export default withTheme(SignInForm);
