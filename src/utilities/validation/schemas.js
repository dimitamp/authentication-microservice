const yup = require('yup');
const {min, roles} = require('./constants');

const email = yup
  .string()
  .lowercase()
  .trim()
  .email()
  .required();

const password = yup
  .string()
  .trim()
  .min(min)
  .required();

const role = yup
  .string().oneOf(roles)
  .required();

const request = yup.object().shape({email});

const authenticate = yup.object().shape({
  email,
  password
});


const register = yup.object().shape({
  email,
  password,
  role
});

const change = yup.object().shape({password});

module.exports = {authenticate, register, request, change};
