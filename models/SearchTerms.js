
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SearchTermsSchema = new Schema({
  term: String,
  date:  Date
});

var Term = mongoose.model('Term', SearchTermsSchema);

module.exports = Term;