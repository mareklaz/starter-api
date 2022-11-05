const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Back: Es necesario introducir un nombre de Proyecto'],
  },
  description: {
    type: String,
    required: [
      true,
      'Back: Es necesario introducir la descripción del Proyecto',
    ],
  },
  profileNeeded: {
    type: String,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  githubLink: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Inicio', 'En progreso', 'Pendiente', 'Finalizado'],
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true],
  },
  collaboratorId: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    required: [true],
  },
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
