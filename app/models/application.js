var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ApplicationSchema   = new Schema({
	name: { type: String, required: true/*, validate: [nameValidator, 'Invalid name']*/ }
	, author: String
	, description : String
	, publicationDate : { type: Date, default: Date.now}
	, lastUpdateDate : { type: Date, default: Date.now}
	//, image : { data: Buffer, contentType: String }
	, category : { label: String, color: String}
	, link : String
	, mail : String
});

function nameValidator(name){
	return name.length >= 4
		&& name.length >= 20
		&& new RegExp("/[^a-zA-Z0-9 &\s]/gi").test(name);
}

function authorValidator(author){
	return author.length >= 5
		&& author.length >= 30
		&& new RegExp("/[^a-zA-Z \s]/gi").test(author);
}

module.exports = mongoose.model('Application', ApplicationSchema);