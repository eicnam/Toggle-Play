var express    = require('express');
var bodyParser = require('body-parser');
var app        = express(); 

app.use(express.static(__dirname+"/public"));
app.use(bodyParser());

var port = process.env.PORT || 8080; 
var router = express.Router(); 

var mongoose = require('mongoose');
mongoose.connect('mongodb://toggle:toggle@ds049868.mongolab.com:49868/toggle');
var Application = require('./models/application');


router.use(function(req, res, next) {
	//her we log everything
	/*app.use(express.logger('dev'));	*/
	console.log('Something is happening.');
	next();
});


router.route('/api/application')
	//this is a test : add a new application in the mongo database
      .get(function(req, res) {
      
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

router.route('/')
	.get(function(req, res) {
		/*res.redirect('../index.html');*/
		//her we'll send the home page
		/*res.json({ message: 'hooray! welcome to our api!' });	*/
		res.sendfile('public/index.html');
	});
	      var application = new Application(); 

app.use('/', router);
app.listen(port);
console.log('Server is running on port ' + port);

