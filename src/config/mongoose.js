const mongoose = require('mongoose');

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  reconnectTries: 30,
  reconnectInterval: 500,
  poolSize: 100,
  keepAlive: true,
  keepAliveInitialDelay: 300000
};

const environment = process.env.NODE_ENV;

const mongodbUri = { 
  production: process.env.MONGODB_URI,
  development: 'mongodb://localhost/authentication',
};
module.exports = () => {
  // eslint-disable-next-line no-console
  mongoose.connect(mongodbUri[environment], mongooseOptions).catch(console.error);
};
