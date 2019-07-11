const express = require('express');
const {validation} = require('../middlewares');
const {helpers: {jwtSign}} = require('../utilities/authentication');


const router = express.Router();

const User = require('../models/user');

router.post(
  '/',
  (req, res, next) => validation(req, res, next, 'register'),
  async (req, res, next) => {
    const {email, password, role} = req.body;
    try {
      const user = await User.findOne({email});
      if (user) {
        return next({
          status: 409,
          message: 'Registration Error: A user with this e-mail  already exists.'
        });
      }
      const newUser = await new User({
        email,
        password,
        role
      }).save();
      return res.json({
        user: {email, role, id: newUser._id},
        token: jwtSign({email, role, id: newUser._id})
      });
    } catch (error) {
      return next(error);
    }
  }
);

router.post(
  '/authenticate',
  (req, res, next) => validation(req, res, next, 'authenticate'),
  async (req, res, next) => {
    const {email, password} = req.body;
    try {
      const user = await User.findOne({email}).select('+password');
      if (!user) {
        return next({
          status: 401,
          message: 'Authentication Error: User with this email not found.'
        });
      }
      if (!user.comparePassword(password, user.password)) {
        return next({
          status: 401,
          message: 'Authentication Error: Password does not match!'
        });
      }
      return res.json({
        user: {email, id: user._id, role: user.role},
        token: jwtSign({email, id: user._id, role: user.role})
      });
    } catch (error) {
      return next(error);
    }
  }
);


module.exports = router;
