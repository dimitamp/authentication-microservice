const {User, app, request, test} = require('./common');

test.before('Setup', async (t) => {
  const user = await new User({
    email: 'test2@email.com',
    password: '01234567',
    role: 'developer'
  }).save();
  t.context = user;
});

test.after('Cleanup', async () => {
  await User.deleteOne({email: 'test2@email.com'});
});


test('Authenticate: Success', async (t) => {
  const res = await request(app)
    .post('/users/authenticate')
    .send({email: 'test2@email.com', password: '01234567'});
  t.is(res.status, 200);
  t.assert(res.body.user);
  t.assert(res.body.token);
  t.is(res.body.user.id, String(t.context._id));
  t.is(res.body.user.email, t.context.email);
  t.is(res.body.user.role, t.context.role);
});


test('Authenticate: Fail => password mismatch', async (t) => {
  const res = await request(app)
    .post('/users/authenticate')
    .send({email: 'test2@email.com', password: 'lollipop'});
  t.is(res.status, 401);
});

test('Authenticate: Fail => non existing user', async (t) => {
  const res = await request(app)
    .post('/users/authenticate')
    .send({email: 'sugardaddy@email.com', password: 'lollipop'});
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
    .send({email: 'sugardaddy', password: 'lollipop'});
  t.is(res.status, 400);
});

test('Authenticate: Fail => issing password', async (t) => {
  const res = await request(app)
    .post('/users/authenticate')
    .send({email: 'sugardaddy@email.com'});
  t.is(res.status, 400);
});


test('Authenticate: Fail => invalid Password', async (t) => {
  const res = await request(app)
    .post('/users/authenticate')
    .send({email: 'sugardaddy@email.com', password: 'lolli'});
  t.is(res.status, 400);
});
