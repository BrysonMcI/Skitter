var client = require('./connection.js');

var following = ['Gru', 'Dave']

client.search({  
  index: 'skitter',
  type: 'skit',
  body: {
    query: {
	 	match: {"author": following.join("|") }
    },
  }
},function (error, response,status) {
    if (error){
      console.log("search error: "+error)
    }
    else {
      console.log("--- Response ---");
      console.log(response);
      console.log("--- Hits ---");
      response.hits.hits.forEach(function(hit){
        console.log(hit);
      })
    }
});

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
