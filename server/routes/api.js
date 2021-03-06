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
  newStock = new Stock ({
    name: req.body.name,
    ticker: req.body.ticker,
    exchange: req.body.exchange,
    price: req.body.price
  });
  newStock.saveQ()
    .then(function (result) {
                    res.json({"SUCCESS": result});
                  })
    .catch(function (err) {res.send(err)})
    .done();
});


//ROUTE 4 PUT ONE STOCK
router.put('/stock/:id', function(req,res,next){
  var update = {
    name: req.body.name,
    ticker: req.body.ticker,
    exchange: req.body.exchange,
    price: req.body.price
  };
  var options = {new:true};
  Stock.findByIdAndUpdateQ(req.params.id, update, options)
  .then(function (result) {
                          res.json({"UPDATED": result});
                          })
  .catch(function (err) {res.send(err) })
  .done();
});

//ROUTE 5 DELETE ONE STOCK
router.delete('/stock/:id', function(req,res,next){
  Stock.findByIdAndRemoveQ(req.params.id)
    .then(function (result) {
                            res.json({"REMOVED": result});
                            })
    .catch(function (err) {res.send(err) })
    .done();
});


module.exports = router;
