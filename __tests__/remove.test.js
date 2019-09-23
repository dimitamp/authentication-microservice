const {
  test,
  request,
  app,
  before,
  after,
} = require('./common');

test.before(before);
test.after.always(after);

test('Remove: Success', async (t) => {
  const res = await request(app)
    .delete(`/users/${t.context.activated.id}`)
    .set('Authorization', t.context.token);
  t.is(res.status, 200);
  t.is(res.body.user._id, t.context.activated.id);
  t.is(res.body.user.email, t.context.activated.email);
  t.is(res.body.user.role, t.context.activated.role);
});

test('Remove: Fail => missing token', async (t) => {
  const res = await request(app)
    .delete(`/users/${t.context.activated.id}`);
  t.is(res.status, 403);
});

test('Remove: Fail => invalid token', async (t) => {
  const res = await request(app)
    .delete(`/users/${t.context.activated.id}`)
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
    .delete('/users/5d332f49dca6a44419c48fff')
    .set('Authorization', t.context.invalidToken);
  t.is(res.status, 404);
});
