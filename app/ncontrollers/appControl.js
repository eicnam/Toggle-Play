'use strict';

/**
 * Module dependencies.
 */

var Application = require('../models/application');

var mongoose = require('mongoose'),
    Application = mongoose.model('Application') ;

/**
 * List of Articles
 */
exports.all = function(req, res) {
    Application.find().sort('-created').populate('user', 'name username').exec(function(err, applications) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(applications);
        }
    });
};
