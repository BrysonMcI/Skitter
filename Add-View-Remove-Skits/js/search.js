var client = require('./connection.js');

// searchSkits takes the request from the client specifying who
// they would like to view skits by and returns that list,
// sorted by timestamp entered into database
var searchSkits = function(req, res) {
  var following = req.query.following;
  if (!following) {
    return res.status(400).json({
      "success": "false",
      "reason": "missing required parameter"
    });
  }
  // convert to array, if there is only one object this allows
  // us to still use join without having to get weird
  following = new Array(following);
  client.search({
    index: 'skitter',
    type: 'skit',
    body: {
      query: {
        match: {"author": following.join("|") }
      },
      sort: [
        {"timestamp": {"order": "desc"} }
      ]
    }
    // add sorting by timestamp
  },function (error, response, status) {
      if (error){
        console.log("search error: "+error)
        return res.status(500).json({
          "success": "false",
          "reason": "DB error"
        });
      }
      /*var skits = new Object({
        "success": "true",
        "skits": [
          response.hits.hits
        ]
      });
      */
      var skits = [];
      response.hits.hits.forEach((h)=> {
        h._source._id = h._id;
        skits.push(h._source)
      });
      return res.json({
        "success": "true",
        "skits": skits
      });
  });
}

module.exports = searchSkits;
/*
can have a fuzzy match (for user searching) which can also 
spam mulitiple fields:

"query": {
	"multi_match" : {
		"query" : "comprihensiv guide",
		"fields": ["title", "summary"],
		"fuzziness": "AUTO"
	}
},
"_source": ["title", "summary", "publish_date"],
"size": 1

note: can also use regexing in searchs, including wildcard *


*/
