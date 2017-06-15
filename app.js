'use strict';

var express = require('express');
const app = express();

app.use( (req, res, next) => {
	console.log("The leave on the trees are", req.query.color);
	next();
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log('node app.js worked!', port);
});
