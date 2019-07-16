const {test, User, Reset, request, app} = require('./common');
const {helpers: {jwtSign}} = require('../src/utilities/authentication');

test.before('Setup', async (t) => {
  const user = await new User({
    email: 'test5@email.com',
    password: '01234567',
    role: 'user'
  }).save();
  const reset = await new Reset({
    email: user.email,
    token: jwtSign({email: user.email})
  }).save();
  t.context.user = user;
  t.context.reset = reset;
  t.context.invalid = {token: jwtSign({email: 'lamouchefatale@email.com'})};
});

test.after('Cleanup', async () => {
  await User.deleteOne({email: 'test5@email.com'});
});

test.serial('Change: Success', async (t) => {
  const res = await request(app)
    .post('/users/changepassword')
    .set('Authorization', t.context.reset.token)
    .send({password: 'lollipop'});
  t.is(res.status, 200);
});

test('Change: Fail => missing password', async (t) => {
  const res = await request(app)
    .post('/users/changepassword')
    .set('Authorization', t.context.reset.token);
  t.is(res.status, 400);
});

test('Change: Fail => invalid password', async (t) => {
  const res = await request(app)
    .post('/users/changepassword')
    .set('Authorization', t.context.reset.token)
    .send({password: 'lolli'});
  t.is(res.status, 400);
});

test('Change: Fail => non existing user', async (t) => {
  const res = await request(app)
    .post('/users/changepassword')
    .set('Authorization', t.context.invalid.token)
    .send({password: 'lollipop'});
  t.is(res.status, 404);
});

test('Change: Fail => missing token', async (t) => {
  const res = await request(app)
    .post('/users/changepassword')
    .send({password: 'lollipop'});
  t.is(res.status, 403);
});

test('Change: Fail => invalid token', async (t) => {
  const res = await request(app)
    .post('/users/changepassword')
    .set('Authorization', 'lollipop')
    .send({password: 'lollipop'});
  t.is(res.status, 403);
});


test('Change: Fail => Token expired', async (t) => {
  const res = await request(app)
    .post('/users/changepassword')
    .set('Authorization', t.context.reset.token)
    .send({password: 'lollipop'});
  t.is(res.status, 410);
});
