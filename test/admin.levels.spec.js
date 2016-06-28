'use strict';
require('./_utils');
var server = require('supertest')(require('../app'));
var should = require('should');
var config = require('./config');
var Course = require('../lib/back/models/course');

describe('Course\'s session Page', function() {
  var course;
  beforeEach(function(done) {
    config.saveUser(config.currectAdmin, function(err, user) {
      course = new Course({ _owner: user._id, name: 'course sample', description: 'desc sample' });
      course.save(done);
    });
  });

  context('Valid Admin', function() {

    context('course owner', function() {
      it('can look at course levels', function(done) {
        config.logIn(config.currectAdmin, function(err, res) {
          server
            .get('/admin/courses/' + course._id + '/levels')
            .set('Cookie', config.getCookie(res))
            .expect(200)
            .end(function(err, res){
              should(res.text).match(/course sample/);
              done();
            });
        });
      });
      it('can add new level');
    });

    context('another admin', function() {
      it('cannot see whats on the page');
      it('cannot add new level');
    });

  });

  context('guest', function() {

  });
});
