var client = require('./connection.js');

// how long are skits?
const max_length = 140;

// addSkit processes the request from the client which as the author email
// added as author=author_name by the api gateway in addition to the content
// supplied by the end user
var addSkit = function(req, res) {
	content = req.body.content;
	author = req.body.author;

	if (!author || !content || content.length == 0) {
		return res.status(400).json({
			"success": "false",
			"reason": "missing required parameters"
		});
	}
	if (content.length > max_length){
		return res.json({
			"success": "false",
			"reason": "content too long"
		});
	}
	client.index({
		index: 'skitter',
		// id: '1', // ommited means auto-generate
		type: 'skit', // doc-type
		body: {
				"author": author,
				"content": content,
				"timestamp": new Date(),
				join_type: {
					"name": "top_level"
				}
			}
		}, function(err,resp,status) {
			if(err) {
				console.log(err);
				return res.status(500).json({
					"success": "false",
					"reason": "DB error"
				});
			}
			console.log('skit added')
			return res.status(201).json({
				"success": "true",
				"skit_id": resp._id
			});
	});
}

module.exports = addSkit;
