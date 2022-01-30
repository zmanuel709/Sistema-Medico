const {Schema, model} = require('mongoose');

const espSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    completed: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
})

module.exports = model('Especialidad', espSchema);