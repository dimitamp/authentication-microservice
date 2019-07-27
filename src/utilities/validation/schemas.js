const {isNil} = require('ramda');

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

const request = yup.object().shape({email: email.required()});

const authenticate = yup.object().shape({
  email: email.required(),
  password: password.required()
});


const register = yup.object().shape({
  email: email.required(),
  password: password.required(),
  role: role.required()
});

const update = yup.object().shape({
  email,
  password,
  role
}).test({
  message: 'Missing parameters',
  test: ({email: e, password: p, role: r}) => !(isNil(e) && isNil(p) && isNil(r))
});

const change = yup.object().shape({password: password.required()});

module.exports = {
  authenticate, register, request, change, update
};
