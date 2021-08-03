import React from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/core';
import { useFormik } from 'formik';
import { StyleSheet, Text } from 'react-native';
import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js';

import { Button, Container, Touchable, withTheme } from '@draftbit/ui';
import Input from '../common/Input';
import { SignUpValidationSchema } from './Schema';
import { signIn, signUp } from '../../lib/authService';

const parseDigits = (string) => (string.match(/\d+/g) || []).join('');

function SignUpForm(props) {
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: {
      name: '',
      phone_number: ''
    },
    validationSchema: SignUpValidationSchema,
    onSubmit: async (values, actions) => {
      console.log('values', values);

      setLoading(true);
      const username = parsePhoneNumberFromString(
        `+52${values.phone_number}`
      ).number;
      const name = values.name.trim();
      try {
        await signUp(username, name);
      } catch (error) {
        console.log(error);
        setLoading(false);
        actions.setSubmitting(false);
        return;
      }

      try {
        await signIn(username);
        navigation.pop();
        navigation.navigate('SecretCode');
      } catch (error) {
        console.log(error);
        setLoading(false);
        actions.setSubmitting(false);
      }
    }
  });

  const { theme } = props;

  const formatPhone = (string) => {
    const digits = parseDigits(string);
    return new AsYouType('MX').input(`${digits}`);
  };

  return (
    <>
      <Container
        style={styles.ContainerTK}
        elevation={0}
        useThemeGutterPadding={true}
      >
        <Text
          style={[
            theme.typography.headline4,
            styles.Text_6i,
            { color: theme.colors.strong }
          ]}
        >
          Registro
        </Text>

        <Text
          style={[
            theme.typography.body1,
            styles.TextQP,
            { color: theme.colors.strong }
          ]}
        >
          Completa los siguientes campos, ¡no mas contraseñas!
        </Text>
        <Input
          style={styles.TextFieldbg}
          name='name'
          value={formik.values['name']}
          label='Nombre completo'
          error={formik.errors['name'] && formik.touched['name']}
          helperText={
            formik.errors['name'] && formik.touched['name']
              ? formik.errors['name']
              : ''
          }
          formik={formik}
          leftIconMode='inset'
          leftIconName='MaterialCommunityIcons/account'
        />
        <Input
          style={styles.TextFieldbg}
          name='phone_number'
          value={formik.values['phone_number']}
          label='Teléfono'
          keyboardType='phone-pad'
          error={
            formik.errors['phone_number'] && formik.touched['phone_number']
          }
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
      </Container>

      <Container
        style={styles.Container_1x}
        elevation={0}
        useThemeGutterPadding={true}
      >
        <Button
          style={[styles.ButtonYr, { borderRadius: 24 }]}
          type='solid'
          onPress={formik.handleSubmit}
          loading={loading}
        >
          Registrarse
        </Button>
        <Touchable
          style={styles.TouchableHr}
          onPress={() => navigation.goBack()}
        >
          <Text
            style={[
              theme.typography.button,
              styles.TextRY,
              { color: theme.colors.primary }
            ]}
          >
            Iniciar sesión
          </Text>
        </Touchable>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  Text_6i: {
    textAlign: 'center'
  },
  TextQP: {
    marginTop: 16,
    textAlign: 'center'
  },
  TextFieldbg: {
    marginTop: 20
  },
  ContainerTK: {
    marginTop: 32
  },
  ButtonYr: {
    height: 48
  },
  Textbg: {
    width: '100%',
    marginTop: 16,
    textAlign: 'center'
  },
  Container_1x: {
    marginBottom: 24,
    paddingLeft: 16,
    paddingRight: 16
  },
  TextRY: {
    textAlign: 'center'
  },
  TouchableHr: {
    marginTop: 12
  }
});

SignUpForm.propTypes = {
  theme: PropTypes.shape({
    typography: PropTypes.object.isRequired,
    colors: PropTypes.object.isRequired
  }).isRequired
};

export default withTheme(SignUpForm);
