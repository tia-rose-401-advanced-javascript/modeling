'use strict';

const Category = require('../api-server/src/models/categories');
const categories = new Category();

const supergoose = require('./supergoose.js');

beforeAll(supergoose.startDB);
afterAll(supergoose.startDB);

describe('push()',() => {
  it('can post() a new valid category to database', () => {
    // Arrange
    let obj = {name: 'Guitars'};

    //act
    return categories.post(obj)
      .then(record => {
        Object.keys(obj).forEach(key => {
          // Assert
          expect(record[key]).toEqual(obj[key]);
        });
      });
  });

  it('can get() a category', () => {
    let obj = {name: 'Fruits'};
    return categories.post(obj)
      .then(record => {
        return categories.get(record._id)
          .then(category => {
            Object.keys(obj).forEach(key =>{
              expect(category[0][key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('can put() a categoy', () => {
    let obj = {name: 'Fruit'};
    let obj2 = {name: 'Bacon'};
    return categories.post(obj)
      .then(record => {
        return categories.put(record._id, obj2)
          .then(category => {
            Object.keys(obj2).forEach(key => {
              expect(category[key]).toEqual(obj2[key]);
            });
          });
      });
  });

  it('can delete() a category', () => {
    let obj = {name: 'Fruit'};
    return categories.post(obj)
      .then(record => {
        return categories.delete(record._id)
          .then(category => {
             return categories.get(category._id)
              .then(result => {
                expect(result.count).toBeUndefined();
              });
          });
      });
  });
});