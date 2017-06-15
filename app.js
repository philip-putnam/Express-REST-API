'use strict';

var express = require('express');
const app = express();
var routes = require('./routes');

var jsonParser = require('body-parser').json;
var logger = require('morgan');

app.use(logger('dev'));
app.use(jsonParser());

app.use('/questions', routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log('node app.js worked!', port);
});
