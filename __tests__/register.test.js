const {
  app,
  request,
  test,
  before,
  after,
} = require('./common');

test.before(before);
test.after.always(after);


test('Signup: Success', async (t) => {
  const res = await request(app)
    .post('/users/create')
    .send({...t.context.activated, email: 'test@email.com'});
  t.is(res.status, 200);
  t.assert(res.body.user);
  t.assert(res.body.token);
  t.is(res.body.user.email, 'test@email.com');
  t.is(res.body.user.role, 'user');
});

test('Signup: Fail => cannot create admin', async (t) => {
  const res = await request(app)
    .post('/users/create')
    .send({...t.context.activated, role: 'admin'});
  t.is(res.status, 400);
});

test('Signup: Fail => user exists', async (t) => {
  const res = await request(app)
    .post('/users/create')
    .send(t.context.activated);
  t.is(res.status, 409);
});

test('Signup: Fail => missing password', async (t) => {
  const res = await request(app)
    .post('/users/create')
    .send({email: 'test@email.com', role: 'user'});
  t.is(res.status, 400);
});

test('Signup: Fail => incorrect password', async (t) => {
  const res = await request(app)
    .post('/users/create')
    .send({...t.context.activated, password: '0123467'});
  t.is(res.status, 400);
});

test('Signup: Fail => empty password', async (t) => {
  const res = await request(app)
    .post('/users/create')
    .send({...t.context.activated, password: '        '});
  t.is(res.status, 400);
});

test('Signup: Fail => missing role', async (t) => {
  const res = await request(app)
    .post('/users/create')
    .send({email: 'test@email.com', password: '01234567'});
  t.is(res.status, 400);
});

test('Signup: Fail => incorrect role', async (t) => {
  const res = await request(app)
    .post('/users/create')
    .send({...t.context.activated, role: 'lamouchefatale'});
  t.is(res.status, 400);
});

test('Signup: Fail => missing email', async (t) => {
  const res = await request(app)
    .post('/users/create')
    .send({password: '01234567', role: 'user'});
  t.is(res.status, 400);
});

test('Signup: Fail => incorrect email', async (t) => {
  const res = await request(app)
    .post('/users/create')
    .send({...t.context.activated, email: 'iamnotanemail'});
  t.is(res.status, 400);
});
