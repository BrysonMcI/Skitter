var client = require('./connection.js');

var ex = function() {
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
		console.log('create index status');
		if(err) {
			console.log(err.message);
		} else {
			console.log('create', resp);
		};
	});
};

module.exports = ex;