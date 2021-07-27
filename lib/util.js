import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { isValidNumber } from 'libphonenumber-js';

export const getHeaderTitle = (route) => {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getRouteName(route) ?? 'Feed';

  console.log('ROUTE NAME', routeName);
  switch (routeName) {
    case 'ListProducts':
      return 'Inicio';
    case 'Favorites':
      return 'Favoritos';
    case 'Orders':
      return 'Pedidos';
    case 'Coupons':
      return 'Cupones';
    case 'Profile':
      return 'Perfil';
  }
};

export const isEmptyObject = (obj) => {
  return obj && Object.keys(obj).length === 0;
};

export const getRouteName = (route) => getFocusedRouteNameFromRoute(route);

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const phoneValidation = (phone_number) => {
  return isValidNumber(phone_number);
};

export const hex2rgba = (hex, op) => {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return (
      'rgba(' +
      [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') +
      `,${op || 1})`
    );
  }
  throw new Error('Bad Hex');
};

export const getDigitsFromValue = (value = '') =>
  `${value}`.replace(/(-(?!\d))|[^0-9|-]/g, '') || '';

const padDigits = (digits, decimals = 2) => {
  const desiredLength = 1 + decimals;
  const actualLength = digits.length;

  if (actualLength >= desiredLength) {
    return digits;
  }

  const amountToAdd = desiredLength - actualLength;
  const padding = '0'.repeat(amountToAdd);

  return padding + digits;
};

const removeLeadingZeros = (number) => number.replace(/^0+([0-9]+)/, '$1');

const numberWithThousandSeparator = (number, thousandSeparator) => {
  const digits = number.split('');
  // add in any thousand separators
  for (let x = digits.length - 3; x > 0; x = x - 3) {
    digits.splice(x, 0, thousandSeparator);
  }
  if (digits[0] === '-' && digits[1] === thousandSeparator) {
    digits.splice(1, 1);
  }
  return digits.join('');
};

const addDecimalToNumber = (number, separator, thousandSeparator, decimals) => {
  const centsStartingPosition = number.length - decimals;
  let dollars = removeLeadingZeros(number.substring(0, centsStartingPosition));
  dollars = numberWithThousandSeparator(dollars, thousandSeparator);
  const cents = number.substring(centsStartingPosition);
  return dollars + separator + cents;
};

export const toCurrency = (
  value,
  separator = '.',
  thousandSeparator = ',',
  decimals = 2
) => {
  const digits = getDigitsFromValue(value);
  const digitsWithPadding = padDigits(digits, decimals);

  return addDecimalToNumber(
    digitsWithPadding,
    separator,
    thousandSeparator,
    decimals
  );
};
