client = require('./connection.js');

// delSkit takes the request and attempts to delete the skit
// with the given ID if the given email matches the author,
// the given email is provided by the trusted api gateway
var delSkit = function(req, res) {
	var skitID = req.body._id;
	var email = req.body.email;
	if (!skitID || !email) {
		return res.status(400).json({
			"success": "false",
			"reason": "missing required parameter"
		});
	}
	// the deleteByQuery libraries didn't work :(
	client.search({
		index: 'skitter',
		body: {
			query: {
				term: {"author": email},
				term: {"_id": skitID}
			}
		},
		type: 'skit'
	},function(err,resp,status) {
		if (status == 404) {
			return res.status(404).json({
				"succses": "false",
				"reason": "document not found"
			});
		}
		if (err) {
			console.log(err);
			return res.status(500).json({
				"success": "false",
				"reason": "DB Error"
			});
		}
		if (resp.hits.total != 1) {
			return res.status(404).json({
				"success": "false",
				"reason": "document not found"
			});
		}
		// if we haven't failed by now, actually delete it
		client.delete({
			index: "skitter",
			id: skitID,
			type: "skit"
		}, function(err, resp, status) {
			if (err) {
				console.log(err);
				return res.status(500).json({
					"success": "false",
					"reason": "DB Error"
				});
			}
			return res.json({
				"success": "true"
			});
		});
	});
}

module.exports = delSkit;
