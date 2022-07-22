require('dotenv').config();

const app = require('./server.js');
require('./database.js');


app.listen(app.get('port'), () => {
    console.log('servidor funcionando en el puerto:', app.get('port'));
})