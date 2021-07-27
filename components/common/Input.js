/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@draftbit/ui';

const Input = React.forwardRef((props, ref) => {
  const {
    name,
    formik,
    helperText = '',
    parse = (value) => value,
    ...restProps
  } = props;
  return (
    <>
      <TextField
        ref={ref}
        onBlur={(event) => {
          formik.setFieldTouched(name, true, false);
          formik.handleBlur(name)(event);
        }}
        onChangeText={(value) => {
          // if you do anything async here that `handleChange()` relies upon (such as if you check values from redux inside validate()), make sure to `await`
          const parsedValue = parse(value);
          formik.handleChange(name)(parsedValue);
        }}
        onFocus={() => {
          // Clear errors on focus here if you want...
          formik.setFieldError(name, null);
        }}
        assistiveText={helperText}
        {...restProps}
      />
    </>
  );
});

Input.propTypes = {
  name: PropTypes.string.isRequired,
  formik: PropTypes.shape({
    setFieldTouched: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    setFieldError: PropTypes.func.isRequired
  }).isRequired,
  helperText: PropTypes.string,
  parse: PropTypes.func
};

export default Input;
