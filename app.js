var express = require('express');
var path = require('path');
var config = require('./config/config');
var winston = require('winston');
winston.add(winston.transports.File, { filename: 'propertyMonitor.log' });

/**
 *  Read app config
 */
config.readConfig();


var routes = require('./routes/index');
var scrape = require('./routes/scrape');

var app = express();
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/scrape', scrape);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
