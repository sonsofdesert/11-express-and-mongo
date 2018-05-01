'use strict';

const mongoose = require('mongoose');

let dogSchema = new mongoose.Schema({
  breed: String,
  color: String,
  litterSize: Number
});

let Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;