const allowMethods = [
  'POST',
  'GET',
  'PUT',
  'PATCH',
  'DELETE',
  'OPTIONS'
];

const allowHeaders = [
  'X-Requested-With',
  'Access-Control-Allow-Origin',
  'X-HTTP-Method-Override',
  'Content-Type',
  'Authorization',
  'Accept'
];

const cors = handler => (req, res, ...restArgs) => {
  res.setHeader('access-control-allow-origin', '*');
  res.setHeader('access-control-allow-methods', allowMethods.join(','));
  res.setHeader('access-control-allow-headers', allowHeaders.join(','));
  console.log(res.headers);
  return handler(req, res, ...restArgs);
};

module.exports = cors;
