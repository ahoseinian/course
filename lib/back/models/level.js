'use strict';
var mongoose = require('../db');

var Schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  _course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  _teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});


module.exports = mongoose.model('Level', Schema);
