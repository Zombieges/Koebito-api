'use strict';

// call the packages we need
var express    = require('express');
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var md5        = require('MD5');
var fs         = require('fs');
var yaml       = require('js-yaml');
var config     = yaml.load(fs.readFileSync('./config/default.yaml','utf8'));
var rest       = require('./api/rest.js');
var app        = express();

function restConnection() {
	var self = this;
	self.connectMysql();
}

// define mysql connection
restConnection.prototype.connectMysql = function() {
	var self = this;
	var pool = mysql.createPool({
		connectionLimit : 100,
		host     		: process.env.HOST,
 		user     		: process.env.USER,
 		password 		: process.env.password,
 		database 		: process.env.DATABASE
	});
	pool.getConnection(function(err, connection){
		if (err) {
			self.stop(err);
		} else {
			self.configureExpress(connection);
		}
	});
}

// start server
restConnection.prototype.configureExpress = function(connection) {
	var self = this;
	app.use(bodyParser.urlencoded({ extended: true}));
	app.use(bodyParser.json());
	var router = express.Router();
	app.use('/api', router);
	var rest_router = new rest(router, connection, md5);
	self.startServer();
}

// start node server
restConnection.prototype.startServer = function() {
	var port = process.env.PORT || 5000;
	app.listen(port, function() {
		console.log('Magic happens on port ' + port);
	});
}

// stop server
restConnection.prototype.stop = function(err) {
	console.log("log" + err);
	process.exit(1);
}

new restConnection();

