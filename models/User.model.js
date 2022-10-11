const mongoose = require('mongoose');

const EMAIL_PATTERN = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /^.{8,}$/i;

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Es necesario introducir tu nombre']
    },
    lastName: {
      type: String,
      required: [true, 'Es necesario introducir tu apellido']
    },
    userName: {
      type: String,
      required: [true, 'Es necesario introducir un nombre de usuario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Es necesario introducir un e-mail"],
        match: [EMAIL_PATTERN, "Es necesario introducir un e-mail válido"],
    },
    password: {
        type: String,
        required: [true, 'Es necesario introducir un password'],
        match: [PASSWORD_PATTERN, 'Es necesario introducir un password válido']
    }, 
    profile: {
      type: String,
      enum: ["Front-End", "Back-End", "Full-Stack", "Graphic Designer", "UX/UI", "Data Analyst"],
    },
    about: {
      type: String,
    },
  }
)

const User = mongoose.model('User', UserSchema);

module.exports = User;