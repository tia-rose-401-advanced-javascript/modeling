'use strict';
const schema = require('./categories-schema');

class Categories {

  constructor(category) {
    this.category = category;
  }

  get(_id) {
    let queryObject = _id ? {_id} : {};
    return schema.find(queryObject);
  }
  
  post(entry) {
    let record = new schema(entry);
    return record.save();
  }

  put(_id, record) {
    return schema.findByIdAndUpdate(_id, record, {new:true});
  }

  delete(_id) {
    return schema.findByIdAndDelete(_id);
  }

}

module.exports = Categories;
