const {
  app,
  request,
  test,
  before,
  after,
} = require('./common');

test.before(before);
test.after.always(after);

test('Authenticate: Fail => e-mail not verified', async (t) => {
  const res = await request(app)
    .post('/users/authenticate')
    .send({email: t.context.unactivated.email, password: t.context.unactivated.password});
  t.is(res.status, 401);
});

test('Authenticate: Success', async (t) => {
  const res = await request(app)
    .post('/users/authenticate')
    .send({email: t.context.activated.email, password: t.context.activated.password});
  t.is(res.status, 200);
  t.assert(res.body.user);
  t.assert(res.body.token);
  t.is(res.body.user.email, t.context.activated.email);
  t.is(res.body.user.role, t.context.activated.role);
});

test('Authenticate: Fail => password mismatch', async (t) => {
  const res = await request(app)
    .post('/users/authenticate')
    .send({email: t.context.activated.email, password: 'lollipop'});
  t.is(res.status, 401);
});


test('Authenticate: Fail => non existing user', async (t) => {
  const res = await request(app)
    .post('/users/authenticate')
    .send({email: 'lamouchefatale@email.com', password: 'lollipop'});
  t.is(res.status, 401);
});


test('Authenticate: Fail => missing email', async (t) => {
  const res = await request(app)
    .post('/users/authenticate')
    .send({password: 'lollipop'});
  t.is(res.status, 400);
});


test('Authenticate: Fail => invalid email', async (t) => {
  const res = await request(app)
    .post('/users/authenticate')
    .send({email: 'lamouchefatale', password: 'lollipop'});
  t.is(res.status, 400);
});

test('Authenticate: Fail => missing password', async (t) => {
  const res = await request(app)
    .post('/users/authenticate')
    .send({email: 'lamouchefatale@email.com'});
  t.is(res.status, 400);
});


test('Authenticate: Fail => invalid Password', async (t) => {
  const res = await request(app)
    .post('/users/authenticate')
    .send({email: 'lamouchefatale@email.com', password: 'lolli'});
  t.is(res.status, 400);
});
