const {ifElse, equals, path, or} = require('ramda');

module.exports = (req, res, next) => {
  /**
     * @name validation
     * @description Middleware that tests
     */
  ifElse(
    (r) => or(
      equals(path(['params', 'id'], r), path(['decoded', 'id'], r)),
      equals(path(['decoded', 'role'], r), 'admin')
    ),
    () => next(),
    () => next({
      status: 403,
      message: 'Authorization Error: Insufficient privileges'
    })
  )(req);
};
