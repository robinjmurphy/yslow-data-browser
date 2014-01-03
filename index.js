var express = require('express');
var path = require('path');
var results = require('./routes/results');
var urls = require('./routes/urls');

var app = express();

// settings

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// middleware

app.use(express.logger());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

// routes

app.get('/', urls.all);
app.get('/results', results.all);
app.get('/results/:id', results.get);

// error handling

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

module.exports = app;