var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

console.log(__dirname + '/public');

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

var server = app.listen(port, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});