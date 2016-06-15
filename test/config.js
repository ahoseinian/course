'use strict';
var User = require('../lib/back/models/user');

module.exports = {
  currectAdmin: {
    name: 'admin',
    password: 'changeme',
    repeatpassword: 'changeme',
    email: 'admin@test.com',
    admin: true
  },
  currectUser: {
    name: 'test',
    password: 'changeme',
    repeatpassword: 'changeme',
    email: 'test@test.com'
  },
  incorrectUser: {
    name: 'test',
    password: 'changeme',
    repeatpassword: 'changeme2',
    email: 'test@test.com'
  },
  getCookie: function(res) {
    return res.headers['set-cookie'][0].split(';')[0];
  },
  saveUser: function(data, done) {
    var user = new User(data);
    user.password = user.generateHash(user.password);
    user.save(function(err) {
      if (err) throw err;
      done();
    });
  }
};
