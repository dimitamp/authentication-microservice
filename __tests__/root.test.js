const {test, request, app} = require('./common');


test('Root: Success', async (t) => {
  const res = await request(app)
    .get('/');
  t.is(res.status, 200);
});
