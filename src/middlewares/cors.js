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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', allowMethods.join(','));
  res.setHeader('Access-Control-Allow-Headers', allowHeaders.join(','));
  res.setHeader('Access-Control-Max-Age', String(maxAge));
  return handler(req, res, ...restArgs);
};

module.exports = cors;
