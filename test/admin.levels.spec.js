'use strict';
require('./_utils');
var server = require('supertest')(require('../app'));
var should = require('should');
var config = require('./config');
var Course = require('../lib/back/models/course');
var Level = require('../lib/back/models/level');

describe('Course\'s session Page', function() {
  var course, level;
  beforeEach(function(done) {
    config.saveUser(config.currectAdmin, function(err, user) {
      course = new Course({ _owner: user._id, name: 'course sample', description: 'desc sample' });
      course.save(function(err) {
        if (err) throw err;
        level = new Level({ name: 'level #1', description: 'level #1 desc', _course: course._id });
        level.save(done);
      });
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
            .end(function(err, res) {
              should(res.text).match(/course sample/);
              should(res.text).match(/level #1/);
              done();
            });
        });
      });

      it('can add new level', function(done) {
        config.logIn(config.currectAdmin, function(err, res) {
          server
            .post('/admin/courses/' + course._id + '/levels')
            .set('Cookie', config.getCookie(res))
            .send({ name: 'level #2', description: 'level #2 desc', _course: course._id })
            .expect(302, function(err, res) {
              res.header.location.should.equal('/admin/courses/' + course._id + '/levels');
              done();
            });
        });
      });
    });

    context('another admin', function() {
      beforeEach(function(done) {
        config.saveUser(config.secondAdmin, done);
      });

      it('cannot see whats on the page', function(done) {
        config.logIn(config.secondAdmin, function(err, res) {
          server
            .get('/admin/courses/' + course._id + '/levels')
            .set('Cookie', config.getCookie(res))
            .expect(401, done);
        });
      });

      it('cannot add new level', function(done) {
        config.logIn(config.secondAdmin, function(err, res) {
          server
            .post('/admin/courses/' + course._id + '/levels')
            .set('Cookie', config.getCookie(res))
            .send({ name: 'level #2', description: 'level #2 desc', _course: course._id })
            .expect(401, done);
        });
      });
    });

  });

  context('guest', function() {
    it('cannot see whats on the page', function(done) {
      server
        .get('/admin/courses/' + course._id + '/levels')
        .expect(401, done);
    });
  });
});
