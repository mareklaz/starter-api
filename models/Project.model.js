const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Es necesario introducir un nombre de Proyecto']
    },
    description: {
      type: String,
      required: [true, 'Es necesario introducir la descripción del Proyecto']
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
    status: {
      type: String,
      enum: ["Starting", "In progress", "Pending", "Done"],
    },
    // creatorId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: [true],
    // }
  }
)

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;