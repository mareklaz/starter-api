const Collaboration = require('../models/Collaboration.model');
const createError = require('http-errors');

module.exports.list = (req, res, next) => {
  Collaboration.find()
    .populate('projectId')
    .populate('userId')
    .then((collaborations) => {
      res.json(collaborations);
    })
    .catch(next);
};

module.exports.detail = (req, res, next) => {
  const { id } = req.params;
  console.log('Id para Detail: ', id);
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
  console.log(req.body);
  Collaboration.create(req.body)
    .then((collaboration) => res.status(200).json(collaboration))
    .catch(next);

  // Collaboration.find({ $and: [{ userId: userId }, { projectId: projectId }] })
  // Collaboration.findOne({
  //   $and: [{ userId: userId }, { projectId: projectId }],
  // })
  // Collaboration.findOne({
  //   $and: [{ userId: userId, projectId: projectId }],
  // })
  //   .then((result) => {
  //     if (result) {
  //       console.log('encontrador', result);
  //       res.json({ error: 'ya eres colaborador' });
  //     } else {
  //       return Collaboration.create(req.body).then((collaboration) =>
  //         res.status(201).json(collaboration)
  //       );
  //     }
  //   })
  //   .catch(next);
};

module.exports.delete = (req, res, next) => {
  const { userId, projectId } = req.body;
  console.log('Para borrar ', req.body);
  Collaboration.findOneAndDelete({
    $and: [{ userId: userId }, { projectId: projectId }],
  })
    .then((collaboration) => res.status(204).json(collaboration))
    .catch(next);
};
