'use strict';

const Category = require(`../models/categories`);
const category = new Catergory();

const supergoose = require('./supergoose.js');

beforeAll(supergoose.startDB);
afterAll(supergoose.startDB);

describe('Category Model', () => {
  it('can post() a new category', () => {
    let obj = {category: 'Fruits'};
    return category.post(obj)
      .then(record => {
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      });
  });

  it('can get() a category', () => {
    let obj = {name: 'Fruits'};
  })


})