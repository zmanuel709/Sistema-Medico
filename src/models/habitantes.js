const { Schema, model } = require('mongoose');

const habitanteSchema = new Schema({
  nombres: {
    type: String,
    required: true
  },
  cedula: {
    type: String,
    required: true
  },
  fn: {
    type: String,
    required: true
  },
  codigoC: {
    type: String,
    required: true
  },
  sexo: {
    type: String,
    required: true
  },
  edad: {
    type: Number,
    required: true
  },
  familia: {
    type: Schema.Types.ObjectId,
    ref: 'Familia',
    default: null
  }
}, {
  timestamps: true
});

module.exports = model('Habitante', habitanteSchema);