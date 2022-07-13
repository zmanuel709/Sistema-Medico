const {Schema, model} = require('mongoose');

const pacientesSchema = new Schema({
    cedula: {
        type: String,
        require: true
    },
    nombres: {
        type: String,
        require: true
    },
    apellidos: {
        type: String,
        require: true
    },
    direccion: {
        type: String,
        require: true
    },
    telefono: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

module.exports = model('Pacientes', pacientesSchema);
