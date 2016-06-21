'use strict';
var mongoose = require('../db');

var Schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true }
});


module.exports = mongoose.model('Course', Schema);
