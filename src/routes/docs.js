const path = require('path');
const express = require('express');

const router = express.Router();

const docs = path.join(__dirname, '../../docs');

router.use(express.static(docs));
router.get('/*', (req, res) => {
  res.sendFile('index.html', {root: docs});
});


module.exports = router;
