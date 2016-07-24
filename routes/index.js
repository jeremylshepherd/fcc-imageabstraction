var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Term = require('../models/SearchTerms');


router.get('/', function(req, res) {
    res.render('index.ejs');
});

router.get('/api' , function(req, res) {
    res.render('addTerm.ejs');
});

router.post('/api/newrecord', function(req, res) {
    var obj = {};
    obj.term = req.body.term;
    obj.date = Date.now();
    var term = new Term(obj);
    term.save(function(err, newTerm) {
        if(err) {console.log(err);}
        res.json(newTerm);
    });
});


router.get('/api/allterms', function(req, res) {
    Term.find({}, function(err, results) {
        if(err) {console.log(err);}
        res.json(results);
    })
});


module.exports = router;