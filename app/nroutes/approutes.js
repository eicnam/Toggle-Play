var express = require('express');
var router = express.Router();



var appControl = require('../ncontrollers/appControl');

/*
 * GET userlist.
 */
//router.get('/app', function(req, res) {
//      res.send('yeah app babe');
//    
//});

  router.get('/app', appControl.all);


module.exports = router;