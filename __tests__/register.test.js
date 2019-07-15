const {User, app, request, test} = require('./common');

test.after('Cleanup', async () => {
  await User.deleteOne({email: 'test1@email.com'});
});

test.serial('Signup: Success', async (t) => {
  const res = await request(app)
    .post('/users')
    .send({email: 'test1@email.com', password: '01234567', role: 'developer'});

  t.is(res.status, 200);
  t.assert(res.body.user);
  t.assert(res.body.token);
  t.is(res.body.user.email, 'test1@email.com');
  t.is(res.body.user.role, 'developer');
});

test('Signup: Fail => user exists', async (t) => {
  const res = await request(app)
    .post('/users')
    .send({email: 'test1@email.com', password: '01234567', role: 'developer'});
  t.is(res.status, 409);
});

test('Signup: Fail => missing password', async (t) => {
  const res = await request(app)
    .post('/users')
    .send({email: 'test1@email.com', role: 'developer'});
  t.is(res.status, 400);
});

test('Signup: Fail => incorrect password', async (t) => {
  const res = await request(app)
    .post('/users')
    .send({email: 'test1@email.com', password: '0123467', role: 'developer'});
  t.is(res.status, 400);
});

test('Signup: Fail => empty password', async (t) => {
  const res = await request(app)
    .post('/users')
    .send({email: 'test1@email.com', password: '        ', role: 'developer'});
  t.is(res.status, 400);
});

test('Signup: Fail => missing role', async (t) => {
  const res = await request(app)
    .post('/users')
    .send({email: 'test1@email.com', password: '01234567'});
  t.is(res.status, 400);
});

test('Signup: Fail => incorrect role', async (t) => {
  const res = await request(app)
    .post('/users')
    .send({email: 'test1@email.com', password: '01234567', role: 'lamouchefatale'});
  t.is(res.status, 400);
});

test('Signup: Fail => missing email', async (t) => {
  const res = await request(app)
    .post('/users')
    .send({password: '01234567', role: 'developer'});
  t.is(res.status, 400);
});

test('Signup: Fail => incorrect email', async (t) => {
  const res = await request(app)
    .post('/users')
    .send({email: 'iamnotanemail', password: '01234567', role: 'developer'});
  t.is(res.status, 400);
});
