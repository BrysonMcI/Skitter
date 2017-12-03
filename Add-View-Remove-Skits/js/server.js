const express = require('express');
const bodyParser = require('body-parser');

const addSkit = require('./doc_add');
const searchSkits = require('./search');
const delSkit = require('./doc_del');
const index = require('./createindex');

// app setup
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

// dummy root route
app.get('/', function (req, res) {
  res.json({
    "message": "you hit the node microservice :)"
  });
});

// add a skit as the current user
app.post('/AddSkit', addSkit);

// remove skit by the current user
app.post('/RemoveSkit', delSkit);

// get all requested skit feeds
app.get('/GetSkits', searchSkits);

app.listen(8000, function () {
  index();
  console.log('node microservice is running on tcp/8000!');
});
