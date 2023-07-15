const mongoose = require('mongoose')

const { MONGOB_URI } = process.env;

//si la base de datos no se inicia ==== mongod.exe --storageEngine=mmapv1

mongoose.connect(MONGOB_URI, {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})

    .then(db => console.log('database is connected'))
    .catch(err => console.log(err));