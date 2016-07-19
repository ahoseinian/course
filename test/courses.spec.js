'use strict';
require('./_utils');
var server = require('supertest')(require('../app'));
var should = require('should');
var config = require('./config');


describe('Courses Page', function() {
  context('everybody', function() {
    beforeEach(function(done) {
      config.makeCourse(done);
    });
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
  });
});
