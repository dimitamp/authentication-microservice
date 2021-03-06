/* eslint-disable func-names */
const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const {passwordDigest, comparePassword} = require('../utilities/authentication/helpers');
const {constants: {min, roles, activated}} = require('../utilities/validation');

mongoose.pluralize(null);

const UserSchema = new mongoose.Schema(
  {
    email: {
      index: true,
      type: String,
      unique: 'A user already exists with that email!',
      required: [true, 'User email is required'],
      lowercase: true
    },
    password: {
      type: String,
      required: [true, 'User password is required'],
      select: false,
      minlength: min
    },
    role: {
      required: [true, 'User role is required'],
      type: String,
      enum: roles
    },
    activated: {
      type: Boolean,
      default: activated
    }
  }, {timestamps: true}
);

// Plugin for Mongoose that turns duplicate errors into regular Mongoose validation errors.

UserSchema.plugin(beautifyUnique);

// Pre save hook that hashes passwords

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = passwordDigest(this.password);
  }
  return next();
});

// Model method that compares hashed passwords

UserSchema.methods.comparePassword = function (password) {
  return comparePassword(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
