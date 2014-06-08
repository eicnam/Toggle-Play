var express    = require('express');
var bodyParser = require('body-parser');
var app        = express(); 

app.use(express.static(__dirname+"/public"));
app.use(bodyParser());

var port = process.env.PORT || 8080; 
var router = express.Router(); 

// Database connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://toggle:toggle@ds049868.mongolab.com:49868/toggle');

// Models
var db_app = require('./models/application');

// Routing
router.use(function(req, res, next) {
	console.log('Requested URL : ' + req.originalUrl);
	next();
});

router.route('/api/application/:app_name')
	.get(function(req, res){
		var app_name = req.params.app_name;
		db_app.findOne({ name : app_name }, function (err, app) {
			if (err) return next(err);
			res.json({ 'SELECT * FROM Application WHERE name = app_name;' : app });
		});
	});

router.route('/api/application')
	.get(function(req, res) {
		db_app.find(function (err, apps) {
			if (err) return next(err);
			res.json({ 'SELECT * FROM Application;' : apps });
		});
	});

router.route('/api/application/add')
	.post(function(req, res){
		var newApp = new db_app();
		newApp.name = req.body.app.name;
		newApp.author = req.body.app.author;
		newApp.description = req.body.app.description;

		newApp.save(function(err) {
			if (err)
				res.send(err);
			res.json({ message: 'New App created : ' + newApp.name + '!' });
		});
	});

router.route('/api/application/update/:appid')
	.put(function(req, res) {
		db_app.findById(req.params.appid, function(err, _app) {
			if (err)
				res.send(err);

			_app.name = req.body.name;
			_app.author = req.body.author;
			_app.description = req.body.description;

			_app.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: _app.name + ' updated !' });
			});
		});
	});

router.route('/api/application/delete/:appid')
	.delete(function(req, res) {
		db_app.remove({
			_id: req.params.appid
		}, function(err, _app) {
			if (err)
				res.send(err);

			res.json({ message: 'App successfully deleted' });
		});
	});

router.route('/')
	.get(function(req, res) {
		/*res.redirect('../index.html');*/
		//her we'll send the home page
		/*res.json({ message: 'hooray! welcome to our api!' });	*/
		res.sendfile('public/index.html');
	});

app.use('/', router);
app.listen(port);
console.log('Server is running on port ' + port);