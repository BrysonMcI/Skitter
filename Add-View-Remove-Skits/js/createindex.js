var client = require('./connection.js');

client.indices.create({
	index: 'skitter',
	body: {
		mappings: {
			skit: {
				properties: {
					join_type: {
						type: "join",
						relations: {
							top_level: "reply"
						}
					}
				}
			}
		}
	}
}, function(err, resp, status) {
	if(err) {
		console.log(err);	
	} else {
		console.log('create', resp);	
	};
});
