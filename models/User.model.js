const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const EMAIL_PATTERN =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /^.{8,}$/i;
const ROUNDS = 10;

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Es necesario introducir tu nombre"],
    },
    lastName: {
      type: String,
      required: [true, "Es necesario introducir tu apellido"],
    },
    userName: {
      type: String,
      required: [true, "Es necesario introducir un nombre de usuario"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Es necesario introducir un e-mail"],
      match: [EMAIL_PATTERN, "Es necesario introducir un e-mail válido"],
    },
    password: {
      type: String,
      required: [true, "Es necesario introducir un password"],
      match: [PASSWORD_PATTERN, "Es necesario introducir un password válido"],
      minlength: 3,
    },
    profile: {
      type: String,
      enum: [
        "Front-End",
        "Back-End",
        "Full-Stack",
        "Graphic Designer",
        "UX/UI",
        "Data Analyst",
      ],
    },
    about: {
      type: String,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v;
        delete ret._id;
        delete ret.password;
        
        return ret;
      },
    },
  }
);

UserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, ROUNDS).then((hash) => {
      this.password = hash;
      next();
    });
  } else {
    next();
  }
});

UserSchema.methods.checkPassword = function (passwordToCompare) {
  return bcrypt.compare(passwordToCompare, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
