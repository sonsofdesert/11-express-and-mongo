'use strict';

const express = require('express');
const router = express.Router();
const Dog = require('../model/dog.js');
const storage = require('../lib/storage.js');

router.get('/dogs', (request, response) => {
  if (request.query.id) {
    let id = request.query.id;
    storage.get(id)
      .then(dog => {
        response.send(dog);
      });
  } else {
    storage.getAll()
      .then(dogs => {
        response.send(dogs);
      });
  };
});

router.post('/dogs', (request, response) => {
  let dog = {
    breed: request.body.breed,
    color: request.body.color,
    litterSize: request.body.litterSize
  };

  storage.save(dog)
    .then(dog => {
      response.status(200);
      response.send(dog);
    });
});

router.put('/dogs', (request, response) => {
  let id = request.query.id;
  storage.get(id)
    .then(dog => {
      if(request.body.breed) {
        dog.breed = request.body.breed;
      }
      if(request.body.color) {
        dog.color = request.body.color;
      }
      if(request.body.litterSize) {
        dog.litterSize = request.body.litterSize;
      }

      dog.save((error, dog) => {
        if(error) {
          throw(error);
        };
        response.send(dog);
      });
    });
});

router.delete('/dogs', (request, response) => {
  if(request.query.id) {
    let id = request.query.id;
    storage.remove(id)
      .then(dog => {
        response.send(`Dog Removed ${dog}`);
      });
  } else {
    storage.removeAll()
      .then(dogs => {
        response.send(`All dogs removed ${dogs}`);
      });
  };
});

module.exports = router;