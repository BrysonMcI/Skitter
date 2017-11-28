const express = require('express');
const app = express();
/*const es = require('elasticsearch');
const esclient = new es.Client({
	host: 'localhost:9200'
});
*/
app.get('/', function (req, res) {
  res.send('Hello World!');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
