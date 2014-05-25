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
	//her we log everything
	console.log('Something is happening.');
	next();
});

router.route('/')
	.get(function(req, res) {
		//her we'll send the home page
		res.json({ message: 'hooray! welcome to our api!' });	
	});

router.route('/application')
	//this is a test : add a new application in the mongo database
      .get(function(req, res) {
      
	      var application = new Application(); 
	      application.name = "hey";

	      application.save(function(err) {
			if (err)
				res.send(err);
			res.json({ message: 'Application created!' });
	      });
      })
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
console.log('Server is running on port ' + port);
