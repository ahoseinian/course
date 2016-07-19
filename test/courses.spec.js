'use strict';
require('./_utils');
var server = require('supertest')(require('../app'));
var should = require('should');
var config = require('./config');
var Course = require('../lib/back/models/course');


describe('Courses Page', function() {
  beforeEach(function(done) {
    config.makeCourse(done);
  });
  context('everybody', function() {

    it('can see available courses', function(done) {
      server
        .get('/courses')
        .expect(200, done);
    });

    it('can view a specific course page', function(done) {
      server
        .get('/courses/' + config.sampleCourse._id)
        .expect(200)
        .end(function(err, res) {
          should(err).be.empty();
          res.text.should.match(new RegExp(config.sampleCourse.name, 'g'));
          done();
        });
    });

    it('can not enroll before signing in');
  });

  context('user', function() {
    beforeEach(function(done) {
      config.saveUser(config.currectUser, done);
    });

    it('can enroll in a course', function(done) {
      config.logIn(config.currectUser, function(err, res) {

        server
          .get('/courses/' + config.sampleCourse._id + '/enroll')
          .set('Cookie', config.getCookie(res))
          .expect(302, function(err, res) {
            should(err).be.null();
            res.header.location.should.equal('/courses/' + config.sampleCourse._id);
            Course.findOne({ _id: config.sampleCourse._id }, function(err, item) {
              item._students.should.containEql(config.currectUser._id);
              done();
            });
          });
      });
    });
  });

});
