const Project = require("../models/Project.model");
const createError = require("http-errors");

module.exports.list = (req, res, next) => {
  Project.find()
    .then((projects) => {
      res.json(projects);
    })
    .catch(next);
};

module.exports.detail = (req, res, next) => {
  const { id } = req.params;
  Project.findById(id)
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
