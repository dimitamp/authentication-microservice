const express = require('express');
const path = require('path');

const router = express.Router();

const root = path.join(__dirname, '../../');

router.get('/', (req, res) => res.sendFile('index.html', {root}));


module.exports = router;
