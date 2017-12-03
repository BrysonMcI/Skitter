var client = require('./connection.js');

client.cluster.health({}, function(err, resp, status) {
	console.log('-- client health --', resp);	
});

client.count({index: 'skitter', type: 'skit'},function(err,resp,status) {  
	  console.log("skits",resp);
});
