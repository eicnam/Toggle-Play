var express    = require('express');
var bodyParser = require('body-parser');
var app        = express(); 

app.use(express.static(__dirname+"/public"));
app.use(bodyParser());

var port = process.env.PORT || 8080; 




var routes = require('./nroutes/indexroutes');
var routes = require('./nroutes/approutes');
app.use('/', routes);
app.use('/app', routes);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



var mongoose = require('mongoose');
mongoose.connect('mongodb://toggle:toggle@ds049868.mongolab.com:49868/toggle');
var Application = require('./models/application');


module.exports = app;

app.listen(port);
console.log('Server is running on port ' + port);

