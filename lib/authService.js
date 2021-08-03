import { Auth } from 'aws-amplify';
import { parsePhoneNumber } from 'libphonenumber-js';
import { customAlphabet } from 'nanoid/non-secure';

import { emailRegex, phoneValidation, isEmptyObject } from './util';

let cognitoUser = null;

const intToHex = (nr) => {
  return nr.toString(16).padStart(2, '0');
};

export const nanoid = customAlphabet(
  '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  10
);

export const isAuthenticated = async () => {
  try {
    await Auth.currentSession();
    return true;
  } catch {
    return false;
  }
};

export function getRandomString(bytes) {
  // eslint-disable-next-line no-undef
  var randomValues = new Uint8Array(bytes);
  window.crypto.getRandomValues(randomValues);
  return Array.from(randomValues).map(intToHex).join('');
}

export const signIn = async (username) => {
  cognitoUser = await Auth.signIn(username);
};

export function getUserAttribute(userAlias) {
  if (userAlias) {
    if (emailRegex.test(userAlias)) {
      return { email: userAlias };
    } else if (phoneValidation(userAlias)) {
      return { phone_number: parsePhoneNumber(userAlias).number };
    } else {
      return {};
    }
  }
}

export const signUp = async (userAlias, fullName) => {
  if (!(userAlias && fullName)) {
    console.log('Ingresa nombre y correo electrónico o número de celular');
    return;
  }

  const aliasAttr = getUserAttribute(userAlias);
  const alias = aliasAttr.email ? 'email' : 'phone_number';
  if (isEmptyObject(aliasAttr)) {
    console.log('Ingresa un correo electrónico o número de celular válido');
  }

  const attributes = {
    name: fullName,
    email: `mit_mov${userAlias}@gmail.com`,
    ...aliasAttr
  };

  console.log('ATTRIBUTES', attributes);
  const params = {
    username: userAlias,
    password: nanoid(),
    attributes,
    clientMetadata: { origin: 'client', version: 'v1', alias }
  };

  try {
    await Auth.signUp(params);
  } catch (err) {
    console.log(err);
    return;
  }
};

export const answerCustomChallenge = async (answer, callback) => {
  // Send the answer to the User Pool
  // This will throw an error if it’s the 3rd wrong answer
  try {
    cognitoUser = await Auth.sendCustomChallengeAnswer(cognitoUser, answer);
  } catch (err) {
    console.log(err);
    console.log('Vuelve a ingresar tu número de celular');
    callback(err);
  }

  // It we get here, the answer was sent successfully,
  // but it might have been wrong (1st or 2nd time)
  // So we should test if the user is authenticated now
  try {
    // This will throw an error if the user is not yet authenticated:
    await Auth.currentSession();
    return true;
  } catch (err) {
    console.log('Apparently the user did not enter the right code');
  }
};
