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
      console.log(res.body);
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
});

