// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express(); 

app.use(bodyParser());

var port = process.env.PORT || 8080; 
var router = express.Router(); 

var mongoose = require('mongoose');
mongoose.connect('mongodb://toggle:toggle@ds049868.mongolab.com:49868/toggle');
var Application = require('./models/application');


router.use(function(req, res, next) {
	console.log('Something is happening.');
	next();
});

router.route('/')
	.get(function(req, res) {
	
		res.json({ message: 'hooray! welcome to our api!' });	
	});

router.route('/application')
      .post(function(req, res) {
      
	      var application = new Application(); 
	      application.name = "hey";

	      application.save(function(err) {
			if (err)
				res.send(err);
			res.json({ message: 'Application created!' });
	      });
      });


app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);