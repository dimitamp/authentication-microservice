import test from 'ava';

const request = require('supertest');
const app = require('../src/index');
const User = require('../src/models/user');

test.before('Setup', async (t) => {
  const user = await new User({
    email: 'test2@email.com',
    password: '01234567',
    role: 'developer'
  }).save();
  t.context = user;
});

test.after('Cleanup', async () => {
  await User.deleteOne({email: 'test2@email.com'});
});


test('Authenticate: Success', async (t) => {
  const res = await request(app)
    .post('/users/authenticate')
    .send({email: 'test2@email.com', password: '01234567'});
  t.is(res.status, 200);
});
