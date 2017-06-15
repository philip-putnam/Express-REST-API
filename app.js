'use strict';

var express = require('express');
const app = express();

app.use( (req, res, next) => {
	console.log('First piece of middleware');
	next();
});

app.use( (req, res, next) => {
	console.log('Second piece of middleware');
	next();
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log('node app.js worked!', port);
});
