var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ApplicationModSchema   = new Schema({
	name: String
});

module.exports = mongoose.model('Application', ApplicationModSchema);