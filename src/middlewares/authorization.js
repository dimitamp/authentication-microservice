const jwt = require('jsonwebtoken');
const {path, ifElse, isNil, startsWith, slice, identity, pipe} = require('ramda');


const secret = process.env.SERVER_SECRET;

module.exports = {
  authorization: (req, res, next) =>
    pipe(
      r =>
        path(['query', 'token'], r)
          || path(['headers', 'x-access-token'], r)
          || path(['headers', 'authorization'], r),
      ifElse(
        t => !isNil(t) && startsWith('Bearer ', t),
        t => slice(7, t.length, t).trimLeft(),
        identity
      ),
      ifElse(
        isNil,
        () =>
          next({
            message: 'AuthorizationError: token missing.',
            status: 403
          }),
        token =>
          jwt.verify(token, secret, (e, d) =>
            ifElse(
              err => !isNil(err),
              () =>
                next({
                  message: 'AuthorizationError: Failed to verify token.',
                  status: 403
                }),
              (_, decoded) => {
                req.decoded = decoded;
                return next();
              }
            )(e, d))
      )
    )(req)
};
