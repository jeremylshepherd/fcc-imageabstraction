'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Term = require('../models/SearchTerms');
var Seed = require('../mocks/seed');
var Mock = require("../mocks/mockData");
var Search = require('bing.search');
var util = require('util');

function genJSON(doc) {
    return doc;
}



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

// router.get('/api/:term', function(req, res) {
//     var term = req.params.term;
//     var obj = {};
//     obj.term = term;
//     var record = new Term(obj);
//     record.save((err, record) => {if(err) {console.log(err);} console.log('Record saved.')});
    
//     var search = new Search(process.env.BING_SECRET);
 
//     search.images(
//         'Tutta Bella Neapolitan Pizzeria',
//         {top: 5},
//         function(err, results) {
//             if(err){console.log(err);}
//             console.log(util.inspect(results, 
//             {colors: true, depth: null}));
//             res.json(results);
//      });
// });

router.get('/api/mocksearch', function(req, res) {
   var nu = genJSON(Mock);
   res.json(nu);
});

router.get('/noapi/:string/:offset', function(req, res) {
   var string = req.params.string;
   var offset = req.params.offset || 0;
   if(offset < 1){
       res.json(string);
   }else{
       var obj = {};
       obj.string = string;
       obj.offset = offset;
       res.json(obj);
   }
});

router.get('/api/allterms', function(req, res) {
    Term.find({}, function(err, results) {
        if(err) {console.log(err);}
        res.json(results);
    })
});


module.exports = router;