'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Term = require('../models/SearchTerms');
var Search = require('bing.search');


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

router.get('/api/imagesearch/:term', function(req, res) {
    var term = req.params.term;
     var skip = req.query.offset || 0;
    var obj = {};
    obj.term = term;
    var record = new Term(obj);
    record.save((err, record) => {if(err) {console.log(err);} console.log('Record saved.')});
    
    var search = new Search(process.env.BING_SECRET);
 
    search.images(
        term,
        {top: 10, skip: skip},
        function(err, results) {
            if(err){console.log(err);}
            var arr = [];
            for(var i = 0; i < results.length; i++){
                var dat = {};
                dat.url = results[i].url;
                dat.alt = results[i].title;
                dat.thumbnail = results[i].thumbnail.url;
                dat.context = results[i].sourceUrl;
                arr.push(dat);
            }
            res.json(arr);
     });
});

router.get('/api/allterms', function(req, res) {
    Term.find({})
        .sort({"date" : -1})
        .limit(10)
        .exec(function(err, results) {
            if(err) {console.log(err);}
            res.json(results);
    });
});


module.exports = router;