const Collaboration = require('../models/Collaboration.model');
const createError = require('http-errors');

module.exports.list = (req, res, next) => {
  const { userId, projectId } = req.body;
  Collaboration.findOne({
    $and: [{ userId: userId }, { projectId: projectId }],
  })
    .populate('projectId')
    .populate('userId')
    .then((collaborations) => {
      res.json(collaborations);
    })
    .catch(next);
};

module.exports.detail = (req, res, next) => {
  const { id } = req.params;

  Collaboration.find({ projectId: id })
    .populate('projectId')
    .populate('userId')
    .then((collaboration) => {
      res.json(collaboration);
    })
    .catch(next);
};

module.exports.create = (req, res, next) => {
  const { userId, projectId } = req.body;
  Collaboration.findOne({
    $and: [{ userId: userId }, { projectId: projectId }],
  })
    .then((colaboracion) => {
      if (!colaboracion) {
        Collaboration.create(req.body)
          .then((project) => res.status(201).json(project))
          .catch(next);
      } else {
        console.log('El resistro Existe');
        next();
      }
      next();
    })
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  const { id } = req.body;
  Collaboration.findByIdAndDelete(id)
    .then((project) => res.status(204).json(project))
    .catch(next);
};
