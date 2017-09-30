var express = require('express');
var http = require('http');
var app = express();
var handlebars = require('express-handlebars').create({
  default: 'main'
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
//set port
var port = process.env.PORT || 8080;
//Allows me to use stylesheets in handlebars.
app.use(express.static('public'));

//HOME PAGE
app.get('/', function(req, res) {
  res.render('index');
});

//NOT FOUND
app.use(function(req, res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});
//SERVER ERROR
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});
app.listen(port, function() {
  console.log('app running');
});
