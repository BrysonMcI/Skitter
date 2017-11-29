client = require('./connection.js');

client.delete({  
	index: 'skitter',
	id: 'eSiEBGABksKyUtkbaDzO',
	type: 'skit'
},function(err,resp,status) {
	console.log(resp);
});
