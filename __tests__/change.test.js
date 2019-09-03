const {
  test,
  request,
  app,
  before,
  after,
} = require('./common');

test.before(before);
test.after.always(after);

test('Change: Success', async (t) => {
  const res = await request(app)
    .post('/users/changepassword')
    .set('Authorization', t.context.reset)
    .send({password: 'lollipop'});
  t.is(res.status, 200);
});

test('Change: Fail => missing password', async (t) => {
  const res = await request(app)
    .post('/users/changepassword')
    .set('Authorization', t.context.reset);
  t.is(res.status, 400);
});

test('Change: Fail => invalid password', async (t) => {
  const res = await request(app)
    .post('/users/changepassword')
    .set('Authorization', t.context.reset)
    .send({password: 'lolli'});
  t.is(res.status, 400);
});

test('Change: Fail => non existing user', async (t) => {
  const res = await request(app)
    .post('/users/changepassword')
    .set('Authorization', t.context.invalidToken)
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
    .set('Authorization', t.context.reset)
    .send({password: 'lollipop'});
  t.is(res.status, 410);
});
