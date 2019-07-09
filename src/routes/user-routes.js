const {send, json} = require('micro');
const {post} = require('microrouter');
const jwt = require('jsonwebtoken');
const {pipeP} = require('ramda');
const {validation} = require('../middlewares/validation');

const secret = process.env.SERVER_SECRET;

const authenticate = async ({req, res}) => {
  const body = await json(req);
  const token = jwt.sign({email: body.email}, secret);
  return send(res, 200, {user: {email: body.email}, token});
};


const userRoutes = [
  post('/users/authenticate', (req, res) => pipeP(validation, authenticate)({req, res, schema: 'authenticate'}))
];

module.exports = userRoutes;
