const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config({path: path.join(__dirname, '../', '.env')});

// micro packages
const {router} = require('microrouter');
const {handleErrors} = require('micro-boom');
const morgan = require('micro-morgan');
const sendToSentry = require('micro-sentry');
const cors = require('./middlewares/cors');

// routes
const indexRoutes = require('./routes/index-routes');
const userRoutes = require('./routes/user-routes');

const sentryDSN = process.env.SENTRY_DSN;

module.exports = sendToSentry(sentryDSN)(morgan('dev')(handleErrors(cors(router(
  ...indexRoutes,
  ...userRoutes
)))));
