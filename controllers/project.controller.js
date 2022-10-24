const Project = require('../models/Project.model');
const createError = require('http-errors');

module.exports.list = (req, res, next) => {
  Project.find()
    .populate('creatorId')
    .populate('collaboratorId')
    .then((projects) => {
      res.json(projects);
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

module.exports.deleteAllProjects = (req, res, next) => {
  const { id } = req.params;
  Project.remove({})
    .then((project) => res.status(204).json(project))
    .catch(next);
};

module.exports.addCollaborator = (req, res, next) => {
  console.log(req.body);
  const { id, user } = req.body;

  Project.findOneAndUpdate(
    id,
    { $addToSet: { collaboratorId: user.id } },
    { new: true }
  )
    .populate('collaboratorId')
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((next) => {
      res.status(304);
    });
};

module.exports.removeCollaborator = (req, res, next) => {
  console.log(req.body);
  const { id, user } = req.body;

  Project.findOneAndUpdate(
    id,
    { $pull: { collaboratorId: user.id } },
    { new: true }
  )
    .populate('collaboratorId')
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((next) => {
      res.status(304);
    });
};

// module.exports.deleteCollaborator = (req, res, next) => {
//   console.log(req.body);
//   const { id, user } = req.body;

//   Project.findById(id).then((project) => {});

//   Project.findById(id)
//     .populate('collaboratorId')
//     .then((project) => {
//       if (!project.collaboratorId.find(user.id)) {
//         project.collaboratorId.push(user.id);
//       }

//       res.status(304).json(project);
//     })
//     .catch(next);
// };
