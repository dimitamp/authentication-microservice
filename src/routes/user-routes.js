const {send, json} = require('micro');
const {post} = require('microrouter');
const jwt = require('jsonwebtoken');

const {SERVER_SECRET: secret} = process.env;

const authenticate = async (req, res) => {
  const body = await json(req);
  if (!(('email' in body) && ('password' in body))) {
    return send(res, 400, 'Please provide a username and password.');
  }
  const token = jwt.sign({email: body.email}, secret);
  return send(res, 200, {user: {email: body.email}, token});
};

const userRoutes = [
  post('/users/authenticate', authenticate)
];

module.exports = userRoutes;
