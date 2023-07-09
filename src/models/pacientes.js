const {Schema, model} = require('mongoose');

const pacientesSchema = new Schema({
    nombres: {
        type: String,
        require: true
    },
    cedula: {
        type: String,
        require: true
    },
    fn: {
        type: String,
        require: true
    },
    codigoC: {
        type: String,
        require: true
    },
    sexo: {
        type: String,
        require: true
    },
    edad: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

module.exports = model('Paciente', pacientesSchema);
