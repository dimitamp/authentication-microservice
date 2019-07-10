const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config({path: path.join(__dirname, '../', '.env')});
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const {error} = require('./middlewares');
const routes = require('./routes');

const app = express();
app.use(helmet());
app.use(cors());


// App configuration
app.use(compression());
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Routes
app.use('/', routes);

// error handler
app.use(error);

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () =>
// eslint-disable-next-line no-console
  console.log(`NodeJS Server listening on port ${port}. \nMode: ${process.env.NODE_ENV}`));

module.exports = app;
