var express = require('express');
var router = express.Router();
// var mongoose = require('mongoose');
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});
var Stock = require('../models/stocks.js');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//ROUTE 1 GET ALL STOCKS
router.get('/stocks', function(req, res, next) {
  Stock.findQ()
    .then(function (result) {res.json(result)})
    .catch(function (err) {res.send(err) })
    .done();
});

//ROUTE 2 GET ONE STOCK
router.get('/stock/:id', function(req,res,next){
  Stock.findByIdQ(req.params.id)
    .then(function (result) {res.json(result)})
    .catch(function (err) {res.send(err) })
    .done();
});

//ROUTE 3 POST ALL STOCKS
router.post('/stocks', function(req,res,next) {


});


//ROUTE 4 PUT ONE STOCK


//ROUTE 5 DELETE ONE STOCK
module.exports = router;
