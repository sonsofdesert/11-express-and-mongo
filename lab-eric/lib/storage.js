'use strict';

const Dog = require('../model/dog.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const seed = () => {
  console.log('start', Dog);
  removeAll()
    .then(() => {
      return Promise.all([
        save(new Dog({breed: 'Labrador', color: 'Black', litterSize: 8})),
        save(new Dog({breed: 'Dalmatian', color: 'White with spots!', litterSize: 8})),
        save(new Dog({breed: 'Golden Retriever', color: 'Golden', litterSize: 8}))
      ]);
    });
};

const save = (dog) => {
  let dogModel = new Dog({
    breed: dog.breed,
    color: dog.color,
    litterSize: dog.size
  });

  return new Promise((resolve, reject) => {
    dogModel.save((error, savedDog) => {
      if(error) {
        throw error;
      };
      resolve(savedDog);
    });
  });
};

const get = (id) => {
  return new Promise((resolve, reject) => {
    Dog.findOne({_id: id}, (error, dogs) => {
      resolve(dogs);
    });
  });
};

const getAll = () => {
  return new Promise((resolve, reject) => {
    dog.find((error, dogs) => {
      resolve(dogs);
    });
  });
};

const remove = (id) => {
  return new Promise((resolve, reject) => {
    dog.remove({_id: id}, (error, dog) => {
      resolve(dog);
    });
  });
};

const removeAll = () => {
  return new Promise((resolve, reject) => {
    Dog.remove((error, dogs) => {
      if(error) {
        console.error(error);
      }
      resolve(dogs);
    });
  });
};

module.exports = {seed, save, get, getAll, remove, removeAll};