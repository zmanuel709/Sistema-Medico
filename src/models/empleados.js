const {Schema, model} = require('mongoose');

const empleadosSchema = new Schema({
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
    especialidad: {
        type: String,
        require: true
    },
    telefono: {
        type: String,
        require: true
    },
correo: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

module.exports = model('Empleado', empleadosSchema);