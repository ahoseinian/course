'use strict';


//  Modified from https://github.com/elliotf/mocha-mongoose
process.env.NODE_ENV = 'test';


var mongoose = require('../lib/back/db');


// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing

beforeEach(function(done) {
  mongoose.connection.db.dropDatabase(done);
});

after(function(done) {
  mongoose.connection.db.dropDatabase(done);
});

