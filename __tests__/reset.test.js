const {test, User, Reset, request, app} = require('./common');

test.before('Setup', async (t) => {
  const user = await new User({
    email: 'test4@email.com',
    password: '01234567',
    role: 'developer'
  }).save();
  t.context = user;
});

test.after('Cleanup', async () => {
  await User.deleteOne({email: 'test4@email.com'});
  await Reset.deleteOne({email: 'test4@email.com'});
});

test('Reset: Success', async (t) => {
  const res = await request(app)
    .post('/users/resetpassword')
    .send({email: t.context.email});
  t.is(res.status, 200);
  t.assert(res.body.token);
});

test('Reset: Fail => missing email', async (t) => {
  const res = await request(app)
    .post('/users/resetpassword');
  t.is(res.status, 400);
});

test('Reset: Fail => invalid email', async (t) => {
  const res = await request(app)
    .post('/users/resetpassword')
    .send({email: 'lollipop'});
  t.is(res.status, 400);
});

test('Reset: Fail => non existing user', async (t) => {
  const res = await request(app)
    .post('/users/resetpassword')
    .send({email: 'sugardaddy@email.com'});
  t.is(res.status, 404);
});
