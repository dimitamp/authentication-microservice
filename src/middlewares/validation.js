const validationSchemas = require('../utilities/validation/schemas');

module.exports = async (req, res, next, schema) => {
  try {
    const {body} = req;
    await validationSchemas[schema].validate(body);
    next();
  } catch (err) {
    next({
      message: `Validation Error: ${err.errors[0]}`,
      status: 400
    });
  }
};
