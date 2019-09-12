const yup = require('yup');
const {min, roles} = require('./constants');

const email = yup
  .string()
  .lowercase()
  .trim()
  .email();

const password = yup
  .string()
  .trim()
  .min(min);

const role = yup
  .string().oneOf(roles);

module.exports = {role, password, email};
