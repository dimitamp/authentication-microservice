const {test, User, request, app} = require('./common');
const {helpers: {jwtSign}} = require('../src/utilities/authentication');

test.before('Setup', async (t) => {
  const user = await new User({
    email: 'test3@email.com',
    password: '01234567',
    role: 'user'
  }).save();
  t.context = {
    user,
    token: jwtSign({email: user.email, id: user._id, role: user.role})  
  };
});

test.after('Cleanup', async () => {
  await User.deleteOne({email: 'test3@email.com'});
});

test('Remove: Success', async (t) => {
  const res = await request(app)
    .delete(`/users/${t.context.user.id}`)
    .set('Authorization', t.context.token);
  t.is(res.status, 200);
});

test('Remove: Fail => missing token', async (t) => {
  const res = await request(app)
    .delete(`/users/${t.context.user.id}`);
  t.is(res.status, 403);
});

test('Remove: Fail => invalid token', async (t) => {
  const res = await request(app)
    .delete(`/users/${t.context.user.id}`)
    .set('Authorization', 'lollipop');
  t.is(res.status, 403);
});

test('Remove: Fail => insufficient privileges', async (t) => {
  const res = await request(app)
    .delete('/users/lamouchefatale')
    .set('Authorization', t.context.token);
  t.is(res.status, 403);
});

test('Remove: Fail => non existing user', async (t) => {
  const res = await request(app)
    .delete(`/users/${t.context.user.id}`)
    .set('Authorization', t.context.token);
  t.is(res.status, 404);
});
