const {json, send} = require('micro');
const validationSchemas = require('../utilities/validation/schemas');

module.exports = {
  validation: async ({req, res, schema, ...rest}) => {
    try {
      const body = await json(req);
      await validationSchemas[schema].validate(body);
      return {req, res, ...rest};
    } catch (err) {
      return send(res, 400, err.errors[0]);
    }
  }
};
