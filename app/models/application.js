var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ApplicationSchema   = new Schema({
	name: String,
	author: String,
	description : String
});

module.exports = mongoose.model('Application', ApplicationSchema);