var express = require('express');
var bodyparser = require('body-parser');
var connection = require('./connection');
var routes = require('./routes');
var config = require('./config');

var app = express();
app.use(express.static('../public'));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   next();
});

connection.init();
routes.configure(app);

var server = app.listen(config.port, function() {
  console.log('Server listening on port ' + server.address().port);
});
