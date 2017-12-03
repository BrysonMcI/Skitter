var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
	hosts: [
		'http://prod_elk:9200'
	]
});

module.exports = client;
