'use strict';

// call the packages we need
const express    = require('express'),
	mysql      = require('mysql'),
	bodyParser = require('body-parser'),
	rest       = require('./api/rest.js');,
	app        = express(),
	currentDateAndTime = new Date();

function restConnection() {
	this.connectMysql();
}

// define mysql connection
restConnection.prototype.connectMysql = function() {
	var pool = mysql.createPool({
		connectionLimit    : 100,
		waitForConnections : true,
		queueLimit         : 0,
		host               : process.env.HOST,
 		user               : process.env.USER,
 		password           : process.env.PASSWORD,
 		database           : process.env.DATABASE,
		debug              :  true,
		waitTimeOut        : 28800,	
	});
	this.configureExpress(pool);
}

// define to use rest.js with pool
restConnection.prototype.configureExpress = function(pool) {
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(function (req, res, next) {
    	req.mysql = pool;
    	next();
    });
    app.use('/api', rest);
    this.startServer();
}

// start server
restConnection.prototype.startServer = function() {
	var port = process.env.PORT || 5000;
	app.listen(port, function() {
		console.log(currentDateAndTime + 'I am alive at Port ' + port);
	});
}

// stop server
restConnection.prototype.stop = function(err) {
	console.log("log" + err);
	process.exit(1);
}

new restConnection();

