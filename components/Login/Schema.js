import * as Yup from 'yup';
import { isValidNumber } from 'libphonenumber-js';

export const SignInValidationSchema = Yup.object().shape({
  phone_number: Yup.string().test(
    'phone_number',
    'El número no es válido',
    (value = '') => isValidNumber(value, 'MX')
  )
});

export const SignUpValidationSchema = Yup.object().shape({
  name: Yup.string().required('Nombre es requerido'),
  phone_number: Yup.string().test(
    'phone_number',
    'El número no es válido',
    (value = '') => isValidNumber(value, 'MX')
  )
});

export const SecretCodeValidationSchema = Yup.object().shape({
  code: Yup.string()
    .required('El código es requerido')
    .min(6, 'Mínimo de 6 digitos')
});
