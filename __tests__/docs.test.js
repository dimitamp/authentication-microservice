const {test, request, app} = require('./common');


test('Docs: Success', async (t) => {
  const res = await request(app)
    .get('/docs/');
  t.is(res.status, 200);
});
