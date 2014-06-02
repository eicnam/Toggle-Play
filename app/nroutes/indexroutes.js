var express = require('express');
var router = express.Router();


router.route('/').get(function(req, res) {
		/*res.redirect('../index.html');*/
		//her we'll send the home page
		/*res.json({ message: 'hooray! welcome to our api!' });	*/
		res.send('main');
	});



module.exports = router;