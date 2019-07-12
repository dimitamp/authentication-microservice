const yup = require('yup');
const {min, roles} = require('./constants');

const authenticate = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(min)
    .required()
});


const register = yup.object().shape({
  email: yup
    .string()
    .trim()
    .lowercase()
    .email()
    .required(),
  password: yup
    .string()
    .trim()
    .min(min)
    .required(),
  role: yup
    .string().oneOf(roles)
    .required()
});

module.exports = {authenticate, register};
