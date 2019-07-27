const {test, User, request, app} = require('./common');
const {helpers: {jwtSign}} = require('../src/utilities/authentication');

test.before('Setup', async (t) => {
  const user = await new User({
    email: 'test6@email.com',
    password: '01234567',
    role: 'user'
  }).save();
  t.context = {
    user,
    token: jwtSign({email: user.email, id: user._id, role: user.role}),
    invalidToken: jwtSign({email: user.email, id: '5d332f49dca6a44419c48fff', role: user.role}),
  };
});

test.after('Cleanup', async () => {
  await User.deleteOne({email: 'test6@email.com'});
});

test('Update: Success', async (t) => {
  const res = await request(app)
    .patch(`/users/${t.context.user.id}`)
    .set('Authorization', t.context.token)
    .send({password: 'lollipop'});
  t.is(res.status, 200);
});

test('Update: Fail => missing parameters', async (t) => {
  const res = await request(app)
    .patch(`/users/${t.context.user.id}`)
    .set('Authorization', t.context.token);
  t.is(res.status, 400);
});

test('Update: Fail => invalid password', async (t) => {
  const res = await request(app)
    .patch(`/users/${t.context.user.id}`)
    .set('Authorization', t.context.token)
    .send({password: 'lolli'});
  t.is(res.status, 400);
});


test('Update: Fail => invalid email', async (t) => {
  const res = await request(app)
    .patch(`/users/${t.context.user.id}`)
    .set('Authorization', t.context.token)
    .send({email: 'lolli'});
  t.is(res.status, 400);
});


test('Update: Fail => invalid role', async (t) => {
  const res = await request(app)
    .patch(`/users/${t.context.user.id}`)
    .set('Authorization', t.context.token)
    .send({role: 'lolli'});
  t.is(res.status, 400);
});

test('Update: Fail => non existing user', async (t) => {
  const res = await request(app)
    .patch('/users/5d332f49dca6a44419c48fff')
    .set('Authorization', t.context.invalidToken)
    .send({password: 'lollipop'});
  t.is(res.status, 404);
});

test('Update: Fail => missing token', async (t) => {
  const res = await request(app)
    .patch(`/users/${t.context.user.id}`)
    .send({password: 'lollipop'});
  t.is(res.status, 403);
});

test('Update: Fail => invalid token', async (t) => {
  const res = await request(app)
    .patch(`/users/${t.context.user.id}`)
    .set('Authorization', 'lollipop')
    .send({password: 'lollipop'});
  t.is(res.status, 403);
});


test('Update: Fail => insufficient privileges', async (t) => {
  const res = await request(app)
    .patch(`/users/${t.context.user.id}`)
    .set('Authorization', t.context.invalidToken)
    .send({password: 'lollipop'});
  t.is(res.status, 403);
});
