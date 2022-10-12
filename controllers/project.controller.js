const Project = require("../models/Project.model");
const createError = require("http-errors");

module.exports.list = (req, res, next) => {
  Project.find()
    .populate('creatorId')
    .populate('collaboratorId')
    .then((projects) => {
      res.json(projects)
    })
    .catch(next);
};

module.exports.detail = (req, res, next) => {
  const { id } = req.params;
  Project.findById(id)
    .populate('creatorId')
    .populate('collaboratorId')
    .then((project) => {
      res.json(project);
    })
    .catch(next);
};

module.exports.create = (req, res, next) => {
  Project.create(req.body)
    .then((project) => res.status(201).json(project))
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  const { id } = req.params;
  Project.findByIdAndDelete(id)
    .then((project) => res.status(204).json(project))
    .catch(next);
};
