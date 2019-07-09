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

const maxAge = 60 * 60 * 24; // 24 hours


const cors = handler => (req, res, ...restArgs) => {
  res.setHeader('access-control-allow-origin', '*');
  const preflight = req.method === 'OPTIONS';
  if (preflight) {
    res.setHeader('access-control-allow-methods', allowMethods.join(','));
    res.setHeader('access-control-allow-headers', allowHeaders.join(','));
    res.setHeader('Access-Control-Max-Age', String(maxAge));
  }
  console.log(req.method);
  return handler(req, res, ...restArgs);
};

module.exports = cors;
