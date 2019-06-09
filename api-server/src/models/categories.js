'use strict';

const uuid = require('uuid/v4');

const schema = {
  id: {required: true},
  name: {required: true}
};

class Categories {
  constructor() {
    this.database = [];
  }

  get(_id) {
    let response = _id ? this.database.filter(record => record.id === _id) : this.database;
    return Promise.resolve(response);
  }
  
  post(record) {
    record.id = uuid();

    let entry = this.sanitize(record);
    if(!entry){
      return Promise.reject('Invalid Team object provided');
    }

    this.database.push(entry);

    return Promise.resolve(entry);
  }

  put(_id, record) {
    let entry = this.sanitize(record);

    if(!entry) return Promise.reject('bad entry given');

    this.database = this.database.map(item => item.id === _id ? record : item);

    return Promise.resolve(entry);
  }

  delete(_id) {
    this.database = this.database.filter(record => record.id !== _id);
    return Promise.resolve();
  }

  sanitize(entry){
    let valid = true;
    let record = {};
  
    Object.keys(schema).forEach(field => {
      if(schema[field].required){
        if(entry[field]){
          record[field] = entry[field];
        }else{
          valid = false;
        }
      }else{
        record[field] = entry[field];
      }
    });
    return valid ? record : undefined;
  }
}

module.exports = Categories;