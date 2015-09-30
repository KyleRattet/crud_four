process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");

var server = require('../server/app');
var Stock = require("../server/models/stocks");

var should = chai.should();
chai.use(chaiHttp);

describe('Stocks', function() {

  Stock.collection.drop();

  beforeEach(function(done){
    var newStock = new Stock({
      name: "Apple",
      ticker: "AAPL",
      exchange: "NASDAQ",
      price: 109.00
    });
    newStock.save(function(err) {
      done();
    });
  });
  afterEach(function(done){
    Stock.collection.drop();
    done();
  });

  //1. GET ALL STOCKS TEST
  it('should list all stocks on /stocks GET request', function(done){
    chai.request(server)
    .get('/api/v1/stocks')
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[0].should.have.property('_id');
      res.body[0].should.have.property('name');
      res.body[0].should.have.property('ticker');
      res.body[0].should.have.property('exchange');
      res.body[0].should.have.property('price');
      res.body[0].name.should.equal('Apple');
      res.body[0].ticker.should.equal('AAPL');
      res.body[0].exchange.should.equal('NASDAQ');
      done();
    });
  });

  //2. GET ONE STOCK TEST
   it('should list a SINGLE stocks on /stock/<id> GET', function(done) {
    var newStock = new Stock({
      name: "Google",
      ticker: "GOOGL",
      exchange: "NASDAQ",
      price: 623.00
    });
    newStock.save(function(err, data) {
      chai.request(server)
        .get('/api/v1/stock/'+data.id)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('name');
          res.body.should.have.property('ticker');
          res.body.should.have.property('exchange');
          res.body.should.have.property('price');
          res.body.name.should.equal('Google');
          res.body.ticker.should.equal('GOOGL');
          res.body.exchange.should.equal('NASDAQ');
          res.body.price.should.equal(623.00);
          done();
        });
    });
  });

  //3. POST STOCK REQUEST
  it('should add a SINGLE stock on /stocks POST', function(done) {
  chai.request(server)
    .post('/api/v1/stocks')
    .send({'name': 'Amazon', 'ticker': 'AMZN', 'exchange' : 'NASDAQ', 'price': 505.00})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('SUCCESS');
      res.body.SUCCESS[0].should.have.property('name');
      res.body.SUCCESS[0].should.have.property('ticker');
      res.body.SUCCESS[0].should.have.property('exchange');
      res.body.SUCCESS[0].should.have.property('_id');
      res.body.SUCCESS[0].name.should.equal('Amazon');
      res.body.SUCCESS[0].ticker.should.equal('AMZN');
      res.body.SUCCESS[0].price.should.equal(505.00);
      done();
    });
  });

  //4. PUT STOCK
    it("should update a single stock on /stock PUT", function(done){
  chai.request(server)
    .get('/api/v1/stocks')
    .end(function(err, res){
      chai.request(server)
        .put('/api/v1/stock/'+res.body[0]._id)
        .send({
          name: "Apple Inc.",
          ticker: "AAPL",
          exchange: "NASDAQ",
          price: 112.00
          })
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('UPDATED');
          response.body.UPDATED.should.be.a('object');
          response.body.UPDATED.should.have.property('name');
          response.body.UPDATED.should.have.property('_id');
          response.body.UPDATED.name.should.equal('Apple Inc.');
          response.body.UPDATED.price.should.equal(112.00);
          done();
      });
    });
  });

    //5. DELETE TEST
  it('should delete a SINGLE stock on /stock/<id> DELETE', function(done) {
  chai.request(server)
    .get('/api/v1/stocks')
    .end(function(err, res){
      chai.request(server)
        .delete('/api/v1/stock/'+res.body[0]._id)
        .end(function(error, response){
          console.log(response.body)
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('REMOVED');
          response.body.REMOVED.should.be.a('object');
          response.body.REMOVED.should.have.property('name');
          response.body.REMOVED.should.have.property('_id');
          console.log(res.body);
          response.body.REMOVED.name.should.equal('Apple');
          response.body.REMOVED.ticker.should.equal('AAPL');
          response.body.REMOVED.exchange.should.equal('NASDAQ');
          done();
      });
    });
  });


});

