const {
  test,
  request,
  app,
  before,
  after,
} = require('./common');

test.before(before);
test.after.always(after);

test('Update: Success', async (t) => {
  const res = await request(app)
    .patch(`/users/${t.context.activated.id}`)
    .set('Authorization', t.context.token)
    .send({password: 'lollipop'});
  t.is(res.status, 200);
});

test('Update: Fail => cannot promote to admin if requester is not admin', async (t) => {
  const res = await request(app)
    .patch(`/users/${t.context.activated.id}`)
    .set('Authorization', t.context.token)
    .send({role: 'admin'});
  t.is(res.status, 403);
});

test('Update: Success => promote to admin', async (t) => {
  const res = await request(app)
    .patch(`/users/${t.context.unactivated.id}`)
    .set('Authorization', t.context.adminToken)
    .send({role: 'admin'});
  t.is(res.status, 200);
});

test('Update: Fail => missing parameters', async (t) => {
  const res = await request(app)
    .patch(`/users/${t.context.activated.id}`)
    .set('Authorization', t.context.token);
  t.is(res.status, 400);
});

test('Update: Fail => invalid password', async (t) => {
  const res = await request(app)
    .patch(`/users/${t.context.activated.id}`)
    .set('Authorization', t.context.token)
    .send({password: 'lolli'});
  t.is(res.status, 400);
});


test('Update: Fail => invalid email', async (t) => {
  const res = await request(app)
    .patch(`/users/${t.context.activated.id}`)
    .set('Authorization', t.context.token)
    .send({email: 'lolli'});
  t.is(res.status, 400);
});


test('Update: Fail => invalid role', async (t) => {
  const res = await request(app)
    .patch(`/users/${t.context.activated.id}`)
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
    .patch(`/users/${t.context.activated.id}`)
    .send({password: 'lollipop'});
  t.is(res.status, 403);
});

test('Update: Fail => invalid token', async (t) => {
  const res = await request(app)
    .patch(`/users/${t.context.activated.id}`)
    .set('Authorization', 'lollipop')
    .send({password: 'lollipop'});
  t.is(res.status, 403);
});


test('Update: Fail => insufficient privileges', async (t) => {
  const res = await request(app)
    .patch(`/users/${t.context.activated.id}`)
    .set('Authorization', t.context.invalidToken)
    .send({password: 'lollipop'});
  t.is(res.status, 403);
});
