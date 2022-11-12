const mongoose = require('mongoose');

const CollaborationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: [false, 'Es necesario tener un ID de Usuario'],
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      require: [false, 'Es necesario tener un ID de Proyecto'],
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v;
        delete ret._id;
        return ret;
      },
    },
  }
);

const Collaboration = mongoose.model('Collaboration', CollaborationSchema);

module.exports = Collaboration;
