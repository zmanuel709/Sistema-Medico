const mongoose = require('mongoose')

const { MONGOB_URI } = process.env;

mongoose.connect(MONGOB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})

    .then(db => console.log('database is connected'))
    .catch(err => console.log(err));