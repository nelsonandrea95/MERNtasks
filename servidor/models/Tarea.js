const mongoose = require('mongoose');

const TareaSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: Boolean,
    default: false
  },
  creado: {
    type: Date,
    default: Date.now()
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proyecto'
  }
});

module.exports = mongoose.model('Tarea', TareaSchema);
