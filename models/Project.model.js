const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    profileNeeded: {
      type: String,
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    status: {
      type: String,
    },
    reward: {
      type: String,
    }, 
  }
)

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;