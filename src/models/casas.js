const { Schema, model } = require('mongoose');

const casaSchema = new Schema ({
    direccion: {
        type: String,
        require: true
    },
    codigo: {
        type: String,
        require: true,
        unique: true
    },
    familias: [{
        type: Schema.Types.ObjectId,
        ref: 'Familia'
    }]
}, {
    timestamps: true
});

module.exports = model('Casa', casaSchema);