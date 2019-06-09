'use strict';

const schema = require('./products-schema.js');

class Products {
  constructor() {
  }

  get(_id) {
    let queryObject = _id ? {_id} : {};
    return schema.find(queryObject);
  }
  
  post(entry) {
    let record = new schema(entry);
    return record.save();
  }

  put(_id, entry) {
    return schema.findByIdAndUpdate(_id, entry, {new:true});
  }

  delete(_id) {
    return schema.findByIdAndDelete(_id);
  }
}

module.exports = Products;