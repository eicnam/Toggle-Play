var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var fs         = require('fs');

var category_path = "./public/content/category.json";

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

router.route('/api/application/add')
	.post(function(req, res){
		var newApp = new db_app();
		newApp.name = req.body.name;
		newApp.author = req.body.author;
		newApp.description = req.body.description;
		newApp.publicationDate = new Date();
		newApp.lastUpdateDate = new Date();
		newApp.image = req.body.image;
		newApp.category = req.body.category;
		newApp.link = req.body.link;
		newApp.mail = req.body.mail;
		newApp.price = req.body.price;
		newApp.linkDonation = req.body.linkDonation;

		newApp.save(function(err) {
			if (err)
				res.send(err);
			
			res.json({ message: 'The App ' + newApp.name + ' has been created !'});
		});
	});

router.route('/api/application/categories')
	.get(function(req, res){
		var categories = JSON.parse(fs.readFileSync(category_path, 'utf8'));
		res.json({ 'categories' : categories.categories });
	});

router.route('/api/application/update/:appid')
	.put(function(req, res) {
		db_app.findById(req.params.appid, function(err, _app) {
			if (err)
				res.send(err);

			_app.name = req.body.name;
			_app.author = req.body.author;
			_app.description = req.body.description;
			_app.publicationDate = _app.publicationDate;
			_app.lastUpdateDate = new Date();
			_app.image = req.body.image;
			_app.category = req.body.category;
			_app.link = req.body.link;
			_app.mail = req.body.mail;
			_app.price = req.body.price;
			_app.linkDonation = req.body.linkDonation;

			_app.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'The App ' + _app.name + ' has been updated !' });
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

			// get and return all the apps after you delete another
			db_app.find(function(err, apps) {
				if (err)
					res.send(err)
				
				res.json({ message: 'App successfully deleted !', apps: apps });
			});
		});
	});

router.route('/api/application/:app_name')
	.get(function(req, res){
		var app_name = req.params.app_name;
		db_app.findOne({ name : app_name }, function (err, app) {
			if (err) return next(err);

			res.json({ 'appDetails' : app });
		});
	});

router.route('/api/application')
	.get(function(req, res) {
		db_app.find(function (err, apps) {
			if (err) return next(err);
			
			res.json({ 'apps' : apps });
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