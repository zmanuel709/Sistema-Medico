const { Schema, model } = require('mongoose');

const familiaSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  codigo: {
    type: String,
    required: true,
    unique: true
  },
  jefe: {
    type: Schema.Types.ObjectId,
    ref: 'Habitante',
    required: true
  },
  habitantes: [{
    type: Schema.Types.ObjectId,
    ref: 'Habitante'
  }],
  casa: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

module.exports = model('Familia', familiaSchema);