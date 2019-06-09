'use strict';

const supergoose = require('./supergoose.js');
const Products = require('../api-server/src/models/products');
const product = new Products();

describe('Categories Model', () => {

  beforeAll(supergoose.startDB);
  afterAll(supergoose.stopDB);

  describe('post()',() => {
    it('can post() a new valid Products to database', () => {
      // Arrange
      let obj = {name: 'bananas', category: 'Grocery'};

      //act
      return product.post(obj)
        .then(record => {
          Object.keys(obj).forEach(key => {
            // Assert
            expect(record[key]).toEqual(obj[key]);
          });
        });
    });
  });

  describe('get()', () => {
    it('can get() all Products objects from database', () => {
      // Arrange
      let obj = {name: 'bananas', category: 'Grocery'};

      
      return product.post(obj)
        .then(() => {
          return product.get()
            .then(records => {
              expect(records).toBeDefined();
              expect(records[0].id).toBeDefined();
              expect(records[0].name).toEqual(obj.name);
            });
        });
    });

    it('can get() one Product objects from database when given id', () => {
      // Arrange
      let obj = {name: 'bananas', category: 'Grocery'};

      
      return product.post(obj)
        .then(record => {
          return product.get(record.id)
            .then(records => {
              expect(records).toBeDefined();
              expect(records[0].id).toBeDefined();
              expect(records[0].name).toEqual(obj.name);
            });
        });
    });
  });

  describe('put()', () => {
    it('can modify product based on id', () => {
      // Arrange
      let obj = {name: 'bananas', category: 'Grocery'};

      
      return product.post(obj)
        .then(record => {
          return product.put(record.id, {id: record.id, name: 'Diapers', type: 'Kids'})
            .then(record => {
              expect(record).toBeDefined();
              expect(record.id).toBeDefined();
              expect(record.name).toEqual('Diapers');
            });
        });
    });
  });

  describe('delete()', () => {
    it('can delete product based on id', () => {
      // Arrange
      let obj = {name: 'bananas', category: 'Grocery'};

      
      return product.post(obj)
        .then(record => {
          return product.delete(record.id)
            .then(entry => {
              expect(entry.id).toEqual(record.id);
            });
        });
    });
  });
});