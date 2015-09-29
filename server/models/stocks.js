var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Stock = new Schema ({
  name: String,
  ticker: String,
  exchange: String,
  price: Number
});


module.exports = mongoose.model('stocks', Stock);
