'use strict';

var express = require('express');
const app = express();
var routes = require('./routes');

var jsonParser = require('body-parser').json;
var logger = require('morgan');

app.use(logger('dev'));
app.use(jsonParser());

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/qa');

var db = mongoose.connection;

db.on('error', () => {
  console.err('connection error:', err);
});

db.once('open', () => {
  console.log('db connection successful');
});

app.use('/questions', routes);

// catch 404 and forward to error handler
app.use( (req, res, next) =>{
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// Error handler
app.use( (err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message
		}
	});
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log('node app.js worked!', port);
});
