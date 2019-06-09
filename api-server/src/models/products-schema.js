'use strict';

const mongoose = require('mongoose');

const products = mongoose.Schema({
  name: {type:String, required: true},
  category: {type:String, required:true},
  price: {type:Number, requred:true},
});

products.pre('save', function(){
  this.name = this.name.toLowerCase();
})

products.post('', function(){

})

module.exports = mongoose.model('products', products);