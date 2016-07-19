'use strict';
var User = require('../lib/back/models/user');
var Course = require('../lib/back/models/course');
var server = require('supertest')(require('../app'));
var should = require('should');

var config = {};

config.currectAdmin = new User({
  name: 'admin',
  password: 'changeme',
  repeatpassword: 'changeme',
  email: 'admin@test.com',
  admin: true
});

config.secondAdmin = new User({
  name: 'admin2',
  password: 'changeme2',
  repeatpassword: 'changeme2',
  email: 'admin2@test.com',
  admin: true
});

config.currectUser = new User({
  name: 'test',
  password: 'changeme',
  repeatpassword: 'changeme',
  email: 'test@test.com'
});

config.incorrectUser = {
  name: 'test',
  password: 'changeme',
  repeatpassword: 'changeme2',
  email: 'test@test.com'
};

config.sampleCourse = new Course({
  name: 'test',
  description: 'test',
  _owner: config.currectAdmin._id
});

config.getCookie = function(res) {
  return res.headers['set-cookie'][0].split(';')[0];
};

config.saveUser = function(data, done) {
  var user = new User(data);
  user.password = user.generateHash(user.password);
  user.save(function(err) {
    if (err) throw err;
    done(null, user);
  });
};

config.logIn = function(user, done) {
  server
    .get('/auth/logout')
    .end(function(err) {
      if (err) throw err;
      server
        .post('/auth/login')
        .send(user)
        .expect(302)
        .expect('Location', '/')
        .end(done);
    });
};

config.makeCourse = function(done) {

  config.saveUser(config.currectAdmin, function() {
    config.logIn(config.currectAdmin, function(err, res) {
      server
        .post('/admin/courses')
        .set('Cookie', config.getCookie(res))
        .send(config.sampleCourse)
        .end(function(err, res) {
          should(res.status).equal(302);
          should(err).be.empty();
          should(res.header.location).equal('/admin/courses');
          done();
        });
    });
  });
};

module.exports = config;
