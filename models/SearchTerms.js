
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SearchTermsSchema = new Schema({
  url: String,
  snippet: String,
  thumbnail: String,
  context: String,
  date:  Date
});

var Term = mongoose.model('Term', SearchTermsSchema);

module.exports = Term;