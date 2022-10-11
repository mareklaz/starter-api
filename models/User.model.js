const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    userName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    profile: {
      type: String,
    },
    about: {
      type: String,
    },
  }
)

const User = mongoose.model('User', UserSchema);

module.exports = User;