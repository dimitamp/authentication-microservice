const express = require('express');
const jwt = require('jsonwebtoken');
const {validation} = require('../middlewares');

const router = express.Router();

const secret = process.env.SERVER_SECRET;

router.post(
  '/authenticate',
  (req, res, next) => validation(req, res, next, 'authenticate'),
  async (req, res, next) => {
    const {email} = req.body;
    try {
      const token = await jwt.sign({email}, secret);
      return res.json({
        user: {email},
        token
      });
    } catch (error) {
      return next(error);
    }
  }
);


module.exports = router;
