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
const mongodbUri = process.env.NODE_ENV !== 'test' 
  ? process.env.MONGODB_URI 
  : 'mongodb://localhost/authentication-test';

module.exports = () => {
  // eslint-disable-next-line no-console
  mongoose.connect(mongodbUri, mongooseOptions).catch(console.error);
};
