const yup = require('yup');
const {min} = require('./constants');

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

module.exports = {authenticate};
