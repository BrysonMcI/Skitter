var client = require('./connection.js');

client.index({  
	index: 'skitter',
	// id: '1', // ommited means auto-generate
	type: 'skit', // doc-type
	body: {
			"author": "Dave",
			"content": "Test skit from ddaaaavveee",
		  }
	}, function(err,resp,status) {
	    console.log(resp);
});
