const request = require('supertest');
const test = require('ava');
const MongodbMemoryServer = require('mongodb-memory-server').default;
const mongoose = require('mongoose');
const app = require('../src/index');
const User = require('../src/models/user');
const Reset = require('../src/models/reset');
const {helpers: {jwtSign}} = require('../src/utilities/authentication');

const mongod = new MongodbMemoryServer();

const data = {
  activated: {
    email: 'activated@email.com',
    password: '01234567',
    role: 'user'
  },
  unactivated: {
    email: 'unactivated@email.com',
    password: '01234567',
    role: 'user',
    activated: false
  },
};

const before = async (t) => {
  // set up mongo memory db
  const uri = await mongod.getConnectionString();
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
  // feed db
  const activated = await new User(data.activated).save();
  const unactivated = await new User(data.unactivated).save();
  const token = jwtSign({email: activated.email, id: activated.id, role: activated.role});
  const invalidToken = jwtSign({email: 'bla@email.com', id: '5d332f49dca6a44419c48fff', role: activated.role});
  const reset = await new Reset({email: activated.email, token}).save();
  // feed context
  t.context = {
    activated: {...data.activated, id: activated.id},
    unactivated: {...data.unactivated, id: unactivated.id},
    token,
    invalidToken,
    reset: reset.token
  };
};


const after = async () => {
  // clear db
  await User.deleteMany({});
  await Reset.deleteMany({});
  // stop mongo memory db
  mongoose.disconnect();
  mongod.stop();
};

module.exports = {
  request,
  app,
  test,
  before,
  after,
  data
};
