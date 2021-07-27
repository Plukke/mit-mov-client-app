import React from 'react';
import PropTypes from 'prop-types';
import shallow from 'zustand/shallow';
import { useFormik } from 'formik';
import { StyleSheet, Text } from 'react-native';
import { Button, Container, withTheme } from '@draftbit/ui';

import Input from '../common/Input';
import { SecretCodeValidationSchema } from './Schema';
import { useStore } from '../Provider';
import { answerCustomChallenge } from '../../lib/authService';

function SecretCodeForm(props) {
  const { theme } = props;
  const [loading, setLoading] = React.useState(false);

  const { setAuthenticated } = useStore((store) => store.authStore, shallow);
  const formik = useFormik({
    initialValues: {
      code: ''
    },
    validationSchema: SecretCodeValidationSchema,
    onSubmit: async (values, actions) => {
      console.log('values', values);
      setLoading(true);
      try {
        const parsedCode = values.code.replace(/\s/g, '');
        const isAuthenticated = await answerCustomChallenge(
          parsedCode,
          (error) => {
            console.log('ERROR', error);
            // setLoginErrors((state) => [
            //   ...state,
            //   error?.message ?? 'Error al iniciar sesión, intenta más tarde'
            // ])
          }
        );

        if (isAuthenticated) {
          console.log('success auth');
          // addN10n({
          //   title: '¡Bienvenido!',
          //   description: 'Inicio de sesión exitoso.',
          //   state: 'success'
          // })
          setAuthenticated(true);
          setLoading(false);
        } else {
          actions.setSubmitting(false);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  return (
    <>
      <Container
        style={styles.ContainerQi}
        elevation={0}
        useThemeGutterPadding={true}
      >
        <Text
          style={[
            theme.typography.headline4,
            styles.Textn3,
            { color: theme.colors.strong }
          ]}
        >
          Confirmar cuenta
        </Text>

        <Text
          style={[
            theme.typography.body1,
            styles.TextOa,
            { color: theme.colors.strong }
          ]}
        >
          {
            'Hemos enviado un SMS con el código de confirmación a su teléfono. Copie el código aquí para comenzar.'
          }
        </Text>
        <Input
          style={styles.TextFieldjR}
          label='Código de confirmación'
          keyboardType='numeric'
          name='code'
          value={formik.values['code']}
          error={formik.errors['code'] && formik.touched['code']}
          helperText={
            formik.errors['code'] && formik.touched['code']
              ? formik.errors['code']
              : ''
          }
          formik={formik}
          parse={(value) => value.substring(0, 6)}
        />
      </Container>

      <Container
        style={styles.ContainereM}
        elevation={0}
        useThemeGutterPadding={true}
      >
        <Button
          style={styles.Buttonma}
          type='solid'
          color={theme.colors.null}
          onPress={formik.handleSubmit}
          loading={loading}
        >
          Confirmar cuenta
        </Button>

        <Text
          style={[
            theme.typography.caption,
            styles.Textpv,
            { color: theme.colors.light }
          ]}
        >
          Al iniciar sesión, acepta nuestros Términos de servicio, Política de
          privacidad y Política de cookies.
        </Text>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  Textn3: {
    textAlign: 'center'
  },
  TextOa: {
    marginTop: 20,
    textAlign: 'center'
  },
  TextFieldjR: {
    marginTop: 20
  },
  ContainerQi: {
    marginTop: 32
  },
  TextRY: {
    textAlign: 'center'
  },
  TouchableHr: {
    marginBottom: 24
  },
  Buttonma: {
    height: 48
  },
  Textpv: {
    width: '100%',
    marginTop: 16,
    textAlign: 'center'
  },
  ContainereM: {
    marginBottom: 32
  }
});

SecretCodeForm.propTypes = {
  theme: PropTypes.shape({
    typography: PropTypes.object.isRequired,
    colors: PropTypes.object.isRequired
  })
};

export default withTheme(SecretCodeForm);
