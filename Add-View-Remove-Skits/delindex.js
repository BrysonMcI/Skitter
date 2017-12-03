var client = require('./connection.js');

client.indices.delete({index: 'skitter'},function(err,resp,status) {  
	  console.log("delete",resp);
});
