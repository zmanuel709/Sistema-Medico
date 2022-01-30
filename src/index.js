require('dotenv').config();

const app = require('./server.js');
require('./database.js');


app.listen(app.get('port'), () => {
    console.log('server on port:', app.get('port'));
})