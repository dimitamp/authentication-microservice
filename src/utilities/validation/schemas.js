const {isNil} = require('ramda');

const yup = require('yup');

const {email, password, role} = require('./fields');

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
