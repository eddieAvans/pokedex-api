require('./config/injector');

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', routes);

app.listen(5000, () => console.log('Server started on port 5000'));

module.exports = app;