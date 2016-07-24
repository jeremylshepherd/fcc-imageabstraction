var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Term = require('../models/SearchTerms');


router.get('/', function(req, res) {
  res.render('index.ejs');
});

router.get('/api/allterms', function(res, req) {
    Term.find({}, function(err, results) {
        if(err) {console.log(err);}
        res.json(results);
    })
});


module.exports = router;