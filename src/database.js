const mongoose = require('mongoose')

const { MONGOB_URI } = process.env;

mongoose.connect(MONGOB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})

    .then(db => console.log('la Base de Datos ha sido Conectada exitosamente'))
    .catch(err => console.log(err));