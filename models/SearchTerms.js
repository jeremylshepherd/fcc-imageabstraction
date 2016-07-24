
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SearchTermsSchema = new Schema({
  term: String,
  date: { type: Date, default: Date.now }
});

var Term = mongoose.model('Term', SearchTermsSchema);

module.exports = Term;