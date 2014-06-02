var express = require('express');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/app', function(req, res) {
      res.send('yeah app babe');
    
});




module.exports = router;