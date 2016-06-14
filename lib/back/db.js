'use strict';
var db = require('mongoose');
var dbAddress = process.env.NODE_ENV == 'test' ? 'mongodb://localhost/newshop_test': 'mongodb://localhost/newshop';
db.connect(dbAddress);

module.exports = db;
