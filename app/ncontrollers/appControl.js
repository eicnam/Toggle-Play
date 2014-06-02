'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    ApplicationMod = mongoose.model('application') ;

/**
 * List of Articles
 */
exports.all = function(req, res) {
    ApplicationMod.find().sort('-created').populate('user', 'name username').exec(function(err, applications) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(applications);
        }
    });
};
