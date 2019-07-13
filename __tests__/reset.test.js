const {test, User, request, app} = require('./common');
const {helpers: {jwtSign}} = require('../src/utilities/authentication');


test.before('Setup', async (t) => {
  const user = await new User({
    email: 'test6@email.com',
    password: '01234567',
    role: 'developer'
  }).save();
  t.context = user;
});

test.after('Cleanup', async () => {
  await User.deleteOne({email: 'test6@email.com'});
});

test('Reset: Success', async (t) => {
  const res = await request(app)
    .post('/users/changepassword')
    .send({email: t.context.email});
  t.is(res.status, 200);
  t.assert(res.body.token);
});

test('Reset: Fail => missing email', async (t) => {
  const res = await request(app)
    .post('/users/changepassword');
  t.is(res.status, 400);
});

test('Reset: Fail => invalid email', async (t) => {
  const res = await request(app)
    .post('/users/changepassword')
    .send({email: 'lollipop'});
  t.is(res.status, 400);
});

test('Reset: Fail => non existing user', async (t) => {
  const res = await request(app)
    .post('/users/changepassword')
    .send({email: 'sugardaddy@email.com'});
  t.is(res.status, 404);
});
