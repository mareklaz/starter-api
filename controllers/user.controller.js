const User = require('../models/User.model');
const createError = require('http-errors');
const Like = require('../models/Likes.model');

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

  console.log('Usuario a crear: ', req.body);

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

module.exports.deleteAllUsers = (req, res, next) => {
  User.remove({})
    .then((user) => res.status(204).json(user))
    .catch(next);
};

module.exports.update = (req, res, next) => {
  const { id } = req.body;
  User.findOneAndUpdate(id, req.body, { new: true })
    .then((user) => {
      console.log('usuario actualizado ', user);
      res.status(204).send();
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

// module.exports.getLikes = (req, res, next) => {
//   const { userId, projectId } = req.body;
//   console.log(userId, projectId);

//   Like.findOne({ userId: userId, projectId: projectId })
//     .then((like) => {
//       res.json(like);
//     })
//     .catch(next);
// };

module.exports.getLikes = (req, res, next) => {
  Like.find()
    .then((like) => {
      res.json(like);
    })
    .catch(next);
};

module.exports.addLikes = (req, res, next) => {
  const { userId, projectId } = req.body;
  console.log(userId, projectId);

  Like.create(req.body)
    .then((like) => res.status(201).json(like))
    .catch(next);
};
