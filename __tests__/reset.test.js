const {
  test,
  request,
  app,
  before,
  after,
} = require('./common');

test.before(before);
test.after.always(after);

test('Reset: Success', async (t) => {
  const res = await request(app)
    .post('/users/resetpassword')
    .send({email: t.context.activated.email});
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
    .send({email: 'lamouchefatale@email.com'});
  t.is(res.status, 404);
});
