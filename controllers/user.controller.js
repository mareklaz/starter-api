const User = require('../models/User.model');

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
  if (req.file) {
    req.body.userImg = req.file.path;
  }
  console.log('Llega REQ BODY', req.body);
  User.create(req.body)
    .then((user) => res.status(201).json(user))
    .catch(next);
};

module.exports.update = (req, res, next) => {
  const { id } = req.body;
  User.findOneAndUpdate(id, req.body, { new: true, rawResult: true })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.currentUser)
    .then((user) => {
      if (!user) {
        next(createError(404, 'User not found'));
      } else {
        res.json(user);
      }
    })
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  const { id } = req.body;

  User.findByIdAndDelete(id)
    .then((user) => res.status(204).json(user))
    .catch(next);
};

module.exports.deleteAllUsers = (req, res, next) => {
  User.remove({})
    .then((user) => res.status(204).json(user))
    .catch(next);
};
