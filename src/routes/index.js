const express = require('express');
const users = require('./users');
const root = require('./root');
const docs = require('./docs');

const router = express.Router();

router.use('/users', users);
router.use('/docs', docs);
router.use('/', root);

module.exports = router;
