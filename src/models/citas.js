const {Schema, model} = require('mongoose');

const citasSchema = new Schema({
    cedula: {
        type: String,
        require: true
    },
    medico: {
        type: String,
        require: true
    },
    turno: {
        type: String,
        require: true
    },
    fecha: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

module.exports = model('Cita', citasSchema);