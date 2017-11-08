'use strict';

const express = require("express");

function rest() {
    this.submit();
}

// init & call to submit query
rest.prototype.submit = function() {
    var router = module.exports = express.Router();
    this.handleRoutes(router);
}

// submit query
rest.prototype.handleRoutes = function(router) {
    // get users info
	router.get('/users', function(req, res) {
        req.mysql.query("select * from users", function(err, rows) {
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query","Error Content" : err});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
	});
    // get voices info each kind
    router.get('/voices', function(req, res) {
        console.log("parameter : " + req.query.kind);
        req.mysql.query("select v.voiceId,v.kind,ownerId,v.soundUrl,v.title,u.userId,u.userName,u.imageUrl from voices as v Inner join users as u on v.ownerId = u.userId and v.kind = " + req.query.kind, function(err, rows) {
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query","Error Content" : err});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Voices" : rows});
            }
        });
    });
}
 
new rest();