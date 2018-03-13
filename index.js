
const debug = require('debug')('app:startup');
const config = require('config');
const Joi = require('joi');
const express = require('express');
const logger = require('./middleware/logger');
const auth = require('./middleware/authentication');
const helmet = require('helmet');
const morgan = require('morgan');
const courses = require('./routes/courses');
const main = require('./routes/main');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(logger);
app.use(auth);
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', main);

app.set('view engine', 'pug');
app.set('views', './views');

console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`app: ${app.get('env')}`);
}

// PORT
const port = process.env.PORT || 3000;
app.listen( port, () => console.log( `Listening on port ${port}...` ) );