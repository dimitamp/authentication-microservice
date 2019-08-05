const express = require('express');
const {validation, authorization, identification} = require('../middlewares');
const {helpers: {jwtSign}} = require('../utilities/authentication');


const router = express.Router();

const User = require('../models/user');
const Reset = require('../models/reset');

/**
 * @apiDefine MissingTokenError
 * @apiError TokenMissing No authorization token was provided.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Authorization Error
 *     {
 *       "status": 403
 *       "message": "Authorization Error: token missing."
 *     }
 */

/**
 * @apiDefine InvalidTokenError
 * @apiError InvalidToken Failed to verify token.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Authorization Error
 *     {
 *       "status": 403
 *       "message": "Authorization Error: Failed to verify token."
 *     }
 */

/**
 * @apiDefine InsufficientPrivilegesError
 * @apiError InsufficientPrivileges Parameter id doesnt match decoded token's id.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Authorization Error
 *     {
 *       "status": 403
 *       "message": "Authorization Error: Insufficient privileges."
 *     }
 */

/**
 * @apiDefine UserNotFoundError
 * @apiError UserDoesntExist User doesn't exist.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Resource not found
 *     {
 *       "status": 404
 *       "message": "Resource Error: User not found."
 *     }
 */

/**
 * @apiDefine MissingEmailError
 * @apiError MissingEmail Missing required parameter e-mail.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "status": 400
 *       "message": "Validation Error: E-mail is required."
 *     }
 */

/**
 * @apiDefine InvalidEmailError
 * @apiError InvalidEmail Invalid required parameter e-mail.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "status": 400
 *       "message": "Validation Error: E-mail is invalid."
 *     }
 */

/** 
 * @apiDefine MissingPasswordError
 * @apiError MissingPassword Missing required parameter password.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "status": 400
 *       "message": "Validation Error: Password is required."
 *     }
 */

/**
 * @apiDefine InvalidPasswordError
 * @apiError InvalidPassword Invalid required parameter password.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "status": 400
 *       "message": "Validation Error: Password must have at least 8 characters."
 *     }
 */

/** 
 * @apiDefine MissingRoleError
 * @apiError MissingRole Missing required parameter role.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "status": 400
 *       "message": "Validation Error: Role is required."
 *     }
 */

/**
 * @apiDefine InvalidRoleError
 * @apiError InvalidRole Invalid required parameter role.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "status": 400
 *       "message": "Validation Error: Role must role must be one of the following values: user"
 *     }
 */

/**
 * @apiDefine MissingParametersError
 * @apiError MissingParameters Missing required parameters.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "status": 400
 *       "message": "Validation Error: Missing Parameters"
 *     }
 */

/**
 * @api {post} /users/create Creates a new User
 * @apiName PostUser
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
 * @apiError UserAlreadyExists User already exists.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 409 Resource Conflict
 *     {
 *       "status": 409
 *       "message": "Registration Error: User already exists."
 *     }
 * 
 * @apiUse MissingEmailError
 * @apiuse InvalidEmailError
 * @apiUse MissingPasswordError
 * @apiUse InvalidPasswordError
 * @apiUse MissingRoleError
 * @apiUse InvalidRoleError
 */
router.post(
  '/create',
  (req, res, next) => validation(req, res, next, 'register'),
  async (req, res, next) => {
    const {email, password, role} = req.body;
    try {
      const user = await User.findOne({email});
      if (user) {
        return next({
          status: 409,
          message: 'Registration Error: User already exists.'
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

/**
 * @api {post} /users/authenticate Authenticates a user
 * @apiName AuthenticateUser
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
 * @apiError UserDoesntExist User not found.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Authentication error
 *     {
 *       "status": 401
 *       "message": "Authentication Error: User not found."
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
 * 
 * @apiError EmailNotVerified User e-mail is not verified.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Resource error
 *     {
 *       "status": 401
 *       "message": "Authentication Error: E-mail not verified."
 *     }
 * 
 * @apiUse MissingEmailError
 * @apiuse InvalidEmailError
 * @apiUse MissingPasswordError
 * @apiUse InvalidPasswordError
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
          message: 'Authentication Error: User not found.'
        });
      }
      if (!user.activated) {
        return next({
          status: 401,
          message: 'Authentication Error: E-mail not verified!'
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

/**
 * @api {delete} /users/:id Deletes a User
 * @apiName DeleteUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiHeader {String} Authorization Authorization token
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWQwYmQ0MWMyYjg1YmFhNTAzMDAw
 *               MDJkIiwiZW1haWwiOiJmb25pa2hteWdhQGdtYWlsLmNvbSIsImlhdCI6MTU2MjEwMjc4N30.I64zY_Fj-
 *               D30vttEDMaQBPaheuTLGX1F1Ap5pynpOBs"
 *     }
 *
 * @apiParam {String} id User's unique id
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       ok: true
 *       message: "User deleted"
 *     }
 * 
 * @apiUse MissingTokenError
 * @apiUse InvalidTokenError
 * @apiUse InsufficientPrivilegesError
 * @apiUse UserNotFoundError
 */

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
        message: 'Resource error: User not found.'
      });
    } catch (error) {
      return next(error);
    }
  }
);

/**
 * @api {post} /users/resetpassword Creates a password reset token for a user
 * @apiName RequestReset
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiParam {String} email User's email
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWQwYmQ0MWMyYjg1YmFhNTAzMDAw
 *               MDJkIiwiZW1haWwiOiJmb25pa2hteWdhQGdtYWlsLmNvbSIsImlhdCI6MTU2MjEwMjc4N30.I64zY_Fj-
 *               D30vttEDMaQBPaheuTLGX1F1Ap5pynpOBs"
 *     }
 * 
 * @apiUse MissingEmailError
 * @apiUse InvalidEmailError
 * @apiUse UserNotFoundError
 */

router.post(
  '/resetpassword',
  (req, res, next) => validation(req, res, next, 'request'),
  async (req, res, next) => {
    const {email} = req.body;
    try {
      const user = await User.findOne({email});
      if (!user) {
        return next({
          status: 404,
          message: 'Resource Error: User not found.'
        });
      }
      const token = jwtSign({email});
      await Reset.findOneAndRemove({email});
      await new Reset({
        email,
        token,
      }).save();
      return res.json({token});
    } catch (error) {
      return next(error);
    }
  }
);


/**
 * @api {post} /users/changepassword Changes a user's password
 * @apiName RequestChange
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiParam {String} password User's new password
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      ok: true,
 *      message: "Password was changed"
 *     }
 * 
 * @apiError ExpiredToken Reset token has expired.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Resource error
 *     {
 *       "status": 410
 *       "message": "Resource Error: Reset token has expired."
 *     }
 * 
 * @apiUse MissingPasswordError
 * @apiUse InvalidPasswordError
 * @apiUse UserNotFoundError
 */

router.post(
  '/changepassword',
  (req, res, next) => validation(req, res, next, 'change'),
  authorization,
  async (req, res, next) => {
    const {password} = req.body;
    const {email} = req.decoded;
    try {
      const user = await User.findOne({email});
      if (!user) {
        return next({
          status: 404,
          message: 'Resource Error: User not found.'
        });
      }
      const reset = await Reset.findOneAndRemove({email});
      if (!reset) {
        return next({
          status: 410,
          message: ' Resource Error: Reset token has expired.'
        });
      }
      user.password = password;
      await user.save();
      return res.json({
        ok: true,
        message: 'Password was changed.'
      });
    } catch (error) {
      return next(error);
    }
  }
);

/**
 * @api {patch} /users/:id Updates a User
 * @apiName UpdateUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiHeader {String} Authorization Authorization token
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWQwYmQ0MWMyYjg1YmFhNTAzMDAw
 *               MDJkIiwiZW1haWwiOiJmb25pa2hteWdhQGdtYWlsLmNvbSIsImlhdCI6MTU2MjEwMjc4N30.I64zY_Fj-
 *               D30vttEDMaQBPaheuTLGX1F1Ap5pynpOBs"
 *     }
 *
 * @apiParam {String} id User's unique id
 * @apiParam {String} [email] Optional email
 * @apiParam {String{8..}} [password] Optional password
 * @apiParam {String="role1","role2","role3"} [role] Optional role
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       ok: true
 *       message: "User updated"
 *     }
 * 
 * @apiUse MissingTokenError
 * @apiUse InvalidTokenError
 * @apiUse InsufficientPrivilegesError
 * @apiUse UserNotFoundError
 * @apiUse InvalidEmailError
 * @apiUse InvalidPasswordError
 * @apiUse InvalidRoleError
 * @apiUse MissingParametersError
 */

router.patch(
  '/:id', 
  authorization,
  identification,
  (req, res, next) => validation(req, res, next, 'update'),
  async (req, res, next) => {
    const {id} = req.params;
    try {
      const user = await User.findByIdAndUpdate(id, {...req.body});
      if (user) {
        return res.json({
          ok: true,
          message: 'User was updated'
        }); 
      } 
      return next({
        status: 404,
        message: 'Resource error: User not found.'
      });
    } catch (error) {
      return next(error);
    }
  }
);


module.exports = router;
