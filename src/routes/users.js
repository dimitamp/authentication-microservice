const express = require('express');
const {validation, authorization, identification} = require('../middlewares');
const {helpers: {jwtSign}} = require('../utilities/authentication');


const router = express.Router();

const User = require('../models/user');


/**
 * @api {post} /users/ Creates a new User
 * @apiName PostUsers
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam {String} email Required email
 * @apiParam {String{8..}} password Required password
 * @apiParam {String="role1","role2","role3"} role Required role 
 * @apiParamExample {json} Request-example: 
 *     {
 *        "email": "test@email.com", 
 *        "password": "01234567",
 *        "role": "role1"
 *     }
 * 
 * @apiSuccess {String} token Authorization token.
 * @apiSuccess {Object} user User information.
 * @apiSuccess {String} user.email User's email.
 * @apiSuccess {String} user.role User' role.
 * @apiSuccess {String} user.id User's id.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       user: {
 *           "id": "5d0bd41c2b85baa50300002d",
 *           "email": "test@email.com",
 *           "role": "role1"
 *       },
 *       token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWQwYmQ0MWMyYjg1YmFhNTAzMDAw
 *               MDJkIiwiZW1haWwiOiJmb25pa2hteWdhQGdtYWlsLmNvbSIsImlhdCI6MTU2MjEwMjc4N30.I64zY_Fj-
 *               D30vttEDMaQBPaheuTLGX1F1Ap5pynpOBs"
 *     }
 *
 * @apiError UserAlreadyExists A user with this e-mail already exists.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 409 Resource Conflict
 *     {
 *       "status": 409
 *       "message": "Registration Error: A user with this e-mail  already exists."
 *     }
 * 
 * @apiError MissingEmail Missing required parameter e-mail.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "status": 400
 *       "message": "Validation Error: E-mail is required."
 *     }
 * 
 * @apiError InvalidEmail Invalid required parameter e-mail.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "status": 400
 *       "message": "Validation Error: E-mail is invalid."
 *     }
 * 
 * @apiError MissingPassword Missing required parameter password.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "status": 400
 *       "message": "Validation Error: Password is required."
 *     }
 * 
 * @apiError InvalidPassword Invalid required parameter e-mail.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "status": 400
 *       "message": "Validation Error: Password must have at least 8 characters."
 *     }
 */
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
      const mpampisas;
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

/**
 * @api {post} /users/authenticate Authenticates a user
 * @apiName PostUsersAuthenticate
 * @apiVersion 1.0.0
 * @apiGroup User
 *
 * @apiParam {String} email Required email
 * @apiParam {String{8..}} password Required password
 * @apiParamExample {json} Request-example: 
 *     {
 *        "email": "test@email.com", 
 *        "password": "01234567"
 *     }
 * 
 * @apiSuccess {String} token Authorization token.
 * @apiSuccess {Object} user User information.
 * @apiSuccess {String} user.email User's email.
 * @apiSuccess {String} user.role User' role.
 * @apiSuccess {String} user.id User's id.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       user: {
 *           "id": "5d0bd41c2b85baa50300002d",
 *           "email": "test@email.com",
 *           "role": "role1"
 *       },
 *       token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWQwYmQ0MWMyYjg1YmFhNTAzMDAw
 *               MDJkIiwiZW1haWwiOiJmb25pa2hteWdhQGdtYWlsLmNvbSIsImlhdCI6MTU2MjEwMjc4N30.I64zY_Fj-
 *               D30vttEDMaQBPaheuTLGX1F1Ap5pynpOBs"
 *     }
 *
 * @apiError UserDoesntExist A user with this e-mail not found.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Authentication error
 *     {
 *       "status": 401
 *       "message": "Authentication Error: A user with this e-mail  not found."
 *     }
 * 
 * @apiError InvalidCredentials Password doesn't match with given e-mail.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Authentication error
 *     {
 *       "status": 401
 *       "message": "Authentication Error: Password doesn't match with given e-mail."
 *     }
  * @apiError MissingEmail Missing required parameter e-mail.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "status": 400
 *       "message": "Validation Error: E-mail is required."
 *     }
 * 
 * @apiError InvalidEmail Invalid required parameter e-mail.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "status": 400
 *       "message": "Validation Error: E-mail is invalid."
 *     }
 * 
 * @apiError MissingPassword Missing required parameter password.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "status": 400
 *       "message": "Validation Error: Password is required."
 *     }
 * 
 * @apiError InvalidPassword Invalid required parameter e-mail.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "status": 400
 *       "message": "Validation Error: Password must have at least 8 characters."
 *     }
 */

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


router.delete(
  '/:id',
  authorization,
  identification,
  async (req, res, next) => {
    const {id} = req.params;
    try {
      const user = await User.findByIdAndRemove(id);
      if (user) {
        return res.json({
          ok: true,
          message: 'User deleted'
        });
      }
      return next({
        status: 404,
        message: "Resource error: User doesn't exist"
      });
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
