const User = require("../models/User.model");
const createError = require("http-errors");

module.exports.list = (req, res, next) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
};

module.exports.detail = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      res.json(user);
    })
    .catch(next);
};

module.exports.create = (req, res, next) => {
  User.create(req.body)
    .then((user) => res.status(201).json(user))
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  const { id } = req.params;
  User.findByIdAndDelete(id)
    .then((user) => res.status(204).json(user))
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  console.log(req.currentUser)
  User.findById(req.currentUser)
    .then((user) => {
      if (!user) {
        next(createError(404, "User not found"));
      } else {
        res.json(user);
      }
    })
    .catch(next);
};
