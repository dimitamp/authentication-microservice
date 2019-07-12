const {ifElse, equals, path} = require('ramda');

module.exports = (req, res, next) => {
  /**
     * @name validation
     * @description Middleware that tests
     */
  ifElse(
    r => equals(path(['params', 'id'], r), path(['decoded', 'id'], r)),
    () => next(),
    () => next({
      status: 403,
      message: 'Authorization Error: Insufficient privileges'
    })
  )(req);
};
