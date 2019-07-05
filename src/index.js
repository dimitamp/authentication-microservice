const sendToSentry = require('micro-sentry');

const url = process.env.SENTRY_DSN;


module.exports = sendToSentry(url)(async (req, res) => {
  res.end('Welcome to Micro');
});
