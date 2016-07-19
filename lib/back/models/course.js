'use strict';
var mongoose = require('../db');

var Schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  _students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});


module.exports = mongoose.model('Course', Schema);
