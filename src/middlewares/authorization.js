const {send} = require('micro');
const jwt = require('jsonwebtoken');
const {path, ifElse, isNil, startsWith, slice, identity} = require('ramda');


const secret = process.env.SERVER_SECRET;

module.exports = {
  authorization: async ({req, res, ...rest}) => {
    let token = path(['query', 'token'], req)
    || path(['headers', 'x-access-token'], req)
    || path(['headers', 'authorization'], req);
    token = ifElse(
      t => !isNil(t) && startsWith('Bearer ', t),
      t => slice(7, t.length, t).trimLeft(),
      identity
    )(token);
    try {
      if (isNil(token)) {
        return send(res, 403, 'Authorization Error: Missing token');
      }
      const decoded = await jwt.verify(token, secret);
      req.decoded = decoded;
      return ({req, res, ...rest});
    } catch (err) {
      return send(res, 403, 'Authorization Error: Invalid token');
    }
  }
};
