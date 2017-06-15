'use strict';

var express = require('express');
const app = express();
var jsonParser = require('body-parser').json;

let jsonCheck = function(req, res, next) {
	if(req.body) {
		console.log('The sky is', req.body.color);
	} else {
		console.log('There is no body property on the request');
	}
	next();
}

app.use(jsonCheck);
app.use(jsonParser());
app.use(jsonCheck);

// Example of sending something to another api
// app.use( (req, res, next) => {
// 	req.myMessage = "hello, middleware #2";
// 	next();
// });
// app.use( (req, res, next) => {
// 	console.log(req.myMessage);
// 	next();
// });

// example of order & getting the id from the url
// app.use( (req, res, next) => {
// 	console.log('First piece of middleware');
// 	next();
// });
// app.use('/different/:id', (req, res, next) => {
// 	console.log('Second piece of middleware', req.params.id);
// 	next();
// });

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log('node app.js worked!', port);
});
