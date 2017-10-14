'use strict';

var mysql = require('mysql');

function rest_router(router, connection, md5) {
	var self = this;
	self.handleRoutes(router, connection, md5);
}

rest_router.prototype.handleRoutes = function(router, connection, md5) {

    // get users info
	router.get('/users', function(req, res) {
        connection.query("select * from users", function(err, rows) {
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
        connection.query("select v.voiceId,v.kind,ownerId,v.soundUrl,v.title,u.userId,u.userName,u.imageUrl from voices as v Inner join users as u on v.ownerId = u.userId and v.kind = " + req.query.kind, function(err, rows) {
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query","Error Content" : err});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Voices" : rows});
            }
        });
    });
}
module.exports = rest_router;