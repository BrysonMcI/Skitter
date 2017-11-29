const express = require('express');
const app = express();
const client = require('./connection.js');

// dummy root route
app.get('/', function (req, res) {
  res.json({
    "message": "you hit the node microservice :)"
  });
});

// add a skit as the current user
app.post('/AddSkit', function (req, res) {
    res.json({
        "message": "coming soon :)"
    });
});

app.listen(3000, function () {
  console.log('node microservice is running on tcp/3000!');
});
