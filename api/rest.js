'use strict';

var mysql = require('mysql')

function rest_router(router, connection, md5) {
	var self = this;
	self.handleRoutes(router, connection, md5);
}

rest_router.prototype.handleRoutes = function(router, connection, md5) {
	router.get('/users', function(req, res) {
        connection.query("select * from users", function(err, rows) {
        	if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query","err_content" : err});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
	});
}

/* GET users listing. */
// router.get('/', function(request, response) {  
// 	router.get("/",function(req,res){
//         res.json({"Message" : "Hello World !"});
//     });
// 		// connection.query("select * from users", function(err, rows, fields) {
// 		// if (err) {
// 		// 	console.log("error: ", err);
// 		// 	throw err;
// 		// }
//   //   	response.send(['rows', rows]);
// 	//});
// });

module.exports = rest_router;