const {Schema, model} = require('mongoose');

const accesosSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    roles: [
        {
          type: Schema.Types.ObjectId,
          ref: "Role",
        },
      ],
}, {
    timestamps: true
})

module.exports = model('Acceso', accesosSchema);