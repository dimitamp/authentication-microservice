const yup = require('yup');
const {min, roles} = require('./constants');

export const email = yup
  .string()
  .lowercase()
  .trim()
  .email();

export const password = yup
  .string()
  .trim()
  .min(min);

export const role = yup
  .string().oneOf(roles);
