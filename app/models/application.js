var mongoose = require('mongoose');
var Schema = mongoose.Schema,     ObjectId = Schema.ObjectId;

var ApplicationSchema = new Schema({
    
    name: String



});



/**
 * Article Schema
 */
var ArticleSchema = new Schema({
    id: ObjectId,
    created: {
        type: Date,
        default: Date.now
    },
    appTitle: {
        type: String,
        required: true,         
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    lien: {
        type: String,
        default: '',
    }
});


module.exports = mongoose.model('Application', ApplicationSchema);