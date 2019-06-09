'use strict';

const Category = require('../api-server/src/models/categories');
const categories = new Category();

describe('Categories Model', () => {

  afterEach(() => {
    categories.database = [];
  });

  describe('push()',() => {
    it('can post() a new valid category to database', () => {
      // Arrange
      let obj = {name: 'fruit'};
  
      //act
      return categories.post(obj)
        .then(record => {
          Object.keys(obj).forEach(key => {
            // Assert
            expect(record[key]).toEqual(obj[key]);
          });
        });
    });
  });

  describe('get()', () => {
    it('can get() all category objects from database', () => {
      // Arrange
      let obj = {name: 'fruit'};
      
      return categories.post(obj)
        .then(() => {
          return categories.get()
            .then(records => {
              expect(records).toBeDefined();
              expect(records.length).toBe(1);
              expect(records[0].id).toBeDefined();
              expect(records[0].name).toEqual(obj.name);
            });
        });
    });

    it('can get(id) of category object from database', () => {
      // Arrange
      let obj = {name: 'fruit'};
      
      return categories.post(obj)
        .then(record => {
          return categories.get(record.id)
            .then(records => {
              expect(records).toBeDefined();
              expect(records.length).toBe(1);
              expect(records[0].id).toBeDefined();
              expect(records[0].name).toEqual(obj.name);
            });
        });
    });
  });

  describe('put()', () => {
    it('can modify category based on id', () => {
      // Arrange
      let obj = {name: 'fruit'};
      
      return categories.post(obj)
        .then(record => {
          return categories.put(record.id, {id: record.id, name: 'beer'})
            .then(record => {
              expect(record).toBeDefined();
              expect(record.id).toBeDefined();
              expect(record.name).toEqual('beer');
            });
        });
    });
  });

  describe('delete()', () => {
    it('can delete category based on id', () => {
      // Arrange
      let obj = {name: 'fruit'};
      
      return categories.post(obj)
        .then(record => {
          return categories.delete(record.id)
            .then(record => {
              expect(record).toBeUndefined();
            });
        });
    });
  });
  
});