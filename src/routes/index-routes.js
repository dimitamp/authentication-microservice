const {send} = require('micro');
const {get} = require('microrouter');

const hello = (req, res) => {
  send(res, 200, 'Welcome to Sities Platform');
};

const indexRoutes = [
  get('/hello', hello)
];

module.exports = indexRoutes;
