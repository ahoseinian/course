'use strict';
var db = require('mongoose');
db.connect('mongodb://localhost/newshop');

module.exports = db;
