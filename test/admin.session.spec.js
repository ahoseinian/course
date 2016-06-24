'use strict';
require('./_utils');
var server = require('supertest')(require('../app'));
var should = require('should');
var config = require('./config');
var Course = require('../lib/back/models/course');

describe('Courses Page', function() {
  var course;
  beforeEach(function(done) {
    config.saveUser(config.currectAdmin, function(user) {
      course = new Course({ _owner: user._id, name: 'course sample', description: 'desc sample' });
      course.save(done);
    });
  });
  context('Valid Admin', function() {

    context('course owner', function() {
      it('can look at course sessions', function(done) {
        console.log(course);
        config.logIn(config.currectAdmin, function(err, res) {
          server
            .get('/admin/courses/' + course._id + '/sessions')
            .set('Cookie', config.getCookie(res))
            .expect(200, function(err, res) {
              if (err) throw err;
              console.log(res);
              done();
            });
        });
      });
      it('can add new session');
    });

    context('another admin', function() {
      it('cannot see whats on the page');
      it('cannot add new session');
    });

  });

  context('guest', function() {

  });
});
