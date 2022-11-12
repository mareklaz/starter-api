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
  Collaboration.find({
    $and: [{ _userId: userId }, { _projectId: projectId }],
  })
    .then((result) => {
      if (result.length > 0) {
        console.log('encontrador', result);
        res.json({ error: 'ya eres colaborador' });
      } else {
        console.log('entro');
        return Collaboration.create(req.body).then((collaboration) =>
          res.status(201).json(collaboration)
        );
      }
    })
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  const { userId, projectId } = req.body;
  console.log('Para borrar ', req.body);
  Collaboration.findOne({
    $and: [{ _userId: userId }, { _projectId: projectId }],
  })
    .then((result) => {
      console.log('Resultado', result);
      if (result) {
        Collaboration.findOneAndDelete({ _id: result._id })
          .then((result) => res.status(204).json(result))
          .catch(next);
      } else {
        console.log('entro');
        return Collaboration.create(req.body).then((collaboration) =>
          res.status(201).json(collaboration)
        );
      }
    })
    .catch(next);
};
